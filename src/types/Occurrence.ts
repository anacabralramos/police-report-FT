import { SelectedPerson } from "./Person";

export interface OccurrenceForm {
  titulo: string;
  descricao: string;
  localizacao: string;
  data_hora: Date;
  fotos: string[];
  envolvidos: SelectedPerson[]; // Lista de objetos (id, nome) para exibir na tela
}

export interface OccurrenceDetails {
  id: string;
  fotos: string[];
  data_hora: Date;
  localizacao: string;
  titulo: string;
  ocorrencia_envolvidos: {
    pessoas: {
      nome: string;
    };
  }[];
}
