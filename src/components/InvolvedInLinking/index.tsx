import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { SelectedPerson } from "@types";

import { styles } from "./styles";

interface InvolvedInLinkingProps {
  involved: SelectedPerson[];
  onDelete: (id: string) => void;
}

const InvolvedInLinking = ({ involved, onDelete }: InvolvedInLinkingProps) => {
  if (involved.length === 0) {
    return;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Envolvidos vinculados:</Text>
      {involved.map((person) => (
        <View key={person.id} style={styles.badge}>
          <View style={styles.info}>
            <Ionicons name="person" size={16} color="#1d4ed8" />
            <Text style={styles.name} numberOfLines={1}>
              {person.nome}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => onDelete(person.id)}
            hitSlop={styles.hitStop}
          >
            <Ionicons name="close-circle" size={20} color="#ff4444" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default InvolvedInLinking;
