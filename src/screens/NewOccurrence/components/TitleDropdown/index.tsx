import React, { useState } from "react";
import { TouchableOpacity, View, TextInput, ScrollView } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { TITULOS_PADRAO } from "@constants";
import { Typography } from "@components";
import { OccurrenceForm } from "@types";

import { styles } from "./styles";

interface TitleDropdownProps {
  title: string;
  updateForm: (field: keyof OccurrenceForm, value: any) => void;
}

const TitleDropdown = ({ updateForm, title }: TitleDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isManualInput, setIsManualInput] = useState(false);

  const handleSelect = (item: string) => {
    if (item === "Outros") {
      setIsManualInput(true);
      updateForm("titulo", "");
    } else {
      updateForm("titulo", item);
      setIsManualInput(false);
    }
    setIsDropdownOpen(false);
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="document-text"
          size={20}
          color="#1d4ed8"
          style={styles.inputIcon}
        />

        {isManualInput ? (
          <TextInput
            style={styles.input}
            placeholder="Digite o título..."
            placeholderTextColor="#666"
            autoFocus
            value={title}
            onChangeText={(text) => {
              updateForm("titulo", text);
            }}
          />
        ) : (
          <TouchableOpacity
            style={styles.input}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Typography variant="default" color={title ? "#fff" : "#666"}>
              {title || "Selecione o título..."}
            </Typography>
          </TouchableOpacity>
        )}

        {(title.length > 0 || isManualInput) && (
          <TouchableOpacity
            onPress={() => {
              updateForm("titulo", "");
              setIsManualInput(false);
              setIsDropdownOpen(false);
            }}
          >
            <Ionicons name="close-circle" size={18} color="#ff4444" />
          </TouchableOpacity>
        )}
      </View>

      {isDropdownOpen && !isManualInput && (
        <View style={styles.dropdownList}>
          <ScrollView nestedScrollEnabled={true}>
            {["Outros", ...TITULOS_PADRAO].map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.dropdownItem}
                onPress={() => handleSelect(item)}
              >
                <Typography
                  variant="default"
                  color={item === "Outros" ? "#1d4ed8" : ""}
                >
                  {item}
                </Typography>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default TitleDropdown;
