import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, Modal } from "react-native";

import { Input, PhotoUploader, Typography } from "@components";
import { CreatePersonPayload, useCreatePerson } from "@hooks";
import { Person, SelectedPerson } from "@types";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@store";

import { maskCPF, maskRG } from "./masks";
import DatePicker from "../DatePicker";
import { styles } from "./styles";

interface RegisterFormProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: (person: SelectedPerson) => void;
}

export default function RegisterForm({
  visible,
  onClose,
  onSuccess,
}: RegisterFormProps) {
  const insets = useSafeAreaInsets();

  const [formData, setFormData] = useState<Person>({
    nome: "",
    cpf: "",
    rg: "",
    data_nascimento: new Date(),
    endereco: "",
    fotos: [],
  });

  const { user } = useAuthStore();
  const { mutate: createPersonMutation, isPending } = useCreatePerson();
  const isFormEmpty = !formData.cpf && !formData.rg && !formData.nome;

  const handleCreateAndAdd = () => {
    const payload: CreatePersonPayload = {
      ...formData,
      criado_por: user?.id,
    };

    createPersonMutation(payload, {
      onSuccess: (data) => {
        onSuccess(data);
        onClose();
      },
    });
  };

  const removeImage = (uriToRemove: string) => {
    setFormData({
      ...formData,
      fotos: formData.fotos.filter((uri) => uri !== uriToRemove),
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View
        style={[
          styles.wrapper,
          {
            paddingTop: insets.top + 40,
          },
        ]}
      >
        <View style={styles.header}>
          <Typography>Novo Cadastro</Typography>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
        >
          <Typography variant="default" color="#8e8e93">
            PREENCHA OS DADOS DO INDIVÍDUO:
          </Typography>

          <PhotoUploader
            images={formData.fotos}
            updateFotos={(t) => setFormData({ ...formData, fotos: t })}
            removeImage={removeImage}
          />

          <Input
            placeholder="Nome Completo"
            placeholderTextColor="#666"
            value={formData.nome}
            onChangeText={(t) => setFormData({ ...formData, nome: t })}
          />

          <View style={{ flexDirection: "row", gap: 10 }}>
            <Input
              customStyle={{ flex: 1 }}
              placeholder="CPF"
              placeholderTextColor="#666"
              keyboardType="numeric"
              maxLength={14}
              value={formData.cpf}
              onChangeText={(t) =>
                setFormData({ ...formData, cpf: maskCPF(t) })
              }
            />
            <Input
              customStyle={{ flex: 1 }}
              placeholder="RG"
              placeholderTextColor="#666"
              keyboardType="numeric"
              maxLength={12}
              value={formData.rg}
              onChangeText={(t) => setFormData({ ...formData, rg: maskRG(t) })}
            />
          </View>

          <DatePicker
            date={formData.data_nascimento || new Date()}
            onChange={(d) => setFormData({ ...formData, data_nascimento: d })}
          />

          <Input
            placeholder="Endereço Completo"
            placeholderTextColor="#666"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            value={formData.endereco}
            onChangeText={(t) => setFormData({ ...formData, endereco: t })}
          />

          <TouchableOpacity
            style={[
              styles.button,
              (isPending || isFormEmpty) && { opacity: 0.6 },
            ]}
            onPress={handleCreateAndAdd}
            disabled={isPending || isFormEmpty}
          >
            <Ionicons name="person-add" size={20} color="#fff" />
            <Typography variant="default" style={styles.buttonText}>
              {isPending ? "Cadastrando..." : "Confirmar Cadastro"}
            </Typography>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}
