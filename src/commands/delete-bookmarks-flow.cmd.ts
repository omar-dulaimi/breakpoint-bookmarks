import { readdir, unlink } from "fs/promises";
import * as path from "path";
import * as vscode from "vscode";
import { BreakpointBookmarksProvider } from "../providers/breakpoint-bookmarks.provider";

export const deleteBookmarksFlow =
  (provider: BreakpointBookmarksProvider) => async (item: any) => {
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
    if (!isDirExist) return;

    const flowsPaths = await readdir(
      saveLocation
        ? path.join(workspacePath, saveLocation)
        : path.join(workspacePath, ".vscode", "breakpoints")
    );

    const foundFilePath = flowsPaths.find((flowPath) => flowPath === item.id);
    if (foundFilePath) {
      const choice = await vscode.window.showWarningMessage(
        "",
        {
          modal: true,
          detail: `Are you sure you want to delete ${item.label}?`,
        },
        "Delete"
      );

      if (choice === "Delete") {
        const filePath = saveLocation
          ? path.join(workspacePath, saveLocation, foundFilePath)
          : path.join(
              workspacePath,
              ".vscode",
              "breakpoints",
              `${foundFilePath}`
            );

        try {
          await unlink(filePath);
          vscode.window.showInformationMessage(
            `Successfully deleted: ${item.label}`
          );
        } catch (error) {
          vscode.window.showErrorMessage(
            `Failed to delete, reason: ${
              (error as { message: string }).message
            }`
          );
        }
      }
    } else {
      vscode.window.showErrorMessage(
        `Failed to delete, flow not found: ${item.label}`
      );
    }
    provider.refresh();
  };
