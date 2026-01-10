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
} from "react-native";
import { styles } from "./styles";
// import { supabase } from './supabase'; // Verifique se o caminho está correto

const Login = () => {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    // Por enquanto, apenas um alerta para testar o clique
    console.log("Tentando login com:", cpf);

    // A lógica de autenticação com CPF exigirá um passo extra no Supabase depois
    setTimeout(() => {
      setLoading(false);
      alert("Botão pressionado! Próximo passo: configurar o banco.");
    }, 1500);
  }

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
          <Text style={styles.label}>CPF</Text>
          <TextInput
            style={styles.input}
            placeholder="000.000.000-00"
            keyboardType="numeric"
            value={cpf}
            onChangeText={setCpf}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Acessando..." : "ENTRAR"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
