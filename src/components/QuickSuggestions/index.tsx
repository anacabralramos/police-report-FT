import { View, ScrollView, TouchableOpacity } from "react-native";
import { TITULOS_PADRAO } from "@constants";

import Typography from "components/Typography";
import { styles } from "./styles";

interface QuickSuggestionsProps {
  onSelect: (val: string) => void;
}

const QuickSuggestions = ({ onSelect }: QuickSuggestionsProps) => (
  <View style={styles.container}>
    <Typography variant="smallDefault">SUGESTÕES:</Typography>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 10 }}
    >
      {TITULOS_PADRAO.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.suggestionChip}
          onPress={() => onSelect(item)}
        >
          <Typography variant="default" color="#3b82f6">
            {item}
          </Typography>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

export default QuickSuggestions;
