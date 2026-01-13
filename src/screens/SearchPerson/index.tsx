import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "@navigation";
import { Wrapper } from "@components";
import { usePeople } from "@hooks";

import { styles } from "./styles";

const SearchPerson = () => {
  const navigation = useAppNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebounce(searchQuery, 500);

  const { data: peopleList, isLoading, refetch } = usePeople(debouncedSearch);

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

  if (isLoading)
    return (
      <ActivityIndicator size="large" color="#101820" style={{ flex: 1 }} />
    );

  return (
    <Wrapper title="Consultar indivíduo">
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
          onChangeText={setSearchQuery}
          autoCorrect={false}
        />
      </View>
      <FlatList
        data={peopleList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.personCard}
            onPress={() =>
              navigation.navigate("PersonDetails", { id: item.id })
            }
          >
            <View style={styles.personInfo}>
              <Text style={styles.personName}>{item.nome}</Text>
              <Text style={styles.personCpf}>CPF: {item.cpf}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#334155" />
          </TouchableOpacity>
        )}
        // Isso aqui permite "puxar para baixo" para atualizar a lista!
        onRefresh={refetch}
        refreshing={isLoading}
        ListEmptyComponent={renderEmptyComponent}
      />
    </Wrapper>
  );
};

export default SearchPerson;
