import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { OccurrenceFilter } from "../../types";
import { filters } from "./contants";
import { styles } from "./styles";

interface FilterCarouselProps {
  selectedFilter: OccurrenceFilter | null;
  onSelectFilter: (filter: OccurrenceFilter | null) => void;
}

const FilterCarousel = ({
  selectedFilter,
  onSelectFilter,
}: FilterCarouselProps) => {
  const handleSelectFilter = (id: OccurrenceFilter) => {
    if (selectedFilter === id) {
      onSelectFilter(null);
    } else {
      onSelectFilter(id);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filters.map((filter) => {
          const isActive = selectedFilter === filter.id;
          return (
            <TouchableOpacity
              key={filter.id}
              onPress={() => handleSelectFilter(filter.id)}
              style={[styles.chip, isActive && styles.chipActive]}
            >
              <Ionicons
                name={filter.icon as any}
                size={16}
                color={isActive ? "#FFF" : "#8e8e93"}
                style={{ marginRight: 6 }}
              />
              <Text
                style={[styles.chipText, isActive && styles.chipTextActive]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FilterCarousel;
