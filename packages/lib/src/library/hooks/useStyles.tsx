import React from "react";
import { useTheme } from "../providers";

const useStyles = (type: "background" | "primary" | "secondary") => {
  const theme = useTheme();

  const palette = theme.palette.darkMode
    ? theme.palette.dark
    : theme.palette.light;

  const backgroundColor =
    type === "primary"
      ? palette.primary
      : type === "secondary"
      ? palette.secondary
      : palette.surface;

  const colors: React.CSSProperties = {
    backgroundColor: backgroundColor,
    color: palette.text,
  };

  const styles: React.CSSProperties = {
    ...colors,
    transition: theme.transition,
  };

  return styles;
};

export default useStyles;
