import React, { ComponentProps } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";

type IoniconsName = ComponentProps<typeof Ionicons>["name"];

interface InputProps extends TextInputProps {
  iconName?: IoniconsName;
  customStyle?: StyleProp<ViewStyle>;
}

const Input = ({ iconName, customStyle, ...props }: InputProps) => {
  return (
    <View style={[styles.wrapper, customStyle]}>
      <View style={styles.container}>
        {iconName && <Ionicons name={iconName} size={20} color="#1d4ed8" />}
        <TextInput
          style={styles.input}
          placeholderTextColor="#666"
          {...props}
        />
      </View>
      {props.value !== "" && (
        <TouchableOpacity onPress={() => props.onChangeText("")}>
          <Ionicons name="close-circle" size={20} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;
