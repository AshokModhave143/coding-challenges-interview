import React, { useCallback, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { FileRow } from "./components/FileRow";
import { useWorkspaceContext } from "../Workspace/WorkspaceContext";
import { buildFileTree, flattenTree } from "./fileTree";

export const FilePane = () => {
  const { files, activeFile, activateFile } = useWorkspaceContext();

  const [collapsedPaths, setCollapsedPaths] = useState<Set<string>>(new Set());

  const fileTree = useMemo(() => buildFileTree(files), [files]);
  const rows = useMemo(
    () => flattenTree(fileTree, collapsedPaths),
    [fileTree, collapsedPaths],
  );

  const toggleFolder = useCallback((path: string) => {
    setCollapsedPaths((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  }, []);

  return (
    <Box>
      <Box p={1}>
        <Typography variant="h6">Files</Typography>
      </Box>
      {rows.length === 0 ? (
        <Box>
          <Typography variant="body2">No files found.</Typography>
        </Box>
      ) : (
        rows.map(({ node, depth }) => (
          <FileRow
            key={node.path}
            node={node}
            depth={depth}
            isActive={node.kind === "file" && node.path === activeFile?.path}
            onFileClick={activateFile}
            onFolderClick={toggleFolder}
            isExpanded={
              node.kind === "folder"
                ? !collapsedPaths.has(node.path)
                : undefined
            }
          />
        ))
      )}
    </Box>
  );
};
