import { OccurrenceForm } from "../../types";

export const initialFormState: OccurrenceForm = {
  titulo: "",
  descricao: "",
  localizacao: "",
  data_hora: new Date(),
  fotos: [],
  envolvidos: [],
};
