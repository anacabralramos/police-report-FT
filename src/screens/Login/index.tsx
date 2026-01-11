import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { useSignIn } from "../../hooks";
import { styles } from "./styles";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [loading, setLoading] = useState(false);

  const { mutate: signIn, isPending } = useSignIn();

  const handleLogin = async () => {
    signIn({ email, password });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inner}>
        {/* Ícone ou Logo do App */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>🛡️</Text>
          <Text style={styles.title}>Sistema de Ocorrências</Text>
          <Text style={styles.subtitle}>Acesso Restrito - Use seu CPF</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="policial@email.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#334155"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#334155"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={isPending}
          >
            {isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text>Entrar</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
