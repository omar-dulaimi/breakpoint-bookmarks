import { readdir } from "fs/promises";
import * as vscode from "vscode";
import { BreakpointBookmarksProvider } from "../providers/breakpoint-bookmarks.provider";
import { BookmarkFlowItem, getBookmarkFlowDirectoryPath, getBookmarkFlowFilePath } from "../utils/path-utils";

export const editBookmarksFlow =
  (provider: BreakpointBookmarksProvider) => async (item: BookmarkFlowItem) => {
    const workspacePath = vscode.workspace.workspaceFolders?.[0]?.uri
      ?.fsPath as string;

    if (!workspacePath) {
      vscode.window.showInformationMessage("No workspace opened!");
      return;
    }

    const config = vscode.workspace.getConfiguration("breakpointBookmark");
    const saveLocation = config.get("saveLocation") as string;

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
      const filePath = getBookmarkFlowFilePath(
        workspacePath,
        saveLocation,
        foundFilePath
      );

      try {
        let doc = await vscode.workspace.openTextDocument(filePath);
        await vscode.window.showTextDocument(doc, { preview: false });
      } catch (error) {
        vscode.window.showErrorMessage(
          `Failed to open, reason: ${
            (error as { message: string }).message
          }`
        );
      }
    } else {
      vscode.window.showErrorMessage(
        `Failed to open, flow not found: ${item.label}`
      );
    }
    provider.refresh();
  };
