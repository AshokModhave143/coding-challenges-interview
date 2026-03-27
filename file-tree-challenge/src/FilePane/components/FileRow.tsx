import React from "react";
import { Box, Typography } from "@mui/material";
import { FileIcon } from "./FileIcon";
import { TreeNode } from "../fileTree";

export interface FileRowProps {
  node: TreeNode;
  depth: number;
  isActive: boolean;
  isExpanded?: boolean;
  onFileClick: (path: string) => void;
  onFolderClick: (path: string) => void;
}

export const FileRow = ({
  node,
  depth,
  isActive,
  isExpanded,
  onFileClick,
  onFolderClick,
}: FileRowProps) => {
  const isFolder = node.kind === "folder";
  const iconName = isFolder ? `${node.name}/` : node.name;

  const handleClick = () => {
    if (isFolder) {
      onFolderClick(node.path);
    } else {
      onFileClick(node.path);
    }
  };

  return (
    <Box
      display="flex"
      height="1.5rem"
      flexDirection="row"
      alignItems="center"
      px={1}
      sx={{
        pl: 1 + depth * 2,
        pr: 1,
        cursor: "pointer",
        background: isActive ? "#DADADA" : "inherit",
        "&:hover": {
          background: "#d2dbf3",
        },
      }}
      onClick={handleClick}
    >
      <Box
        width="1.5rem"
        display="flex"
        alignItems="center"
        flexShrink={0}
        mr={0.5}
      >
        <FileIcon fileName={iconName} />
      </Box>
      <Typography variant="body2" noWrap>
        {node.name}
      </Typography>
      {isFolder && (
        <Typography variant="body2" color="textSecondary" ml={0.5}>
          ({isExpanded ? "⌄" : ">"})
        </Typography>
      )}
    </Box>
  );
};
