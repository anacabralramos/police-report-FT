import React from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  ScrollView,
} from "react-native";
import { styles } from "./styles";

interface WrapperProps {
  children: React.ReactNode;
  title: string;
  useScroll?: boolean;
}

const Wrapper = ({ children, title, useScroll = false }: WrapperProps) => {
  const Container = useScroll ? ScrollView : View;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container style={styles.wrapper}>
        <Text style={styles.title}>{title}</Text>
        {children}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Wrapper;
