import React from "react";
import { View } from "react-native";

import { Typography } from "@components";
import { styles } from "./styles";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section = ({ children, title }: SectionProps) => {
  return (
    <View style={styles.section}>
      <Typography variant="largeDefault" color="#8e8e93">
        {title}
      </Typography>
      {children}
    </View>
  );
};

export default Section;
