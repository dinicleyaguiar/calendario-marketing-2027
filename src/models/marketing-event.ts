export type EventCategory =
  | "feriado"
  | "comercial"
  | "digital"
  | "social"
  | "saude"
  | "institucional"
  | "sazonal";

export type EventPriority = "alta" | "media" | "oportunidade";

export interface MarketingEvent {
  id: string;
  date: string;
  title: string;
  category: EventCategory;
  priority: EventPriority;
  description: string;
  campaignIdea: string;
  custom?: boolean;
}

export interface EventFilters {
  search: string;
  month: number | "all";
  category: EventCategory | "all";
  priority: EventPriority | "all";
}

export const CATEGORY_META: Record<
  EventCategory,
  { label: string; shortLabel: string; icon: string }
> = {
  feriado: { label: "Feriados", shortLabel: "Feriado", icon: "★" },
  comercial: { label: "Datas comerciais", shortLabel: "Comercial", icon: "↗" },
  digital: { label: "Digital e tecnologia", shortLabel: "Digital", icon: "#" },
  social: { label: "Causas e sociedade", shortLabel: "Social", icon: "◎" },
  saude: { label: "Saúde e bem-estar", shortLabel: "Saúde", icon: "+" },
  institucional: { label: "Profissões e institucional", shortLabel: "Institucional", icon: "◆" },
  sazonal: { label: "Sazonais e cultura", shortLabel: "Sazonal", icon: "✦" },
};

export const PRIORITY_META: Record<EventPriority, { label: string }> = {
  alta: { label: "Alta prioridade" },
  media: { label: "Prioridade média" },
  oportunidade: { label: "Oportunidade" },
};

export const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
] as const;
