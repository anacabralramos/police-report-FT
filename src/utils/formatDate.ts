export const formatDate = (dateString: string | null) => {
  if (!dateString) return "Não informado";

  // O Supabase retorna "1990-05-15"
  const [year, month, day] = dateString.split("-");

  return `${day}/${month}/${year}`;
};

export const formatDateToLocale = (dataIso: string) =>
  new Date(dataIso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
