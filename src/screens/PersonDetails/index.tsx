import React from "react";
import { View, Text, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "../../navigation";
import { usePersonDetails } from "../../hooks";
import { formatDate } from "../../utils";
import { styles } from "./styles";

type PersonDetailsRouteProp = RouteProp<RootStackParamList, "PersonDetails">;

const PersonDetails = () => {
  const { params } = useRoute<PersonDetailsRouteProp>();
  const { data: personDetails } = usePersonDetails(params.id);

  const InfoField = ({
    label,
    value,
    icon,
  }: {
    label: string;
    value: string;
    icon: string;
  }) => (
    <View style={styles.infoBox}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon as any} size={20} color="#1d4ed8" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.valueText}>{value || "Não informado"}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0A0F14" }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Cabeçalho de Identificação */}
      <View style={styles.headerArea}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={50} color="#334155" />
        </View>
        <Text style={styles.mainName}>{personDetails.nome}</Text>
        <Text style={styles.subTitle}>Consulta de Indivíduo</Text>
      </View>

      <View style={styles.container}>
        <InfoField
          label="Nome Completo"
          value={personDetails.nome}
          icon="person-outline"
        />
        <InfoField label="CPF" value={personDetails.cpf} icon="card-outline" />
        <InfoField label="RG" value={personDetails.rg} icon="id-card-outline" />
        <InfoField
          label="Data de Nascimento"
          value={formatDate(personDetails.data_nascimento)}
          icon="calendar-outline"
        />
        <InfoField
          label="Endereço Residencial"
          value={personDetails.endereco}
          icon="location-outline"
        />
      </View>
    </ScrollView>
  );
};

export default PersonDetails;
