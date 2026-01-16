import React from "react";

import QuickSuggestions from "../QuickSuggestions";
import Input from "components/Input";

interface FilterByTitleProps {
  filterText: string;
  setFilterText: (filterText: string) => void;
}

const FilterByTitle = ({ filterText, setFilterText }: FilterByTitleProps) => {
  return (
    <>
      <Input
        placeholder="Busque ou digite o título..."
        placeholderTextColor="#666"
        value={filterText}
        onChangeText={setFilterText}
        iconName="search"
      />
      <QuickSuggestions onSelect={(val) => setFilterText(val)} />
    </>
  );
};

export default FilterByTitle;
