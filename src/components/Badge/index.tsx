import React from "react";
import { View } from "react-native";

import { styles } from "./styles";
import Typography from "components/Typography";

interface BadgeProps {
  text: string;
}

const Badge = ({ text }: BadgeProps) => {
  return (
    <View style={styles.badge}>
      <Typography style={styles.text} variant="label">
        {text}
      </Typography>
    </View>
  );
};

export default Badge;
