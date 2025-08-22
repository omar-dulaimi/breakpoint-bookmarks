import { existsSync } from "fs";
import { mkdir, readdir } from "fs/promises";
import * as path from "path";
import * as vscode from "vscode";
import { getBookmarkFlowDirectoryPath } from "../utils/path-utils";

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

    if (!workspacePath) {
      vscode.window.showInformationMessage("No workspace opened!");
      return;
    }

    const config = vscode.workspace.getConfiguration("breakpointBookmark");
    const saveLocation = config.get("saveLocation") as string;

    const isDirExist = await this.assureSaveDirectoryExist(
      saveLocation,
      workspacePath
    );
    if (!isDirExist) {
      return;
    }

    const flowsPaths = await readdir(
      getBookmarkFlowDirectoryPath(workspacePath, saveLocation)
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
      return true;
    } else {
      const fullPath = path.resolve(workspacePath, saveLocation);
      if (!existsSync(fullPath)) {
        vscode.window.showInformationMessage(
          "Specified save location does not exist. Please make sure it exists"
        );
        return false;
      } else {
        return true;
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
