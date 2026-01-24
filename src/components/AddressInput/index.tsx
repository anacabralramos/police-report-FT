import React from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Card from "components/Card";
import { styles } from "./styles";

interface AddressInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onMapPress: () => void;
}

const AddressInput = ({
  onChangeText,
  onMapPress,
  value,
}: AddressInputProps) => {
  return (
    <Card
      childrenCustomStyles={{
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
      }}
    >
      <TextInput
        placeholderTextColor="#666"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Digite o endereço ou use o mapa..."
        multiline={true}
      />

      <TouchableOpacity onPress={onMapPress}>
        <MaterialCommunityIcons
          name="map-marker-radius"
          size={26}
          color="#1d4ed8"
        />
      </TouchableOpacity>
    </Card>
  );
};
export default AddressInput;
