import { OccurrenceFilter } from "@types";

export const filters: { id: OccurrenceFilter; label: string; icon: string }[] =
  [
    { id: "INVOLVED", label: "Envolvidos", icon: "people-outline" },
    { id: "TITLE", label: "Título", icon: "document-text-outline" },
    { id: "DATE", label: "Data", icon: "calendar-outline" },
    { id: "LOCATION", label: "Localização", icon: "location-outline" },
  ];
