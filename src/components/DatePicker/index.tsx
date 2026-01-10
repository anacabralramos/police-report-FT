import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

interface DatePickerProps {
  date: Date;
  onChange: (date: Date) => void;
  label: string;
}

export default function DatePicker({ date, onChange, label }: DatePickerProps) {
  const [show, setShow] = useState(false);
  // Guardamos uma data temporária para o iOS só aplicar ao clicar em "Confirmar"
  const [tempDate, setTempDate] = useState(date);

  const togglePicker = () => {
    setTempDate(date); // Reseta a data temporária para a data atual do estado
    setShow(!show);
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShow(false);
      if (event.type === "set" && selectedDate) {
        onChange(selectedDate);
      }
    } else {
      // No iOS, apenas atualizamos o estado temporário enquanto o usuário desliza
      if (selectedDate) setTempDate(selectedDate);
    }
  };

  const handleConfirmIOS = () => {
    onChange(tempDate);
    setShow(false);
  };

  const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${date.getFullYear()} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity style={styles.pickerButton} onPress={togglePicker}>
        <Ionicons
          name="calendar"
          size={20}
          color="#1d4ed8"
          style={styles.icon}
        />
        <Text style={styles.dateText}>{formattedDate}</Text>
      </TouchableOpacity>

      {show && (
        <View style={Platform.OS === "ios" ? styles.iosSheet : null}>
          <DateTimePicker
            value={tempDate}
            mode="datetime"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onDateChange}
            textColor="#fff"
            locale="pt-BR"
          />

          {Platform.OS === "ios" && (
            <View style={styles.iosButtonContainer}>
              <TouchableOpacity
                onPress={() => setShow(false)}
                style={[styles.iosButton, styles.cancelButton]}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleConfirmIOS}
                style={[styles.iosButton, styles.confirmButton]}
              >
                <Text style={styles.confirmText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
