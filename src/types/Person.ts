export interface Person {
  nome: string;
  cpf: string;
  rg: string;
  data_nascimento: Date;
  endereco: string;
  fotos: string[];
}

export interface PersonData extends Person {
  id: string;
}

export interface SelectedPerson {
  id: string;
  nome: string;
}
