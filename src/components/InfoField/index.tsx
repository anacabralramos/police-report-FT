import React from "react";
import { View } from "react-native";

import { Typography } from "@components";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";

interface InfoFieldProps {
  label: string;
  value: string;
  icon: string;
}

const InfoField = ({ label, value, icon }: InfoFieldProps) => (
  <View style={styles.container}>
    <Ionicons name={icon as any} size={22} color="#3b82f6" />
    <View>
      <Typography variant="label">{label.toUpperCase()}</Typography>
      <Typography variant="default">{value || "Não informado"}</Typography>
    </View>
  </View>
);

export default InfoField;
