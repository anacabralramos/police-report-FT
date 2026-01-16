import React from "react";
import { View, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Typography from "components/Typography";
import { styles } from "./styles";

interface InvolvedCardProps {
  nome: string;
  onClose?: () => void;
  onPress?: () => void;
  iconName: React.ReactNode;
  iconColor?: string;
}

const InvolvedCard = ({
  nome,
  iconName,
  onPress,
  onClose,
  iconColor = "#ff4444",
}: InvolvedCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={styles.container}
    >
      <View style={styles.info}>
        <Ionicons name="person" size={16} color="#1d4ed8" />
        <Typography variant="default">{nome}</Typography>
      </View>

      <TouchableOpacity onPress={onClose} hitSlop={styles.hitStop}>
        <Ionicons name={iconName as any} size={20} color={iconColor} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default InvolvedCard;
