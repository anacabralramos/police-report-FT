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
      <Ionicons name="people-outline" size={80} color="#334155" />
      <Text style={styles.emptyText}>
        {isLoading ? "Buscando..." : "Nenhum indivíduo encontrado."}
      </Text>
    </View>
  );

  return (
    <Wrapper title="Consultar indivíduo">
      {isLoading ? (
        <ActivityIndicator size="large" color="white" style={{ flex: 1 }} />
      ) : (
        <>
          <View style={styles.inputContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#1d4ed8"
              style={styles.inputIcon}
            />

            <TextInput
              style={styles.input}
              placeholder="Buscar por nome ou CPF..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCorrect={false}
            />

            {/* Lógica: Se estiver carregando, mostra o spinner. 
      Se não estiver e tiver texto, mostra o X para limpar */}
            {isLoading ? (
              <ActivityIndicator
                size="small"
                color="#1d4ed8"
                style={{ marginRight: 10 }}
              />
            ) : (
              searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearchQuery("")}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Aumenta a área de toque
                >
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color="#666"
                    style={{ marginRight: 10 }}
                  />
                </TouchableOpacity>
              )
            )}
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
            onRefresh={refetch}
            refreshing={isLoading}
            ListEmptyComponent={renderEmptyComponent}
          />
        </>
      )}
    </Wrapper>
  );
};

export default SearchPerson;
