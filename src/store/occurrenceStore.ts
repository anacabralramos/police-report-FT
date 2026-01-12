import { create } from "zustand";
import { SelectedPerson } from "../types";

interface OccurrenceState {
  selectedPeople: SelectedPerson[];
  // Ações
  setTempSelectedPeople: (people: SelectedPerson[]) => void;
  addPerson: (person: SelectedPerson) => void;
  removePerson: (id: string) => void;
  clearOccurrenceDraft: () => void;
}

export const useOccurrenceStore = create<OccurrenceState>((set) => ({
  selectedPeople: [],

  // setTempSelectedPeople: (people) => set({ selectedPeople: people }),
  setTempSelectedPeople: (newPeople) =>
    set((state) => ({
      selectedPeople: [...state.selectedPeople, ...newPeople],
    })),

  addPerson: (person) =>
    set((state) => ({
      selectedPeople: [...state.selectedPeople, person],
    })),

  removePerson: (id) =>
    set((state) => ({
      selectedPeople: state.selectedPeople.filter((p) => p.id !== id),
    })),

  clearOccurrenceDraft: () => set({ selectedPeople: [] }),
}));
