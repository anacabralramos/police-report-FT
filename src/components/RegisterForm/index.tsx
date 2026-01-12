import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal, // Adicionado
  KeyboardAvoidingView, // Adicionado
  Platform,
} from "react-native";
import { Person, SelectedPerson } from "../../types";
import { useCreatePerson } from "../../hooks";
import { maskCPF, maskRG } from "./masks";
import DatePicker from "../DatePicker";
import { styles } from "./styles";

interface RegisterFormProps {
  visible: boolean; // Nova prop
  onClose: () => void; // Nova prop
  formData: Person;
  setFormData: (person: Person) => void;
  onSuccess: (person: SelectedPerson) => void;
}

export default function RegisterForm({
  visible,
  onClose,
  formData,
  setFormData,
  onSuccess,
}: RegisterFormProps) {
  const { mutate: createPersonMutation, isPending } = useCreatePerson();

  const handleCreateAndAdd = () => {
    createPersonMutation(formData, {
      onSuccess: (data) => {
        onSuccess(data);
        onClose(); // Fecha o modal após o sucesso
      },
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: "#0A0F14" }}
      >
        <View style={[styles.container, { paddingTop: 50 }]}>
          {/* Cabeçalho do Modal */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={styles.headerTitle}>Novo Cadastro</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionLabel}>
              Preencha os dados do indivíduo:
            </Text>

            <TextInput
              style={styles.formInput}
              placeholder="Nome Completo"
              placeholderTextColor="#666"
              value={formData.nome}
              onChangeText={(t) => setFormData({ ...formData, nome: t })}
            />

            <View style={{ flexDirection: "row", gap: 10 }}>
              <TextInput
                style={[styles.formInput, { flex: 1 }]}
                placeholder="CPF"
                placeholderTextColor="#666"
                keyboardType="numeric"
                maxLength={14}
                value={formData.cpf}
                onChangeText={(t) =>
                  setFormData({ ...formData, cpf: maskCPF(t) })
                }
              />
              <TextInput
                style={[styles.formInput, { flex: 1 }]}
                placeholder="RG"
                placeholderTextColor="#666"
                keyboardType="numeric"
                maxLength={12}
                value={formData.rg}
                onChangeText={(t) =>
                  setFormData({ ...formData, rg: maskRG(t) })
                }
              />
            </View>

            <DatePicker
              label="Data de Nascimento"
              date={formData.data_nascimento || new Date()}
              onChange={(d) => setFormData({ ...formData, data_nascimento: d })}
            />

            <TextInput
              style={[
                styles.formInput,
                { height: 80, textAlignVertical: "top", paddingTop: 12 },
              ]}
              placeholder="Endereço Completo"
              placeholderTextColor="#666"
              multiline
              value={formData.endereco}
              onChangeText={(t) => setFormData({ ...formData, endereco: t })}
            />

            <TouchableOpacity
              style={[styles.addAndSelectButton, isPending && { opacity: 0.6 }]}
              onPress={handleCreateAndAdd}
              disabled={isPending}
            >
              <Ionicons name="person-add" size={20} color="#fff" />
              <Text style={styles.buttonText}>
                {isPending ? "Cadastrando..." : "Confirmar Cadastro"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
