import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";

import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@navigation";
import { Ionicons } from "@expo/vector-icons";
import { usePersonDetails } from "@hooks";
import { formatDate } from "@utils";
import {
  Badge,
  Card,
  ImageCarousel,
  InfoField,
  Typography,
  UpdateForm,
} from "@components";

import { INFO_FIELDS } from "./constants";
import { styles } from "./styles";

type PersonDetailsRouteProp = RouteProp<RootStackParamList, "PersonDetails">;

const PersonDetails = () => {
  const { params } = useRoute<PersonDetailsRouteProp>();
  const { data: personDetails } = usePersonDetails(params.id);
  const [isEditVisible, setIsEditVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.wrapper}>
        <ImageCarousel images={personDetails?.fotos} />

        <View style={styles.container}>
          <View style={styles.headerRow}>
            <Typography variant="title">
              {personDetails?.nome || "Não informado"}
            </Typography>

            {/* Botão de Editar */}
            <TouchableOpacity
              onPress={() => setIsEditVisible(true)}
              style={styles.editButton}
            >
              <Ionicons name="create-outline" size={24} color="#3b82f6" />
              <Typography variant="smallDefault" color="#3b82f6">
                Editar
              </Typography>
            </TouchableOpacity>
          </View>

          <Badge text="INDIVÍDUO CADASTRADO" />

          <View style={styles.contentContainer}>
            <Card childrenCustomStyles={styles.card}>
              <Typography variant="smallDefault">DOCUMENTAÇÃO</Typography>
              <View style={styles.gridRow}>
                {INFO_FIELDS.map((item, key) => {
                  if (!personDetails?.[item.value]) return null;

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
                value={personDetails?.endereco || "Não informado"}
                icon="location-outline"
              />
            </Card>
          </View>
        </View>
      </ScrollView>

      {/* Modal de Registro configurado para Edição */}
      <UpdateForm
        visible={isEditVisible}
        onClose={() => setIsEditVisible(false)}
        initialData={personDetails}
      />
    </View>
  );
};

export default PersonDetails;
