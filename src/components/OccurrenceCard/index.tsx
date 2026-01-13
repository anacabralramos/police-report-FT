import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { useAppNavigation } from "@navigation";
import { Ionicons } from "@expo/vector-icons";
import { formatDateToLocale } from "@utils";
import { OccurrenceDetails } from "@types";
import { getImageUrl } from "@hooks";

import { styles } from "./styles";

interface OccurrenceCardProps {
  occurrence: OccurrenceDetails;
}

const OccurrenceCard = ({ occurrence }: OccurrenceCardProps) => {
  const navigation = useAppNavigation();

  const namesArray = occurrence.envolvidos_nomes?.split(" | ") || [];

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("OccurrenceDetails", { id: occurrence.id })
      }
    >
      {/* Lado Esquerdo: Imagem (sempre fixa) */}
      <View style={styles.imageContainer}>
        {occurrence.fotos && occurrence.fotos.length > 0 ? (
          <Image
            source={{ uri: getImageUrl(occurrence.fotos[0]) }}
            style={styles.image}
            onLoadStart={() => console.log("Carregando foto...")}
            onError={
              (e) => console.log("Erro ao carregar foto:")
              // console.log("Erro ao carregar foto:", e.nativeEvent.error)
            }
          />
        ) : (
          <View style={[styles.image, styles.placeholderImage]}>
            <Ionicons name="image-outline" size={30} color="#334155" />
          </View>
        )}
      </View>

      {/* Lado Direito: Todo o restante do conteúdo */}
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.date}>
            {formatDateToLocale(String(occurrence.data_hora))}
          </Text>
          <Text style={styles.location} numberOfLines={1}>
            {occurrence.localizacao}
          </Text>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {occurrence.titulo}
        </Text>

        {namesArray.length > 0 &&
          namesArray.map((person, index) => (
            <View style={styles.involvedContainer} key={index}>
              <Ionicons
                name="person-circle-outline"
                size={16}
                color="#8e8e93"
              />
              <Text style={styles.personCpf} numberOfLines={1}>
                {person}
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
  );
};

export default OccurrenceCard;
