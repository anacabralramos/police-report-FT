import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, TouchableOpacity, ScrollView, Modal } from "react-native";
import { useState } from "react";

import { Input, PhotoUploader, Typography } from "@components";
import { UpdatePersonPayload, useUpdatePerson } from "@hooks";
import { Ionicons } from "@expo/vector-icons";
import { Person, PersonData } from "@types";
import { maskCPF, maskRG } from "@utils";
import { useAuthStore } from "@store";

import DatePicker from "../DatePicker";
import { styles } from "./styles";

interface UpdateFormProps {
  visible: boolean;
  onClose: () => void;
  initialData: PersonData;
}

export default function UpdateForm({
  visible,
  onClose,
  initialData,
}: UpdateFormProps) {
  const { mutate: updatePerson, isPending } = useUpdatePerson();
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();

  const [formData, setFormData] = useState<Person>(initialData);

  const hasChanges =
    JSON.stringify(formData) !==
    JSON.stringify({
      ...initialData,
      data_nascimento: initialData.data_nascimento
        ? new Date(`${initialData.data_nascimento}T12:00:00`)
        : new Date(),
    });

  const handleUpdate = () => {
    const payload: UpdatePersonPayload = {
      ...formData,
      criado_por: user?.id,
    };
    updatePerson(payload, {
      onSuccess: () => {
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
      <View style={[styles.wrapper, { paddingTop: insets.top + 40 }]}>
        <View style={styles.header}>
          <Typography>Editar Cadastro</Typography>
          <TouchableOpacity onPress={onClose} disabled={isPending}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContaioner}
        >
          <Typography variant="default" color="#8e8e93">
            ALTERE OS CAMPOS NECESSÁRIOS:
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

          <View style={styles.documentsContainer}>
            <Input
              customStyle={styles.input}
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
              customStyle={styles.input}
              placeholder="RG"
              placeholderTextColor="#666"
              keyboardType="numeric"
              maxLength={12}
              value={formData.rg}
              onChangeText={(t) => setFormData({ ...formData, rg: maskRG(t) })}
            />
          </View>

          <DatePicker
            date={
              formData.data_nascimento
                ? new Date(`${formData.data_nascimento}T12:00:00`)
                : new Date()
            }
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
              (isPending || !hasChanges) && { opacity: 0.6 },
            ]}
            onPress={handleUpdate}
            disabled={isPending || !hasChanges}
          >
            <Ionicons name="save-outline" size={20} color="#fff" />
            <Typography variant="default" style={styles.buttonText}>
              {isPending ? "Salvando..." : "Salvar Alterações"}
            </Typography>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}
