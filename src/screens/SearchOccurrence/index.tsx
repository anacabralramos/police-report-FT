import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";

import { getImageUrl, useOccurrences } from "@hooks";
import { useAppNavigation } from "@navigation";
import { Ionicons } from "@expo/vector-icons";
import { formatDateToLocale } from "@utils";
import { OccurrenceFilter } from "@types";
import {
  DatePicker,
  FilterByTitle,
  FilterCarousel,
  Wrapper,
} from "@components";

import { styles } from "./styles";

const SearchOccurrence = () => {
  const navigation = useAppNavigation();

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
        // ... dentro do componente SearchOccurrence, no FlatList renderItem ...

        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.occurrenceCard}
            onPress={() =>
              navigation.navigate("OccurrenceDetails", { id: item.id })
            }
          >
            {/* Lado Esquerdo: Imagem (sempre fixa) */}
            <View style={styles.imageSide}>
              {item.fotos && item.fotos.length > 0 ? (
                <Image
                  source={{ uri: getImageUrl(item.fotos[0]) }}
                  style={styles.occurrenceCover}
                  onLoadStart={() => console.log("Carregando foto...")}
                  onError={(e) =>
                    console.log("Erro ao carregar foto:", e.nativeEvent.error)
                  }
                />
              ) : (
                <View style={[styles.occurrenceCover, styles.placeholderImage]}>
                  <Ionicons name="image-outline" size={30} color="#334155" />
                </View>
              )}
            </View>

            {/* Lado Direito: Todo o restante do conteúdo */}
            <View style={styles.occurrenceInfo}>
              <View style={styles.occurrenceHeader}>
                <Text style={styles.occurrenceDate}>
                  {formatDateToLocale(item.data_hora)}
                </Text>
                <Text style={styles.occurrenceLocation} numberOfLines={1}>
                  {item.localizacao}
                </Text>
              </View>

              <Text style={styles.occurrenceTitle} numberOfLines={2}>
                {item.titulo}
              </Text>

              {item.ocorrencia_envolvidos &&
                item.ocorrencia_envolvidos.length > 0 &&
                item.ocorrencia_envolvidos.map((person, index) => (
                  <View style={styles.involvedContainer} key={index}>
                    <Ionicons
                      name="person-circle-outline"
                      size={16}
                      color="#8e8e93"
                    />
                    <Text style={styles.personCpf} numberOfLines={1}>
                      {person.pessoas.nome}
                    </Text>
                  </View>
                ))}
            </View>

            {/* Indicador de navegação */}
            <Ionicons
              name="chevron-forward"
              size={18}
              color="#334155"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        )}
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
