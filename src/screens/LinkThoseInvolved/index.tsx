import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import { RegisterForm, Wrapper } from "@components";
import { Person, SelectedPerson } from "@types";
import { useAppNavigation } from "@navigation";
import { Ionicons } from "@expo/vector-icons";
import { useOccurrenceStore } from "@store";
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

  const { data: peopleList } = usePeople(searchText, true);

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
    if (selectedPeople.length) {
      setTempSelectedPeople(selectedPeople);
    }
    navigation.goBack();
  };

  return (
    <Wrapper title="Vincular Envolvidos" useScroll>
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
            placeholder="Buscar por Nome ou CPF"
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
      <View style={{ minHeight: 60, marginBottom: 20 }}>
        <Text style={styles.sectionLabel}>
          Selecionados ({selectedPeople.length})
        </Text>
        <View
          style={{
            gap: 8,
          }}
        >
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
        </View>
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
    </Wrapper>
  );
}
