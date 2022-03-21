import * as vscode from "vscode";
import * as path from "path";
import { writeFile } from "fs/promises";
import { BreakpointBookmarksProvider } from "../providers/breakpoint-bookmarks.provider";

export const saveCurrentBreakpoints = async (
  provider: BreakpointBookmarksProvider
) => {
  const config = vscode.workspace.getConfiguration("breakpointBookmark");
  const saveLocation = config.get("saveLocation") as string;
  await provider.assureSaveDirectoryExist(saveLocation);
  const fileName = await vscode.window.showInputBox({
    title: "Enter file name without extension",
    placeHolder: "test express bug",
  });
  const currentBreakpoints = vscode.debug.breakpoints.map(
    (bp: vscode.Breakpoint) => ({
      location: (bp as any).location.uri.path,
      range: (bp as any).location.range,
      enabled: bp.enabled,
      condition: bp.condition,
      hitCondition: bp.hitCondition,
      logMessage: bp.logMessage,
    })
  );

  const filePath = saveLocation
    ? `${saveLocation}/${fileName}.json`
    : path.join(__dirname, "..", ".vscode", "breakpoints", `${fileName}.json`);

  await writeFile(filePath, JSON.stringify(currentBreakpoints), {
    encoding: "utf-8",
  });
  provider.refresh();
};
