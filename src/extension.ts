import * as vscode from "vscode";
import { deleteBookmarksFlow } from "./commands/delete-bookmarks-flow.cmd";
import { loadBookmarks } from "./commands/load-bookmarks.cmd";
import { editBookmarksFlow } from "./commands/edit-bookmarks-flow.cmd";
import { refresh } from "./commands/refresh.cmd";
import { saveCurrentBreakpoints } from "./commands/save-current-breakpoints.cmd";
import { BreakpointBookmarksProvider } from "./providers/breakpoint-bookmarks.provider";

export async function activate(context: vscode.ExtensionContext) {
  vscode.debug.breakpoints;
  const provider = new BreakpointBookmarksProvider();
  await provider.prepareData();
  vscode.window.registerTreeDataProvider("savedBookmarks", provider);

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.saveCurrentBreakpoints", () =>
      saveCurrentBreakpoints(provider)()
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.loadBookmarks", (item) =>
      loadBookmarks(provider)(item)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.editFlow", (item) =>
      editBookmarksFlow(provider)(item)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.deleteFlow", (item) =>
      deleteBookmarksFlow(provider)(item)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.refresh", () =>
      refresh(provider)
    )
  );
}

export function deactivate() {}
