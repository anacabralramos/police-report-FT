import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { ImageCarousel } from "../../components";

const OccurrenceDetails = () => {
  const route = useRoute<any>();

  // Mock de dados (No futuro virá de route.params.occurrence)
  const occurrence = {
    title: "Averiguação de Atitude Suspeita",
    date: "10/01/2026 - 18:30",
    location: "Av. Central, 1000 - Centro",
    description:
      "Durante patrulhamento de rotina, a guarnição avistou um indivíduo em atitude suspeita próximo ao estabelecimento comercial. Após abordagem, nada de ilícito foi encontrado, porém o mesmo possuía passagens por furto.",
    involved: ["João Rodrigues dos Santos", "Maria Oliveira (Testemunha)"],
    images: [
      "https://via.placeholder.com/400x250/1d4ed8/FFFFFF?text=Foto+1",
      "https://via.placeholder.com/400x250/334155/FFFFFF?text=Foto+2",
    ],
  };

  return (
    <ScrollView style={styles.mainContainer}>
      {/* 1. Carrossel de Imagens */}
      <ImageCarousel images={occurrence.images} />

      <View style={styles.container}>
        {/* 2. Cabeçalho e Data */}
        <View style={styles.sectionHeader}>
          <Text style={styles.titleText}>{occurrence.title}</Text>
          <View style={styles.row}>
            <Ionicons name="calendar-outline" size={16} color="#1d4ed8" />
            <Text style={styles.dateText}>{occurrence.date}</Text>
          </View>
        </View>

        {/* 3. Localização */}
        <View style={styles.infoCard}>
          <Text style={styles.label}>Local da Ocorrência</Text>
          <View style={styles.row}>
            <Ionicons name="location-outline" size={18} color="#8e8e93" />
            <Text style={styles.infoText}>{occurrence.location}</Text>
          </View>
        </View>

        {/* 4. Descrição / Relato */}
        <View style={styles.infoCard}>
          <Text style={styles.label}>Relato da Equipe</Text>
          <Text style={styles.descriptionText}>{occurrence.description}</Text>
        </View>

        {/* 5. Envolvidos */}
        <View style={styles.infoCard}>
          <Text style={styles.label}>Envolvidos</Text>
          {occurrence.involved.map((person, index) => (
            <View key={index} style={styles.personTag}>
              <Ionicons name="person-outline" size={16} color="#1d4ed8" />
              <Text style={styles.personTagText}>{person}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default OccurrenceDetails;
