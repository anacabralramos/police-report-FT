import React, { useState } from "react";
import { Platform } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { Ionicons } from "@expo/vector-icons";

import Typography from "components/Typography";
import Card from "components/Card";

interface DatePickerProps {
  date: Date;
  onChange: (date: Date) => void;
  mode?: "date" | "datetime";
}
export default function DatePicker({
  date,
  onChange,
  mode = "date",
}: DatePickerProps) {
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
    <Card
      onPress={() => setShow(true)}
      disabled={Platform.OS === "ios"}
      childrenCustomStyles={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Ionicons name="calendar" size={20} color="#1d4ed8" />

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
          <Typography variant="default">
            {tempDate.toLocaleDateString("pt-BR")}
          </Typography>
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
    </Card>
  );
}
