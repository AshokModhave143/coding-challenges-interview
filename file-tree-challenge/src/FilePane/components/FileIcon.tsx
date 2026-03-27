import React from "react";
import { themeIcons } from "seti-icons";

interface IFileIconProps {
  fileName: string;
}

const _FileIcon: React.FC<IFileIconProps> = ({ fileName }) => {
  const getIcon = themeIcons({
    blue: "#268bd2",
    grey: "#657b83",
    "grey-light": "#839496",
    green: "#859900",
    orange: "#cb4b16",
    pink: "#d33682",
    purple: "#6c71c4",
    red: "#dc322f",
    white: "#839496",
    yellow: "#b58900",
    ignore: "#586e75",
  });

  const { svg, color } = getIcon(fileName);

  return (
    <div
      className="file-icon-wrapper"
      style={{
        fill: color,
        height: "inherit",
        width: "inherit",
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export const FileIcon = React.memo(_FileIcon);
