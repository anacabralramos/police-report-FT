import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { OccurrenceFilter } from "@types";
import { useOccurrences } from "@hooks";
import {
  DatePicker,
  FilterByTitle,
  FilterCarousel,
  OccurrenceCard,
  Wrapper,
} from "@components";

import { styles } from "./styles";

const SearchOccurrence = () => {
  const [filterOption, setFilterOption] = useState<OccurrenceFilter | null>(
    null
  );
  const [filterText, setFilterText] = useState("");
  const [filterDate, setFilterDate] = useState(new Date());

  const {
    data: occurrences,
    isLoading,
    isFetching,
  } = useOccurrences({
    option: filterOption,
    text: filterText,
    date: filterDate,
  });

  return (
    <Wrapper title="Ocorrências">
      <FilterCarousel
        selectedFilter={filterOption}
        onSelectFilter={setFilterOption}
      />
      {/* Renderização Condicional do Input baseada no Filtro */}
      {filterOption === "TITLE" && (
        <FilterByTitle filterText={filterText} setFilterText={setFilterText} />
      )}
      {filterOption === "DATE" && (
        <DatePicker
          label="Selecione o dia"
          date={filterDate || new Date()}
          onChange={(d) => setFilterDate(d)}
          mode="date" // <--- Aqui a mágica acontece
        />
      )}

      {/* Lista de Ocorrências */}
      <FlatList
        data={occurrences}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ marginTop: 10, paddingBottom: 20 }}
        renderItem={({ item }) => <OccurrenceCard occurrence={item} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={60} color="#334155" />
            <Text style={styles.emptyText}>Nenhuma ocorrência encontrada.</Text>
          </View>
        }
      />
    </Wrapper>
  );
};

export default SearchOccurrence;
