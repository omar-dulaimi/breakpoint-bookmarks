import * as path from "path";

export interface BookmarkFlowItem {
  id: string;
  label: string;
}

/**
 * Constructs the file path for a bookmark flow based on workspace and save location
 */
export function getBookmarkFlowFilePath(
  workspacePath: string,
  saveLocation: string,
  fileName: string
): string {
  return saveLocation
    ? path.join(workspacePath, saveLocation, fileName)
    : path.join(workspacePath, ".vscode", "breakpoints", fileName);
}

/**
 * Constructs the directory path for bookmark flows based on workspace and save location
 */
export function getBookmarkFlowDirectoryPath(
  workspacePath: string,
  saveLocation: string
): string {
  return saveLocation
    ? path.join(workspacePath, saveLocation)
    : path.join(workspacePath, ".vscode", "breakpoints");
}