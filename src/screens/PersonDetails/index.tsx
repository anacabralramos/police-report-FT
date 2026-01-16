import React from "react";
import { View, ScrollView } from "react-native";

import { Badge, Card, ImageCarousel, InfoField, Typography } from "@components";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@navigation";
import { usePersonDetails } from "@hooks";
import { formatDate } from "@utils";

import { INFO_FIELDS } from "./constants";
import { styles } from "./styles";

type PersonDetailsRouteProp = RouteProp<RootStackParamList, "PersonDetails">;

const PersonDetails = () => {
  const { params } = useRoute<PersonDetailsRouteProp>();
  const { data: personDetails } = usePersonDetails(params.id);

  return (
    <ScrollView style={styles.wrapper}>
      <ImageCarousel images={personDetails?.fotos} />

      <View style={styles.container}>
        <Typography>{personDetails?.nome || "Não informado"}</Typography>
        <Badge text="INDIVÍDUO CADASTRADO" />
        <View style={styles.contentContainer}>
          <Card childrenCustomStyles={styles.card}>
            <Typography variant="smallDefault">DOCUMENTAÇÃO</Typography>
            <View style={styles.gridRow}>
              {INFO_FIELDS.map((item, key) => {
                if (!personDetails[item.value]) return;

                const value =
                  item.value === "data_nascimento"
                    ? formatDate(personDetails[item.value] || "")
                    : personDetails[item.value];

                return (
                  <InfoField
                    key={key}
                    label={item.label}
                    value={value}
                    icon={item.icon}
                  />
                );
              })}
            </View>
          </Card>
          <Card childrenCustomStyles={styles.card}>
            <Typography variant="smallDefault">ENDEREÇO</Typography>

            <InfoField
              label="Residência"
              value={personDetails?.endereco}
              icon="location-outline"
            />
          </Card>
        </View>
      </View>
    </ScrollView>
  );
};

export default PersonDetails;
