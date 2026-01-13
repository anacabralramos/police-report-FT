import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { OccurrenceFilter } from "@types";
import { useOccurrences } from "@hooks";
import {
  DatePicker,
  FilterByInvolved,
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

  const { data: occurrences } = useOccurrences({
    option: filterOption,
    text: filterText,
    date: filterDate,
  });

  const handleChangeFilter = (filter: OccurrenceFilter | null) => {
    setFilterOption(filter);
    if (filter === "DATE") {
      setFilterDate(new Date());
    } else {
      setFilterText("");
    }
  };

  return (
    <Wrapper title="Ocorrências">
      <FilterCarousel
        selectedFilter={filterOption}
        onSelectFilter={handleChangeFilter}
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
          mode="date"
        />
      )}
      {filterOption === "INVOLVED" && (
        <FilterByInvolved
          filterText={filterText}
          setFilterText={setFilterText}
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
