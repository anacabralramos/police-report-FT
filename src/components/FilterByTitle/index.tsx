import React from "react";
import { TouchableOpacity, View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import QuickSuggestions from "../QuickSuggestions";
import { styles } from "./styles";

interface FilterByTitleProps {
  filterText: string;
  setFilterText: (filterText: string) => void;
}

const FilterByTitle = ({ filterText, setFilterText }: FilterByTitleProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#1d4ed8"
          style={{
            marginRight: 10,
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Busque ou digite o título..."
          placeholderTextColor="#666"
          value={filterText}
          onChangeText={setFilterText}
        />
        {filterText !== "" && (
          <TouchableOpacity onPress={() => setFilterText("")}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Exibe as sugestões apenas se o filtro for Título */}
      <QuickSuggestions onSelect={(val) => setFilterText(val)} />
    </View>
  );
};

export default FilterByTitle;
