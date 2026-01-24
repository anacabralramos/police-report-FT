import * as Location from "expo-location";
import { Alert } from "react-native";
import { useState } from "react";

export function useLocation() {
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "Precisamos do GPS para localizar a ocorrência.",
        );
        return null;
      }

      const location = await Location.getCurrentPositionAsync({});
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
    } catch (error) {
      Alert.alert("Erro", "Não foi possível obter sua localização.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getCurrentLocation, loading };
}
