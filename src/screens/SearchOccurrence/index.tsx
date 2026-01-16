import React, { useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { OccurrenceFilter } from "@types";
import { useOccurrences } from "@hooks";
import {
  DatePicker,
  FilterByTitle,
  FilterCarousel,
  Input,
  OccurrenceCard,
  Typography,
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

  const handleChangeFilter = (filter: OccurrenceFilter | null) => {
    setFilterOption(filter);
    if (filter === "DATE") {
      setFilterDate(new Date());
    } else {
      setFilterText("");
    }
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="document-text-outline" size={60} color="#334155" />
      <Typography variant="default" color="#8e8e93">
        Nenhuma ocorrência encontrada.
      </Typography>
    </View>
  );

  return (
    <Wrapper title="Ocorrências">
      <FilterCarousel
        selectedFilter={filterOption}
        onSelectFilter={handleChangeFilter}
      />

      {filterOption === "INVOLVED" && (
        <Input
          placeholder="Nome ou CPF do envolvido..."
          placeholderTextColor="#666"
          value={filterText}
          onChangeText={setFilterText}
          iconName="people"
        />
      )}

      {filterOption === "TITLE" && (
        <FilterByTitle filterText={filterText} setFilterText={setFilterText} />
      )}
      {filterOption === "DATE" && (
        <DatePicker
          date={filterDate || new Date()}
          onChange={(d) => setFilterDate(d)}
          mode="date"
        />
      )}

      {isLoading || isFetching ? (
        <ActivityIndicator size="large" color="white" style={styles.flex} />
      ) : (
        <FlatList
          style={styles.flex}
          data={occurrences}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.container}
          renderItem={({ item }) => <OccurrenceCard occurrence={item} />}
          ListEmptyComponent={renderEmptyComponent}
        />
      )}
    </Wrapper>
  );
};

export default SearchOccurrence;
