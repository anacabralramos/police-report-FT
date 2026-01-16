import React from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { Card, Typography, Badge, InfoField, InvolvedCard } from "@components";
import { RootStackParamList } from "@navigation";
import { useOccurrenceDetails } from "@hooks";
import { formatDateToLocale } from "@utils";
import { styles } from "./styles";

type OccurrenceDetailsRouteProp = RouteProp<
  RootStackParamList,
  "OccurrenceDetails"
>;

const OccurrenceDetails = () => {
  const { params } = useRoute<OccurrenceDetailsRouteProp>();
  const navigation = useNavigation<any>();
  const { data: occurrence, isLoading } = useOccurrenceDetails(params.id);

  if (isLoading) {
    return (
      <View style={styles.loadingCenter}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  const namesArray = occurrence?.envolvidos_nomes?.split(" | ") || [];
  const idsArray = occurrence?.envolvidos_ids?.split(" | ") || [];

  return (
    <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
      <Typography variant="title">{occurrence?.titulo}</Typography>
      <Badge text="OCORRÊNCIA REGISTRADA" />

      <View style={styles.contentContainer}>
        {/* Card de Informações Gerais */}
        <Card childrenCustomStyles={styles.cardGap}>
          <InfoField
            label="DATA E HORA"
            value={formatDateToLocale(occurrence?.data_hora)}
            icon="calendar-outline"
          />
          <InfoField
            label="LOCALIZAÇÃO"
            value={occurrence?.localizacao}
            icon="location-outline"
          />
        </Card>

        {/* Relato da Equipe */}
        <Card>
          <Typography variant="smallDefault">RELATO DA EQUIPE</Typography>
          <Typography variant="default" style={styles.description}>
            {occurrence?.descricao}
          </Typography>
        </Card>

        {/* Envolvidos - Usando a mesma estética de lista */}
        <Typography variant="largeDefault">ENVOLVIDOS</Typography>

        <View>
          {namesArray.map((person, index) => (
            <InvolvedCard
              key={index}
              nome={person}
              onPress={() =>
                navigation.navigate("PersonDetails", { id: idsArray[index] })
              }
              iconName="chevron-forward"
              iconColor="#334155"
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default OccurrenceDetails;
