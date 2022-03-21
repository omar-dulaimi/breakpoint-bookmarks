import * as vscode from "vscode";
import { BreakpointBookmarksProvider } from "./providers/breakpoint-bookmarks.provider";
import { saveCurrentBreakpoints } from "./commands/save-current-breakpoints.cmd";
import { loadBookmarks } from "./commands/load-bookmarks.cmd";
import { refresh } from "./commands/refresh.cmd";

export async function activate(context: vscode.ExtensionContext) {
  vscode.debug.breakpoints;
  const provider = new BreakpointBookmarksProvider();
  await provider.prepareData();
  vscode.window.registerTreeDataProvider("savedBookmarks", provider);

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "breakpoint-bookmarks.saveCurrentBreakpoints",
      () => saveCurrentBreakpoints(provider)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "breakpoint-bookmarks.loadBookmarks",
      (item) => loadBookmarks(provider)(item)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("breakpoint-bookmarks.refresh", () =>
      refresh(provider)
    )
  );
}

export function deactivate() {}
