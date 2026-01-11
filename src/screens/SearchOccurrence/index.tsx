import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { DatePicker } from "../../components";
import { useOccurrences } from "../../hooks";
import { styles } from "./styles";
import { formatDateToLocale } from "../../utils";

// Mock de Ocorrências para teste
// Mock de Ocorrências para teste
// const MOCK_OCCURRENCES = [
//   {
//     id: "1",
//     title: "Averiguação de Atitude Suspeita",
//     date: new Date(),
//     location: "Praça Central",
//     person: "João Rodrigues",
//     images: [
//       "https://via.placeholder.com/60/FF5733/FFFFFF?text=F1", // Imagem de exemplo 1
//       "https://via.placeholder.com/60/33FF57/FFFFFF?text=F2", // Imagem de exemplo 2
//     ],
//   },
//   {
//     id: "2",
//     title: "Perturbação do Sossego",
//     date: new Date(Date.now() - 86400000),
//     location: "Rua das Flores, 12",
//     person: "Maria Oliveira",
//     images: ["https://via.placeholder.com/60/3366FF/FFFFFF?text=F3"],
//   },
//   {
//     id: "3",
//     title: "Tráfico de Entorpecentes",
//     date: new Date(Date.now() - 172800000),
//     location: "Bairro Industrial",
//     person: "Carlos Eduardo",
//     images: [], // Ocorrência sem fotos
//   },
// ];
const SearchOccurrence = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { data: occurrences, isLoading } = useOccurrences();

  const [filterText, setFilterText] = useState("");
  const [filterDate, setFilterDate] = useState(new Date());
  const [showDateFilter, setShowDateFilter] = useState(false);
  // const [occurrences, setOccurrences] = useState(MOCK_OCCURRENCES);

  // const handleFilter = (text: string) => {
  //   setFilterText(text);
  //   const filtered = MOCK_OCCURRENCES.filter(
  //     (occ) =>
  //       occ.title.toLowerCase().includes(text.toLowerCase()) ||
  //       occ.person.toLowerCase().includes(text.toLowerCase())
  //   );
  //   setOccurrences(filtered);
  // };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{ flex: 1, backgroundColor: "#0A0F14", paddingTop: insets.top }}
      >
        <View style={[styles.container, { flex: 1 }]}>
          <Text style={styles.headerTitle}>Ocorrências</Text>

          {/* Barra de Filtro de Texto */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#1d4ed8"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Buscar por título ou envolvido..."
              placeholderTextColor="#666"
              value={filterText}
              // onChangeText={handleFilter}
            />
            <TouchableOpacity
              onPress={() => setShowDateFilter(!showDateFilter)}
            >
              <Ionicons
                name="calendar-outline"
                size={24}
                color={showDateFilter ? "#1d4ed8" : "#8e8e93"}
              />
            </TouchableOpacity>
          </View>

          {/* Filtro de Data Expansível */}
          {showDateFilter && (
            <View style={{ marginBottom: 20 }}>
              <DatePicker
                label="Filtrar por data específica"
                date={filterDate}
                onChange={(d) => setFilterDate(d)}
              />
            </View>
          )}

          {/* Lista de Ocorrências */}
          <FlatList
            data={occurrences}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
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
                      source={{ uri: item.fotos[0] }}
                      style={styles.occurrenceCover}
                    />
                  ) : (
                    <View
                      style={[styles.occurrenceCover, styles.placeholderImage]}
                    >
                      <Ionicons
                        name="image-outline"
                        size={30}
                        color="#334155"
                      />
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
                    item.ocorrencia_envolvidos.length > 0 && (
                      <View style={styles.involvedContainer}>
                        <Ionicons
                          name="person-circle-outline"
                          size={16}
                          color="#8e8e93"
                        />
                        <Text style={styles.personCpf} numberOfLines={1}>
                          {item.ocorrencia_envolvidos}
                        </Text>
                      </View>
                    )}
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
                <Ionicons
                  name="document-text-outline"
                  size={60}
                  color="#334155"
                />
                <Text style={styles.emptyText}>
                  Nenhuma ocorrência encontrada.
                </Text>
              </View>
            }
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchOccurrence;
