import { MONTHS, type EventFilters, type MarketingEvent } from "@/models/marketing-event";

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export function filterEvents(events: MarketingEvent[], filters: EventFilters) {
  const search = normalize(filters.search.trim());

  return [...events]
    .filter((event) => {
      const month = Number(event.date.slice(5, 7));
      const content = normalize(
        `${event.title} ${event.description} ${event.campaignIdea}`,
      );

      return (
        (!search || content.includes(search)) &&
        (filters.month === "all" || month === filters.month) &&
        (filters.category === "all" || event.category === filters.category) &&
        (filters.priority === "all" || event.priority === filters.priority)
      );
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function groupEventsByMonth(events: MarketingEvent[]) {
  return MONTHS.map((month, index) => ({
    month,
    monthNumber: index + 1,
    events: events.filter((event) => Number(event.date.slice(5, 7)) === index + 1),
  }));
}

export function getCalendarStats(events: MarketingEvent[]) {
  return {
    total: events.length,
    highPriority: events.filter((event) => event.priority === "alta").length,
    commercial: events.filter((event) => event.category === "comercial").length,
    holidays: events.filter((event) => event.category === "feriado").length,
  };
}

export function formatEventDate(dateString: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    weekday: "short",
    timeZone: "UTC",
  })
    .format(new Date(`${dateString}T12:00:00Z`))
    .replace(/\./g, "");
}

export function toCsv(events: MarketingEvent[]) {
  const escape = (value: string) => `"${value.replaceAll('"', '""')}"`;
  const header = [
    "Data",
    "Título",
    "Categoria",
    "Prioridade",
    "Descrição",
    "Ideia de campanha",
  ];
  const rows = events.map((event) => [
    event.date,
    event.title,
    event.category,
    event.priority,
    event.description,
    event.campaignIdea,
  ]);

  return [header, ...rows].map((row) => row.map(escape).join(",")).join("\n");
}

function icsEscape(value: string) {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,")
    .replaceAll("\n", "\\n");
}

export function toIcs(events: MarketingEvent[]) {
  const items = events
    .map((event) => {
      const compactDate = event.date.replaceAll("-", "");
      const nextDay = new Date(`${event.date}T12:00:00Z`);
      nextDay.setUTCDate(nextDay.getUTCDate() + 1);
      const compactNextDate = nextDay.toISOString().slice(0, 10).replaceAll("-", "");

      return [
        "BEGIN:VEVENT",
        `UID:${event.id}@calendariomarketing2027`,
        `DTSTART;VALUE=DATE:${compactDate}`,
        `DTEND;VALUE=DATE:${compactNextDate}`,
        `SUMMARY:${icsEscape(event.title)}`,
        `DESCRIPTION:${icsEscape(`${event.description} Ideia: ${event.campaignIdea}`)}`,
        "TRANSP:TRANSPARENT",
        "END:VEVENT",
      ].join("\r\n");
    })
    .join("\r\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Calendário de Marketing 2027//PT-BR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    items,
    "END:VCALENDAR",
  ].join("\r\n");
}
