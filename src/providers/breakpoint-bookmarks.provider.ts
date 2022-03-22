import * as vscode from "vscode";
import * as path from "path";
import { readdir, mkdir } from "fs/promises";
import { existsSync } from "fs";

class BookmarkFlow extends vscode.TreeItem {
  constructor(public readonly label: string) {
    super(label);
    this.contextValue = "flow-item";
    this.iconPath = {
      light: path.join(
        __filename,
        "..",
        "..",
        "..",
        "resources",
        "light",
        "flow.svg"
      ),
      dark: path.join(
        __filename,
        "..",
        "..",
        "..",
        "resources",
        "dark",
        "flow.svg"
      ),
    };
  }
}

export class BreakpointBookmarksProvider {
  private _onDidChangeTreeData: vscode.EventEmitter<
    BookmarkFlow | undefined | null | void
  > = new vscode.EventEmitter<BookmarkFlow | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    BookmarkFlow | undefined | null | void
  > = this._onDidChangeTreeData.event;

  private data: BookmarkFlow[] = [];

  constructor() {}

  async prepareData() {
    const workspacePath = vscode.workspace.workspaceFolders?.[0]?.uri
      ?.fsPath as string;
    const config = vscode.workspace.getConfiguration("breakpointBookmark");
    const saveLocation = config.get("saveLocation") as string;
    await this.assureSaveDirectoryExist(saveLocation, workspacePath);
    const flowsPaths = await readdir(
      saveLocation
        ? `${saveLocation}`
        : path.join(workspacePath, ".vscode", "breakpoints")
    );
    const treeData = flowsPaths.map((flowPath, index) => ({
      id: flowPath,
      label: `flow: ${flowPath.split(".")[0].slice(0, 50)}`,
    }));
    this.data = treeData;
  }

  async assureSaveDirectoryExist(saveLocation: string, workspacePath: string) {
    if (!saveLocation) {
      const paths = await readdir(workspacePath);
      if (!paths.find((p) => p === ".vscode")) {
        await mkdir(path.join(workspacePath, ".vscode"));
      }
      const workspacePaths = await readdir(path.join(workspacePath, ".vscode"));
      if (!workspacePaths.find((p) => p === "breakpoints")) {
        await mkdir(path.join(workspacePath, ".vscode", "breakpoints"));
      }
    } else {
      if (!existsSync(saveLocation)) {
        throw new Error("Specified save location does not exist");
      }
    }
  }

  async refresh() {
    await this.prepareData();
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(bookmarkFlow: BookmarkFlow) {
    return new BookmarkFlow(bookmarkFlow.label);
  }

  getChildren() {
    return Promise.resolve(this.data);
  }
}
