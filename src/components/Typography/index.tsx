import React from "react";
import { Text, TextProps } from "react-native";

import { styles } from "./styles";

interface TypographyProps extends TextProps {
  children: string | string[];
  variant?: "title" | "smallDefault" | "label" | "default" | "largeDefault";
  color?: string;
}

const Typography = ({
  children,
  variant = "title",
  color,
  style,
  ...props
}: TypographyProps) => {
  return (
    <Text
      style={[
        styles[variant],
        style,
        color && {
          color,
        },
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default Typography;
