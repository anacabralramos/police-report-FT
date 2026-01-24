import React, { useState } from "react";
import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Typography from "components/Typography";

interface LocationModalProps {
  visible: any;
  onClose: any;
  onConfirm: any;
  initialRegion: any;
}

function LocationModal({
  visible,
  onClose,
  onConfirm,
  initialRegion,
}: LocationModalProps) {
  const [tempCoords, setTempCoords] = useState(null);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          onPress={(e) => setTempCoords(e.nativeEvent.coordinate)}
          showsUserLocation={true}
        >
          {tempCoords && <Marker coordinate={tempCoords} />}
        </MapView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Typography variant="largeDefault">Cancelar</Typography>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onConfirm(tempCoords)}
            disabled={!tempCoords}
          >
            <Typography variant="largeDefault">Confirmar Local</Typography>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default LocationModal;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  footer: {
    backgroundColor: "#0A0F14",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    gap: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#1d4ed8",
    height: 60,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
  },
});
