import React from "react";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  childrenCustomStyles?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const Card = ({
  children,
  onPress,
  childrenCustomStyles,
  disabled = false,
}: CardProps) => {
  const Container = onPress ? TouchableOpacity : View;
  return (
    <Container style={styles.card} onPress={onPress} disabled={disabled}>
      <View style={childrenCustomStyles}>{children}</View>
      {!!onPress && !disabled && (
        <Ionicons name="chevron-forward" size={20} color="#334155" />
      )}
    </Container>
  );
};

export default Card;
