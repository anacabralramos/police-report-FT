import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { TITULOS_PADRAO } from "../../constants";
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
    <View style={styles.dropdownWrapper}>
      <Text style={styles.label}>Título da Ocorrência</Text>

      {isDropdownOpen && (
        <TouchableWithoutFeedback onPress={() => setIsDropdownOpen(false)}>
          <View style={styles.fullScreenOverlay} />
        </TouchableWithoutFeedback>
      )}

      <View style={styles.inputContainer}>
        <Ionicons
          name="document-text"
          size={20}
          color="#1d4ed8"
          style={styles.inputIcon}
        />

        {isManualInput ? (
          // MODO ESCRITA: Aparece apenas se selecionou "Outros"
          <TextInput
            style={styles.input}
            placeholder="Digite o título da ocorrência..."
            placeholderTextColor="#666"
            autoFocus
            value={title}
            onChangeText={(text) => {
              updateForm("titulo", text);
            }}
          />
        ) : (
          // MODO SELEÇÃO: Um botão que abre a lista
          <TouchableOpacity
            style={styles.input}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Text style={{ color: title ? "#fff" : "#666", fontSize: 16 }}>
              {title || "Selecione o título..."}
            </Text>
          </TouchableOpacity>
        )}

        {/* Botão para resetar e voltar para a lista se estiver no modo manual */}
        {(title.length > 0 || isManualInput) && (
          <TouchableOpacity
            onPress={() => {
              updateForm("titulo", "");
              setIsManualInput(false);
              setIsDropdownOpen(false);
            }}
          >
            <Ionicons name="close-circle" size={18} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Lista de Sugestões */}
      {isDropdownOpen && !isManualInput && (
        <View style={styles.dropdownList}>
          <ScrollView nestedScrollEnabled={true}>
            {/* Mapeia os títulos padrão + a opção Outros */}
            {["Outros", ...TITULOS_PADRAO].map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.dropdownItem}
                onPress={() => handleSelect(item)}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    item === "Outros" && {
                      color: "#1d4ed8",
                      fontWeight: "bold",
                    },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default TitleDropdown;
