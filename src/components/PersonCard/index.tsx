import React from "react";
import { View, Image } from "react-native";

import { Card, Typography } from "@components";
import { useAppNavigation } from "@navigation";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";

interface PersonCardProps {
  fotos: string[];
  nome: string;
  cpf: string;
  id: string;
}

const PersonCard = ({ fotos, cpf, id, nome }: PersonCardProps) => {
  const navigation = useAppNavigation();
  return (
    <Card
      onPress={() => navigation.navigate("PersonDetails", { id: id })}
      childrenCustomStyles={styles.card}
    >
      <View
        style={[
          styles.imageContainer,
          !fotos.length && styles.placeholderImage,
        ]}
      >
        {!!fotos.length ? (
          <Image
            source={{ uri: fotos[0] }}
            style={styles.image}
            onLoadStart={() => console.log("Carregando foto...")}
            onError={(e) => console.log("Erro ao carregar foto...")}
          />
        ) : (
          <Ionicons name="image-outline" size={30} color="#334155" />
        )}
      </View>
      <View>
        <Typography variant="largeDefault">{nome}</Typography>
        <Typography variant="default" color="#8e8e93">
          CPF: {cpf}
        </Typography>
      </View>
    </Card>
  );
};

export default PersonCard;
