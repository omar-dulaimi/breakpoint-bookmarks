import { readdir, readFile } from "fs/promises";
import * as path from "path";
import * as vscode from "vscode";
import { BreakpointBookmarksProvider } from "../providers/breakpoint-bookmarks.provider";
import { BookmarkFlowItem, getBookmarkFlowDirectoryPath, getBookmarkFlowFilePath } from "../utils/path-utils";

interface BaseBreakpointInfo {
  type: string;
  enabled: boolean;
  condition?: string;
  hitCondition?: string;
  logMessage?: string;
}

interface SourceBreakpointInfo extends BaseBreakpointInfo {
  type: 'source';
  location: string;
  range: {
    start: { line: number; character: number };
    end: { line: number; character: number };
  };
}

interface FunctionBreakpointInfo extends BaseBreakpointInfo {
  type: 'function';
  functionName: string;
}

interface UnknownBreakpointInfo extends BaseBreakpointInfo {
  type: 'unknown';
  raw: any;
}

type BreakpointInfo = SourceBreakpointInfo | FunctionBreakpointInfo | UnknownBreakpointInfo;

export const loadBookmarks =
  (provider: BreakpointBookmarksProvider) => async (item: BookmarkFlowItem) => {
    const workspacePath = vscode.workspace.workspaceFolders?.[0]?.uri
      ?.fsPath as string;

    if (!workspacePath) {
      vscode.window.showInformationMessage("No workspace opened!");
      return;
    }

    const config = vscode.workspace.getConfiguration("breakpointBookmark");
    const saveLocation = config.get("saveLocation") as string;
    const useRelativePaths = config.get("useRelativePaths") as boolean;

    const isDirExist = await provider.assureSaveDirectoryExist(
      saveLocation,
      workspacePath
    );
    if (!isDirExist) {
      return;
    }

    const flowsPaths = await readdir(
      getBookmarkFlowDirectoryPath(workspacePath, saveLocation)
    );

    const foundFilePath = flowsPaths.find((flowPath) => flowPath === item.id);
    if (foundFilePath) {
      const clearPreviousBreakpoints = config.get("clearPreviousBreakpoints");
      if (clearPreviousBreakpoints) {
        vscode.commands.executeCommand(
          "workbench.debug.viewlet.action.removeAllBreakpoints"
        );
      }

      const filePath = getBookmarkFlowFilePath(
        workspacePath,
        saveLocation,
        foundFilePath
      );
      const flowData = await readFile(filePath, { encoding: "utf-8" });
      const breakpoints = JSON.parse(flowData);

      const breakpointsToAdd: vscode.Breakpoint[] = [];

      breakpoints.forEach((bp: any) => {
        // Handle backward compatibility - old bookmarks without 'type' field are source breakpoints
        if (!bp.type || bp.type === 'source') {
          // Handle source breakpoints
          const sourceBreakpoint = bp as any; // Use any for backward compatibility
          
          // Handle both old and new range formats
          let vscodeRange: vscode.Range;
          
          if (sourceBreakpoint.range && sourceBreakpoint.range.start && sourceBreakpoint.range.end) {
            // New format: {start: {line, character}, end: {line, character}}
            vscodeRange = new vscode.Range(
              new vscode.Position(sourceBreakpoint.range.start.line - 1, sourceBreakpoint.range.start.character),
              new vscode.Position(sourceBreakpoint.range.end.line - 1, sourceBreakpoint.range.end.character)
            );
          } else if (Array.isArray(sourceBreakpoint.range)) {
            // Old format: [{line, character}, {line, character}]
            vscodeRange = new vscode.Range(
              new vscode.Position(sourceBreakpoint.range[0].line - 1, sourceBreakpoint.range[0].character),
              new vscode.Position(sourceBreakpoint.range[1].line - 1, sourceBreakpoint.range[1].character)
            );
          } else {
            // Fallback: create a single-point range
            console.warn(`Invalid range format in breakpoint, using fallback`, sourceBreakpoint);
            vscodeRange = new vscode.Range(
              new vscode.Position(0, 0),
              new vscode.Position(0, 0)
            );
          }

          let locationPath = sourceBreakpoint.location;
          if (useRelativePaths) {
            // converts stored relative path back to absolute
            locationPath = path.resolve(workspacePath, sourceBreakpoint.location);
          }

          breakpointsToAdd.push(
            new vscode.SourceBreakpoint(
              new vscode.Location(vscode.Uri.file(locationPath), vscodeRange),
              sourceBreakpoint.enabled,
              sourceBreakpoint.condition,
              sourceBreakpoint.hitCondition,
              sourceBreakpoint.logMessage
            )
          );
        } else if (bp.type === 'function') {
          // Handle function breakpoints
          const functionBreakpoint = bp as FunctionBreakpointInfo;
          
          breakpointsToAdd.push(
            new vscode.FunctionBreakpoint(
              functionBreakpoint.functionName,
              functionBreakpoint.enabled,
              functionBreakpoint.condition,
              functionBreakpoint.hitCondition,
              functionBreakpoint.logMessage
            )
          );
        } else {
          // Skip unknown breakpoint types with a warning
          console.warn(`Unsupported breakpoint type: ${bp.type}`);
        }
      });

      vscode.debug.addBreakpoints(breakpointsToAdd);

      vscode.window.showInformationMessage(
        `Successfully loaded: ${item.label}`
      );
    } else {
      vscode.window.showErrorMessage(
        `Failed to load, flow not found: ${item.label}`
      );
      provider.refresh();
    }
  };
