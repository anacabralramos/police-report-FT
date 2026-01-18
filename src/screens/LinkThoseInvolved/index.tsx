import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";

import { Input, RegisterForm, Typography, Wrapper } from "@components";
import { useAppNavigation } from "@navigation";
import { Ionicons } from "@expo/vector-icons";
import { useOccurrenceStore } from "@store";
import { SelectedPerson } from "@types";
import { usePeople } from "@hooks";

import { styles } from "./styles";

export default function LinkThoseInvolved() {
  const navigation = useAppNavigation();

  const setTempSelectedPeople = useOccurrenceStore(
    (state) => state.setTempSelectedPeople,
  );

  const [searchText, setSearchText] = useState("");
  const [selectedPeople, setSelectedPeople] = useState<SelectedPerson[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data: peopleList } = usePeople(searchText);

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
      <View style={styles.search}>
        <Input
          placeholder="Buscar por Nome ou CPF"
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={setSearchText}
          iconName="search"
        />
        {peopleList && !!peopleList.length && (
          <View style={styles.searchResults}>
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
                <Typography variant="default">
                  {item.nome} - {item.cpf}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <View>
        <Typography
          variant="default"
          color="#8e8e93"
          style={styles.selectedText}
        >
          {`Selecionados ${selectedPeople.length}`}
        </Typography>
        <View
          style={{
            gap: 8,
          }}
        >
          {selectedPeople.map((p) => (
            <View key={p.id} style={styles.selectedChip}>
              <Typography variant="default">{p.nome}</Typography>
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
        style={styles.ghostButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Ionicons name="add-circle-outline" size={20} color="#1d4ed8" />
        <Typography variant="default" color="#1d4ed8">
          NÃO ENCONTROU? CADASTRAR NOVO
        </Typography>
      </TouchableOpacity>
      <RegisterForm
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSuccess={(newPerson) => {
          addPersonToSelection(newPerson);
        }}
      />
      <TouchableOpacity
        style={[
          styles.confirmButton,
          !selectedPeople.length && { opacity: 0.6 },
        ]}
        disabled={!selectedPeople.length}
        onPress={handleFinish}
      >
        <Typography variant="default" style={styles.confirmButtonText}>
          CONCLUIR VINCULAÇÃO
        </Typography>
      </TouchableOpacity>
    </Wrapper>
  );
}
