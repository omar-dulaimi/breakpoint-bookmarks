import { writeFile } from "fs/promises";
import * as path from "path";
import * as vscode from "vscode";
import { BreakpointBookmarksProvider } from "../providers/breakpoint-bookmarks.provider";
import { getBookmarkFlowFilePath } from "../utils/path-utils";

export const saveCurrentBreakpoints =
  (provider: BreakpointBookmarksProvider) => async () => {
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

    const fileName =
      (await vscode.window.showInputBox({
        title: "Enter file name without extension",
        placeHolder: "test express bug",
      })) ?? "";

    const currentBreakpoints = vscode.debug.breakpoints.map((bp) => {
      if (bp instanceof vscode.SourceBreakpoint) {
        // Handle source (file/line) breakpoints
        let locationPath: string = bp.location.uri.fsPath;

        if (useRelativePaths) {
          locationPath = path.relative(workspacePath, locationPath);
        }

        const range: vscode.Range = bp.location.range.with({
          start: bp.location.range.start.translate(1),
          end: bp.location.range.end.translate(1),
        });

        return {
          type: 'source',
          location: locationPath,
          range,
          enabled: bp.enabled,
          condition: bp.condition,
          hitCondition: bp.hitCondition,
          logMessage: bp.logMessage,
        };
      } else if (bp instanceof vscode.FunctionBreakpoint) {
        // Handle function breakpoints
        return {
          type: 'function',
          functionName: bp.functionName,
          enabled: bp.enabled,
          condition: bp.condition,
          hitCondition: bp.hitCondition,
          logMessage: bp.logMessage,
        };
      } else {
        // Handle other breakpoint types (for future extensibility)
        return {
          type: 'unknown',
          enabled: bp.enabled,
          raw: bp,
        };
      }
    }).filter((bp) => bp !== null);

    const filePath = getBookmarkFlowFilePath(
      workspacePath,
      saveLocation,
      `${fileName}.json`
    );

    await writeFile(filePath, JSON.stringify(currentBreakpoints), {
      encoding: "utf-8",
    });

    provider.refresh();
  };
