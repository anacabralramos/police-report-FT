import { Person } from "@types";

export const emptyState: Person = {
  nome: "",
  cpf: "",
  rg: "",
  data_nascimento: new Date(),
  endereco: "",
  fotos: [],
};
