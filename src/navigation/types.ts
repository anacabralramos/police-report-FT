export type RootStackParamList = {
  Login: undefined; // Não recebe nada
  Main: undefined; // Não recebe nada (é o TabNavigator)
  OccurrenceDetails: { id: string }; // Recebe o ID da ocorrência
  PersonDetails: { id: string }; // Recebe o ID da pessoa
};
