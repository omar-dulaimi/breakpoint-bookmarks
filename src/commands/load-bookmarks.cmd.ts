import { readdir, readFile } from "fs/promises";
import * as path from "path";
import * as vscode from "vscode";
import { BreakpointBookmarksProvider } from "../providers/breakpoint-bookmarks.provider";
import { BookmarkFlowItem, getBookmarkFlowDirectoryPath, getBookmarkFlowFilePath } from "../utils/path-utils";

interface BreakpointInfo {
  location: string;
  range: { line: number; character: number }[];
  enabled: boolean;
  condition?: string;
  hitCondition?: string;
  logMessage?: string;
}

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

      vscode.debug.addBreakpoints(
        breakpoints.map((bp: BreakpointInfo) => {
          const range = bp.range.map(({ line, character }) => ({
            line: line - 1,
            character,
          }));

          const vscodeRange = new vscode.Range(
            new vscode.Position(range[0].line, range[0].character),
            new vscode.Position(range[1].line, range[1].character)
          );

          let locationPath = bp.location;
          if (useRelativePaths) {
            // converts stored relative path back to absolute
            locationPath = path.resolve(workspacePath, bp.location);
          }

          return new vscode.SourceBreakpoint(
            new vscode.Location(vscode.Uri.file(locationPath), vscodeRange),
            bp.enabled,
            bp.condition,
            bp.hitCondition,
            bp.logMessage
          );
        })
      );

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
