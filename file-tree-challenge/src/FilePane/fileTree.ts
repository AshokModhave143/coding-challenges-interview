import { WorkspaceFile } from "../Workspace/WorkspaceContext";

export type FileNode = {
  kind: "file";
  name: string;
  path: string;
  contents: string;
};
export type FolderNode = {
  kind: "folder";
  name: string;
  path: string;
  children: TreeNode[];
};

export type TreeNode = FolderNode | FileNode;

type MutableFolder = {
  kind: "folder";
  name: string;
  path: string;
  children: Map<string, MutableNode>;
};

type MutableFile = {
  kind: "file";
  name: string;
  path: string;
  contents: string;
};

type MutableNode = MutableFolder | MutableFile;

/** Helpers */
const normalizePath = (path: string) =>
  path.split("/").filter(Boolean).join("/");

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

const compareNodes = (a: TreeNode, b: TreeNode): number => {
  if (a.kind != b.kind) {
    return a.kind === "folder" ? -1 : 1;
  }
  return collator.compare(a.name, b.name);
};

const toImmurable = (node: MutableNode): TreeNode => {
  if (node.kind === "file") {
    return node;
  }

  const children = Array.from(node.children.values()).map(toImmurable);
  children.sort(compareNodes);
  return {
    ...node,
    children,
  };
};

/** Util functions */
export function buildFileTree(files: WorkspaceFile[]): FolderNode {
  const root: MutableFolder = {
    kind: "folder",
    name: "",
    path: "",
    children: new Map<string, MutableNode>(),
  };

  files.forEach((file) => {
    const normalized = normalizePath(file.path);
    if (!normalized) {
      return; // TODO:
    }

    const segments = normalized.split("/");
    let current: MutableFolder = root;
    const folders = segments.slice(0, -1);
    const fileName = segments.slice(-1)[0];

    if (!fileName) {
      return; // TODO:
    }

    let currentPath = "";

    folders.forEach((folderName) => {
      currentPath = currentPath ? `${currentPath}/${folderName}` : folderName;

      const existing = current.children.get(folderName);
      if (!existing || existing.kind !== "folder") {
        const newFolder: MutableFolder = {
          kind: "folder",
          name: folderName,
          path: currentPath,
          children: new Map<string, MutableNode>(),
        };
        current.children.set(folderName, newFolder);
        current = newFolder;
      } else {
        current = existing;
      }
    });

    const filePath =
      folders.length > 0 ? `${folders.join("/")}/${fileName}` : fileName;
    const fileNode: MutableFile = {
      kind: "file",
      name: fileName,
      path: filePath,
      contents: file.contents,
    };
    current.children.set(fileName, fileNode);
  });

  return toImmurable(root) as FolderNode;
}

export type TreeRow = {
  node: TreeNode;
  depth: number;
};

export function flattenTree(
  root: FolderNode,
  collapsedPaths: ReadonlySet<string> = new Set(),
): TreeRow[] {
  const rows: TreeRow[] = [];

  const traverse = (nodes: TreeNode[], depth: number) => {
    nodes.forEach((node) => {
      rows.push({ node, depth });
      if (node.kind === "folder" && !collapsedPaths.has(node.path)) {
        traverse(node.children, depth + 1);
      }
    });
  };

  traverse(root.children, 0);
  return rows;
}
