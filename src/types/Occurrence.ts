import { SelectedPerson } from "./Person";

export interface OccurrenceForm {
  titulo: string;
  descricao: string;
  localizacao: string;
  data_hora: Date;
  envolvidos: SelectedPerson[];
}

export interface OccurrenceDetails {
  created_at: string;
  data_hora: string;
  descricao: string;
  envolvidos_cpfs: string;
  envolvidos_nomes: string;
  id: string;
  localizacao: string;
  titulo: string;
}
