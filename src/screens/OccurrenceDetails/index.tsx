import React from "react";
import { View, Text, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "../../navigation";
import { useOccurrenceDetails } from "../../hooks";
import { ImageCarousel } from "../../components";
import { styles } from "./styles";
import { formatDateToLocale } from "../../utils";

type PersonDetailsRouteProp = RouteProp<
  RootStackParamList,
  "OccurrenceDetails"
>;

const OccurrenceDetails = () => {
  const { params } = useRoute<PersonDetailsRouteProp>();
  const { data: occurrence, isLoading } = useOccurrenceDetails(params.id);

  return (
    <ScrollView style={styles.mainContainer}>
      {/* 1. Carrossel de Imagens */}
      <ImageCarousel images={occurrence.fotos} />

      <View style={styles.container}>
        {/* 2. Cabeçalho e Data */}
        <View style={styles.sectionHeader}>
          <Text style={styles.titleText}>{occurrence.titulo}</Text>
          <View style={styles.row}>
            <Ionicons name="calendar-outline" size={16} color="#1d4ed8" />
            <Text style={styles.dateText}>
              {formatDateToLocale(occurrence.data_hora)}
            </Text>
          </View>
        </View>

        {/* 3. Localização */}
        <View style={styles.infoCard}>
          <Text style={styles.label}>Local da Ocorrência</Text>
          <View style={styles.row}>
            <Ionicons name="location-outline" size={18} color="#8e8e93" />
            <Text style={styles.infoText}>{occurrence.localizacao}</Text>
          </View>
        </View>

        {/* 4. Descrição / Relato */}
        <View style={styles.infoCard}>
          <Text style={styles.label}>Relato da Equipe</Text>
          <Text style={styles.descriptionText}>{occurrence.descricao}</Text>
        </View>

        {/* 5. Envolvidos */}
        {occurrence?.involved && occurrence?.involved.length && (
          <View style={styles.infoCard}>
            <Text style={styles.label}>Envolvidos</Text>
            {occurrence.involved.map((person, index) => (
              <View key={index} style={styles.personTag}>
                <Ionicons name="person-outline" size={16} color="#1d4ed8" />
                <Text style={styles.personTagText}>{person}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default OccurrenceDetails;
