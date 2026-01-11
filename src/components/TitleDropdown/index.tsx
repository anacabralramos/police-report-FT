import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { TITULOS_PADRAO } from "../../constants";
import { styles } from "./styles";

interface TitleDropdownProps {
  // selectedFilter: OccurrenceFilter | null;
  // onSelectFilter: (filter: OccurrenceFilter | null) => void;
}

const TitleDropdown = ({}: // selectedFilter,
// onSelectFilter,

TitleDropdownProps) => {
  // 1. Adicione estes estados novos
  const [title, setTitle] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 2. Filtre as sugestões conforme o usuário digita
  const filteredSuggestions = ["Outro", ...TITULOS_PADRAO].filter((item) =>
    item.toLowerCase().includes(title.toLowerCase())
  );

  // const [title, setTitle] = useState("");
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isManualInput, setIsManualInput] = useState(false); // Controla se liberamos a escrita

  const handleSelect = (item: string) => {
    if (item === "Outros") {
      setIsManualInput(true);
      setTitle(""); // Limpa para ele escrever o novo
    } else {
      setTitle(item);
      // onTitleChange(item);
      setIsManualInput(false);
    }
    setIsDropdownOpen(false);
  };

  // ... dentro do return ...
  return (
    <View style={styles.dropdownWrapper}>
      <Text style={styles.label}>Título da Ocorrência</Text>

      {/* Overlay para fechar ao tocar fora */}
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
              setTitle(text);
              // onTitleChange(text);
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
              setTitle("");
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
