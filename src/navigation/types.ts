import { NavigatorScreenParams } from "@react-navigation/native";
import { SelectedPerson } from "../types";

export type RootStackParamList = {
  Login: undefined; // Não recebe nada
  // Main: undefined; // Não recebe nada (é o TabNavigator)
  Main: NavigatorScreenParams<TabParamList>;
  OccurrenceDetails: { id: string }; // Recebe o ID da ocorrência
  PersonDetails: { id: string }; // Recebe o ID da pessoa
  LinkThoseInvolved: undefined; // Não recebe nada (é o TabNavigator)
};

// 1. Tipagem das Abas (Tabs)
export type TabParamList = {
  Nova: { selectedPeople?: SelectedPerson[] } | undefined; // Aqui a mágica acontece
  Ocorrências: undefined;
  Pessoas: undefined;
};

// 2. Tipagem do Stack (Global)
// export type RootStackParamList = {
//   Login: undefined;
//   Main: undefined; // O TabNavigator entra aqui
//   OccurrenceDetails: { id: string };
//   PersonDetails: { id: string };
//   LinkThoseInvolved: { alreadySelected?: SelectedPerson[] }; // Adicionei pra você poder editar depois
// };
