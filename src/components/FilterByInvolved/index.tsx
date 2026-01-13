import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

interface Props {
  filterText: string;
  setFilterText: (t: string) => void;
}

const FilterByInvolved = ({ filterText, setFilterText }: Props) => {
  return (
    <View style={styles.container}>
      <Ionicons name="people" size={20} color="#1d4ed8" />
      <TextInput
        style={styles.input}
        placeholder="Nome ou CPF do envolvido..."
        placeholderTextColor="#666"
        value={filterText}
        onChangeText={setFilterText}
      />
    </View>
  );
};

export default FilterByInvolved;
