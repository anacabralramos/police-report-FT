import React from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  ScrollView,
} from "react-native";

import Typography from "../Typography";
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
        <Typography variant="title" style={styles.title}>
          {title}
        </Typography>
        {children}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Wrapper;
