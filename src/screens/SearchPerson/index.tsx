import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles"; // Reutilizando seu arquivo de estilos
import { MOCK_PEOPLE } from "./mock";
// import { supabase } from '../../supabase'; // Ajuste o caminho conforme sua estrutura

interface Person {
  id: string;
  name: string;
  cpf: string;
  status?: string; // Ex: 'Procurado', 'Regular'
}

const SearchPerson = () => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);

  // Função para buscar pessoas no Supabase
  // const handleSearch = async (text: string) => {
  //   setSearchQuery(text);
  //   if (text.length < 3) {
  //     setPeople([]); // Só busca se tiver 3 ou mais caracteres para poupar banda
  //     return;
  //   }

  //   setLoading(true);
  //   // TODO: remover mock
  //   const data = MOCK_PEOPLE;
  //   const error = null;
  //   // const { data, error } = await supabase
  //   //   .from('persons')
  //   //   .select('*')
  //   //   .ilike('name', `%${text}%`) // Busca insensível a maiúsculas/minúsculas
  //   //   .limit(10);

  //   if (!error && data) {
  //     setPeople(data);
  //   }
  //   setLoading(false);
  // };

  const handleSearch = (text: string) => {
    setSearchQuery(text);

    if (text.trim() === "") {
      setPeople([]); // Se apagar o texto, limpa a lista
      return;
    }

    setLoading(true);

    // Filtra o Mock em tempo real
    // Importante: use o .toLowerCase() em ambos os lados para não diferenciar maiúsculas
    const filtered = MOCK_PEOPLE.filter(
      (person) =>
        person.name.toLowerCase().includes(text.toLowerCase()) ||
        person.cpf.includes(text)
    );

    setPeople(filtered);
    setLoading(false);
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search-outline" size={80} color="#334155" />
      <Text style={styles.emptyText}>
        {searchQuery.length < 3
          ? "Digite pelo menos 3 letras para buscar"
          : "Nenhuma pessoa encontrada com este nome."}
      </Text>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{ flex: 1, backgroundColor: "#0A0F14", paddingTop: insets.top }}
      >
        <View style={styles.container}>
          <Text style={styles.headerTitle}>Consultar Indivíduo</Text>

          {/* Barra de Busca */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#1d4ed8"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Digite o nome completo..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={handleSearch}
              autoCorrect={false}
            />
            {loading && (
              <ActivityIndicator color="#1d4ed8" style={{ marginRight: 10 }} />
            )}
          </View>

          {/* Lista de Pessoas */}
          <FlatList
            data={people}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.personCard}>
                <View style={styles.personInfo}>
                  <Text style={styles.personName}>{item.name}</Text>
                  <Text style={styles.personCpf}>CPF: {item.cpf}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#334155" />
              </TouchableOpacity>
            )}
            ListEmptyComponent={renderEmptyComponent}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchPerson;
