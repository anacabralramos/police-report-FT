import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { View, FlatList, ActivityIndicator } from "react-native";

import { Input, PersonCard, Typography, Wrapper } from "@components";
import { Ionicons } from "@expo/vector-icons";
import { usePeople } from "@hooks";

import { styles } from "./styles";

const SearchPerson = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebounce(searchQuery, 500);
  const {
    data: peopleList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
  } = usePeople(debouncedSearch);

  const allPeople = peopleList?.pages.flat() || [];

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="people-outline" size={80} color="#334155" />
      <Typography variant="default" color="#8e8e93">
        Nenhum indivíduo encontrado.
      </Typography>
    </View>
  );

  return (
    <Wrapper title="Consultar indivíduo">
      <View style={styles.container}>
        <Input
          iconName="search"
          placeholder="Buscar por nome ou CPF..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {isLoading ? (
          <ActivityIndicator size="large" color="white" style={{ flex: 1 }} />
        ) : (
          <FlatList
            data={allPeople}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PersonCard
                fotos={item.fotos}
                nome={item.nome}
                cpf={item.cpf}
                id={item.id}
              />
            )}
            refreshing={isRefetching}
            ListEmptyComponent={renderEmptyComponent}
            contentContainerStyle={styles.contentContainer}
            onEndReached={() => {
              if (hasNextPage) fetchNextPage();
            }}
            onEndReachedThreshold={0.5} // Carrega quando chegar na metade do último item
            ListFooterComponent={
              isFetchingNextPage ? <ActivityIndicator /> : null
            }
          />
        )}
      </View>
    </Wrapper>
  );
};

export default SearchPerson;
