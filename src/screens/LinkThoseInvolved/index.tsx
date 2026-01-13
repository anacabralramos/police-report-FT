import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Person, SelectedPerson } from "@types";
import { useAppNavigation } from "@navigation";
import { Ionicons } from "@expo/vector-icons";
import { useOccurrenceStore } from "@store";
import { RegisterForm } from "@components";
import { usePeople } from "@hooks";

import { styles } from "./styles";

export default function LinkThoseInvolved() {
  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();

  const setTempSelectedPeople = useOccurrenceStore(
    (state) => state.setTempSelectedPeople
  );

  // Estados de busca e seleção
  const [searchText, setSearchText] = useState("");
  const [selectedPeople, setSelectedPeople] = useState<SelectedPerson[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data: peopleList } = usePeople(searchText);

  // Estados do Novo Cadastro
  const [formData, setFormData] = useState<Person>({
    nome: "",
    cpf: "",
    rg: "",
    data_nascimento: new Date(),
    endereco: "",
  });

  const addPersonToSelection = (person: SelectedPerson) => {
    if (!selectedPeople.find((item) => item.id === person.id)) {
      setSelectedPeople((prevValue) => [
        ...prevValue,
        {
          id: person.id,
          nome: person.nome,
        },
      ]);
      setSearchText("");
    }
  };

  const removePerson = (id: string) => {
    setSelectedPeople(selectedPeople.filter((p) => p.id !== id));
  };

  const handleFinish = () => {
    setTempSelectedPeople(selectedPeople);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#0A0F14" }}
    >
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top + 20,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 20,
          },
        ]}
      >
        <Text style={styles.headerTitle}>Vincular Envolvidos</Text>

        {/* --- 1. BUSCA DE PESSOAS --- */}
        <View style={styles.searchSection}>
          <View style={styles.inputContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#1d4ed8"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Buscar por Nome"
              placeholderTextColor="#666"
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchText("")}
                style={{ padding: 5 }}
              >
                <Ionicons name="close-circle" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>
          {/* Resultados da busca (Dropdown) */}
          {peopleList && !!peopleList.length && (
            <View style={styles.searchResultsList}>
              {peopleList.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.searchItem}
                  onPress={() =>
                    addPersonToSelection({
                      nome: item.nome,
                      id: item.id,
                    })
                  }
                >
                  <Text style={styles.searchItemText}>
                    {item.nome} - {item.cpf}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* --- 2. PESSOAS SELECIONADAS (CHIPS) --- */}
        <View style={{ height: 60, marginBottom: 20 }}>
          <Text style={styles.sectionLabel}>
            Selecionados ({selectedPeople.length})
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {selectedPeople.map((p) => (
              <View key={p.id} style={styles.selectedChip}>
                <Text style={styles.chipText}>{p.nome}</Text>
                <TouchableOpacity onPress={() => removePerson(p.id)}>
                  <Ionicons
                    name="close-circle"
                    size={18}
                    color="#ff4444"
                    style={{ marginLeft: 8 }}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.divider} />

        <TouchableOpacity
          style={[styles.ghostButton, { marginTop: 10 }]}
          onPress={() => setIsModalVisible(true)}
        >
          <Ionicons name="add-circle-outline" size={20} color="#1d4ed8" />
          <Text style={{ color: "#1d4ed8", fontWeight: "bold", marginLeft: 8 }}>
            NÃO ENCONTROU? CADASTRAR NOVO
          </Text>
        </TouchableOpacity>
        <RegisterForm
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          formData={formData}
          setFormData={setFormData}
          onSuccess={(newPerson) => {
            addPersonToSelection(newPerson);
          }}
        />

        {/* --- 4. BOTÃO FINAL --- */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleFinish}>
          <Text style={styles.confirmButtonText}>CONCLUIR VINCULAÇÃO</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
