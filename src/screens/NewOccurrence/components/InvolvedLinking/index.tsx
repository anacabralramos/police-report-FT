import React from "react";
import { TouchableOpacity, View } from "react-native";

import { InvolvedCard, Typography } from "@components";
import { useAppNavigation } from "@navigation";
import { Ionicons } from "@expo/vector-icons";
import { SelectedPerson } from "@types";

import { Section } from "../index";
import { styles } from "./styles";

interface InvolvedInLinkingProps {
  involved: SelectedPerson[];
  onDelete: (id: string) => void;
}

const InvolvedInLinking = ({ involved, onDelete }: InvolvedInLinkingProps) => {
  const navigation = useAppNavigation();

  return (
    <View>
      {!!involved.length && (
        <Section title="Envolvidos vinculados">
          {involved.map((person) => (
            <InvolvedCard
              key={person.id}
              nome={person.nome}
              onClose={() => onDelete(person.id)}
              iconName={"close-circle"}
            />
          ))}
        </Section>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LinkThoseInvolved")}
      >
        <Ionicons name="person-add" size={20} color="#fff" />
        <Typography variant="largeDefault">Vincular Envolvidos</Typography>
      </TouchableOpacity>
    </View>
  );
};

export default InvolvedInLinking;
