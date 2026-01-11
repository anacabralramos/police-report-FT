import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./styles";

const TITULOS_PADRAO = [
  "Tráfico",
  "Porte Ilegal",
  "Posse Ilegal",
  "Roubo",
  "Furto",
  "Mandado de Prisão",
];

// Componente de Sugestões Rápidas
const QuickSuggestions = ({
  onSelect,
}: {
  onSelect: (val: string) => void;
}) => (
  <View style={styles.suggestionsWrapper}>
    <Text style={styles.suggestionTitle}>Sugestões:</Text>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.suggestionScroll}
      contentContainerStyle={{ paddingRight: 20 }}
    >
      {TITULOS_PADRAO.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.suggestionChip}
          onPress={() => onSelect(item)}
        >
          <Text style={styles.suggestionChipText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

export default QuickSuggestions;
