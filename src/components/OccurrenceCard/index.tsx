import React from "react";
import { View } from "react-native";

import { Card, Typography } from "@components";
import { useAppNavigation } from "@navigation";
import { Ionicons } from "@expo/vector-icons";
import { formatDateToLocale } from "@utils";
import { OccurrenceDetails } from "@types";

import { styles } from "./styles";

interface OccurrenceCardProps {
  occurrence: OccurrenceDetails;
}

const OccurrenceCard = ({ occurrence }: OccurrenceCardProps) => {
  const navigation = useAppNavigation();

  const namesArray = occurrence.envolvidos_nomes?.split(" | ") || [];
  const street = occurrence.localizacao.split(",")[0] || "";

  return (
    <Card
      onPress={() =>
        navigation.navigate("OccurrenceDetails", { id: occurrence.id })
      }
      childrenCustomStyles={styles.card}
    >
      <View style={styles.header}>
        <Typography variant="smallDefault" color="#1d4ed8">
          {formatDateToLocale(String(occurrence.data_hora))}
        </Typography>
        <Typography variant="smallDefault" color="#8e8e93">
          {street}
        </Typography>
      </View>

      <Typography variant="default">{occurrence.titulo}</Typography>

      {!!namesArray.length &&
        namesArray.map((person, index) => (
          <View style={styles.involvedContainer} key={index}>
            <Ionicons name="person-circle-outline" size={16} color="#8e8e93" />
            <Typography variant="smallDefault">{person}</Typography>
          </View>
        ))}
    </Card>
  );
};

export default OccurrenceCard;
