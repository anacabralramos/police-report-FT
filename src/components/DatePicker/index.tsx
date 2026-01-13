import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";

interface DatePickerProps {
  date: Date;
  onChange: (date: Date) => void;
  label: string;
  mode?: "date" | "datetime";
}
export default function DatePicker({
  date,
  onChange,
  label,
  mode = "date",
}: DatePickerProps) {
  const viewRef = useRef<View>(null);
  const [tempDate, setTempDate] = useState(date);
  const [show, setShow] = useState(false);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const now = new Date();

    if (event.type === "dismissed") {
      setShow(false);
      return;
    }

    if (selectedDate) {
      const dataFinal = selectedDate > now ? now : selectedDate;

      // No Android, precisamos fechar manualmente após o OK
      if (Platform.OS === "android") {
        setShow(false);
      }

      setTempDate(dataFinal);
      onChange(dataFinal);
    }
  };

  return (
    <View style={styles.container} ref={viewRef}>
      <Text style={styles.label}>{label}</Text>

      {/* O TouchableOpacity é necessário para o Android disparar o abrir */}
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setShow(true)}
        disabled={Platform.OS === "ios"} // No iOS o botão nativo já lida com o toque
      >
        <Ionicons
          name="calendar"
          size={20}
          color="#1d4ed8"
          style={styles.icon}
        />

        {Platform.OS === "ios" ? (
          // NO IOS: Mantemos o componente exposto (seu visual atual)
          <DateTimePicker
            value={tempDate > new Date() ? new Date() : tempDate}
            mode={mode}
            display={"default"}
            onChange={onDateChange}
            textColor="#fff"
            locale="pt-BR"
            maximumDate={new Date()}
            accentColor="#1d4ed8"
            themeVariant="dark"
          />
        ) : (
          // NO ANDROID: Exibimos apenas o texto, e o Picker só aparece quando 'show' for true
          <>
            <Text style={styles.text}>
              {tempDate.toLocaleDateString("pt-BR")}
            </Text>
            {show && (
              <DateTimePicker
                value={tempDate > new Date() ? new Date() : tempDate}
                mode={mode}
                display="default"
                onChange={onDateChange}
                maximumDate={new Date()}
              />
            )}
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}
