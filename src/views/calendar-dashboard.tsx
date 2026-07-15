"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  filterEvents,
  getCalendarStats,
  groupEventsByMonth,
  toCsv,
  toIcs,
} from "@/controllers/calendar-controller";
import {
  CATEGORY_META,
  MONTHS,
  PRIORITY_META,
  type EventCategory,
  type EventFilters,
  type EventPriority,
  type MarketingEvent,
} from "@/models/marketing-event";
import { EventCard } from "@/views/components/event-card";

const STORAGE_KEY = "marketing-calendar-2027-custom-events";
const THEME_KEY = "marketing-calendar-theme";

const defaultFilters: EventFilters = {
  search: "",
  month: "all",
  category: "all",
  priority: "all",
};

interface CalendarDashboardProps {
  initialEvents: MarketingEvent[];
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function CalendarDashboard({ initialEvents }: CalendarDashboardProps) {
  const [filters, setFilters] = useState<EventFilters>(defaultFilters);
  const [customEvents, setCustomEvents] = useState<MarketingEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedEvents = window.localStorage.getItem(STORAGE_KEY);
    const savedTheme = window.localStorage.getItem(THEME_KEY);

    if (savedEvents) {
      try {
        setCustomEvents(JSON.parse(savedEvents) as MarketingEvent[]);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    const preferredTheme =
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? "dark"
        : "light";
    setTheme(preferredTheme);
    document.documentElement.dataset.theme = preferredTheme;
  }, []);

  const allEvents = useMemo(
    () => [...initialEvents, ...customEvents].sort((a, b) => a.date.localeCompare(b.date)),
    [initialEvents, customEvents],
  );
  const filteredEvents = useMemo(
    () => filterEvents(allEvents, filters),
    [allEvents, filters],
  );
  const groupedEvents = useMemo(
    () => groupEventsByMonth(filteredEvents),
    [filteredEvents],
  );
  const stats = useMemo(() => getCalendarStats(allEvents), [allEvents]);

  const updateFilter = <K extends keyof EventFilters>(
    key: K,
    value: EventFilters[K],
  ) => setFilters((current) => ({ ...current, [key]: value }));

  const persistCustomEvents = (events: MarketingEvent[]) => {
    setCustomEvents(events);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(THEME_KEY, nextTheme);
  };

  const handleAddEvent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const date = String(form.get("date") ?? "");
    const title = String(form.get("title") ?? "").trim();
    const description = String(form.get("description") ?? "").trim();
    const campaignIdea = String(form.get("campaignIdea") ?? "").trim();
    const category = String(form.get("category")) as EventCategory;
    const priority = String(form.get("priority")) as EventPriority;

    if (!date.startsWith("2027-") || !title || !description || !campaignIdea) return;

    const newEvent: MarketingEvent = {
      id: `custom-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      date,
      title,
      description,
      campaignIdea,
      category,
      priority,
      custom: true,
    };

    persistCustomEvents([...customEvents, newEvent]);
    event.currentTarget.reset();
    setIsModalOpen(false);
    updateFilter("month", Number(date.slice(5, 7)));
  };

  const deleteCustomEvent = (id: string) => {
    persistCustomEvents(customEvents.filter((event) => event.id !== id));
  };

  const selectMonth = (month: number | "all") => {
    updateFilter("month", month);
    window.scrollTo({ top: 420, behavior: "smooth" });
  };

  const hasActiveFilters =
    filters.search !== "" ||
    filters.month !== "all" ||
    filters.category !== "all" ||
    filters.priority !== "all";

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Ir para o início">
          <span className="brand__mark">27</span>
          <span>
            <strong>Calendário de Marketing</strong>
            <small>Planejamento 2027</small>
          </span>
        </a>

        <div className="topbar__actions">
          <button type="button" className="icon-button" onClick={toggleTheme}>
            <span aria-hidden="true">{theme === "light" ? "◐" : "☀"}</span>
            <span className="sr-only">Alternar tema</span>
          </button>
          <button type="button" className="button button--ghost" onClick={() => setIsModalOpen(true)}>
            <span aria-hidden="true">＋</span> Nova data
          </button>
          <button
            type="button"
            className="button button--primary"
            onClick={() =>
              downloadFile(
                toIcs(filteredEvents),
                "calendario-marketing-2027.ics",
                "text/calendar;charset=utf-8",
              )
            }
          >
            Exportar calendário
          </button>
        </div>
      </header>

      <main id="inicio">
        <section className="hero container">
          <div className="hero__copy">
            <span className="hero__label">Marketing com antecedência</span>
            <h1>
              Planeje antes.<br />
              <em>Publique melhor.</em>
            </h1>
            <p>
              Um calendário estratégico com as principais datas de 2027, ideias de campanha e filtros para transformar oportunidades em conteúdo.
            </p>
            <div className="hero__buttons">
              <button type="button" className="button button--primary button--large" onClick={() => selectMonth("all")}>
                Explorar calendário <span aria-hidden="true">↓</span>
              </button>
              <button
                type="button"
                className="button button--soft button--large"
                onClick={() =>
                  downloadFile(
                    `\uFEFF${toCsv(filteredEvents)}`,
                    "calendario-marketing-2027.csv",
                    "text/csv;charset=utf-8",
                  )
                }
              >
                Baixar CSV
              </button>
            </div>
          </div>

          <div className="hero__panel" aria-label="Resumo do calendário">
            <div className="year-orbit">
              <div>
                <span>Calendário</span>
                <strong>2027</strong>
              </div>
            </div>
            <div className="hero__panel-copy">
              <span>Próximo nível</span>
              <strong>12 meses de conteúdo planejado</strong>
              <p>Com datas comerciais, digitais, institucionais e sazonais.</p>
            </div>
          </div>
        </section>

        <section className="stats container" aria-label="Estatísticas">
          <article><span>Total de datas</span><strong>{stats.total}</strong><small>incluindo personalizadas</small></article>
          <article><span>Alta prioridade</span><strong>{stats.highPriority}</strong><small>para planejar primeiro</small></article>
          <article><span>Datas comerciais</span><strong>{stats.commercial}</strong><small>oportunidades de venda</small></article>
          <article><span>Feriados</span><strong>{stats.holidays}</strong><small>nacionais e regionais</small></article>
        </section>

        <section className="calendar-area">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-kicker">Calendário completo</span>
                <h2>Encontre a próxima oportunidade</h2>
                <p>Use os filtros para adaptar o calendário ao seu segmento e planejamento.</p>
              </div>
              <span className="results-count">{filteredEvents.length} datas encontradas</span>
            </div>

            <div className="filters-panel">
              <label className="search-field">
                <span aria-hidden="true">⌕</span>
                <input
                  type="search"
                  value={filters.search}
                  onChange={(event) => updateFilter("search", event.target.value)}
                  placeholder="Buscar data, tema ou ideia de campanha..."
                />
              </label>

              <div className="filter-selects">
                <label>
                  <span className="sr-only">Mês</span>
                  <select
                    value={filters.month}
                    onChange={(event) =>
                      updateFilter(
                        "month",
                        event.target.value === "all" ? "all" : Number(event.target.value),
                      )
                    }
                  >
                    <option value="all">Todos os meses</option>
                    {MONTHS.map((month, index) => <option value={index + 1} key={month}>{month}</option>)}
                  </select>
                </label>

                <label>
                  <span className="sr-only">Categoria</span>
                  <select
                    value={filters.category}
                    onChange={(event) => updateFilter("category", event.target.value as EventCategory | "all")}
                  >
                    <option value="all">Todas as categorias</option>
                    {Object.entries(CATEGORY_META).map(([value, meta]) => <option value={value} key={value}>{meta.label}</option>)}
                  </select>
                </label>

                <label>
                  <span className="sr-only">Prioridade</span>
                  <select
                    value={filters.priority}
                    onChange={(event) => updateFilter("priority", event.target.value as EventPriority | "all")}
                  >
                    <option value="all">Todas as prioridades</option>
                    {Object.entries(PRIORITY_META).map(([value, meta]) => <option value={value} key={value}>{meta.label}</option>)}
                  </select>
                </label>
              </div>

              {hasActiveFilters && (
                <button type="button" className="clear-button" onClick={() => setFilters(defaultFilters)}>
                  Limpar filtros ×
                </button>
              )}
            </div>

            <nav className="month-tabs" aria-label="Filtrar por mês">
              <button type="button" className={filters.month === "all" ? "is-active" : ""} onClick={() => selectMonth("all")}>Ano inteiro</button>
              {MONTHS.map((month, index) => (
                <button
                  type="button"
                  key={month}
                  className={filters.month === index + 1 ? "is-active" : ""}
                  onClick={() => selectMonth(index + 1)}
                >
                  {month.slice(0, 3)}
                </button>
              ))}
            </nav>

            <div className="source-note">
              <span aria-hidden="true">i</span>
              <p>Datas religiosas, pontos facultativos e eventos regionais podem variar. Confirme regras e horários na sua localidade antes de publicar.</p>
            </div>

            <div className="months-list">
              {groupedEvents.map(({ month, monthNumber, events }) =>
                events.length > 0 ? (
                  <section className="month-section" id={`mes-${monthNumber}`} key={month}>
                    <div className="month-section__heading">
                      <span>{String(monthNumber).padStart(2, "0")}</span>
                      <div><h2>{month}</h2><p>{events.length} {events.length === 1 ? "oportunidade" : "oportunidades"}</p></div>
                      <div className="month-section__line" />
                    </div>
                    <div className="events-grid">
                      {events.map((event) => (
                        <EventCard event={event} key={event.id} onDeleteCustom={deleteCustomEvent} />
                      ))}
                    </div>
                  </section>
                ) : null,
              )}

              {filteredEvents.length === 0 && (
                <div className="empty-state">
                  <span>⌕</span>
                  <h3>Nenhuma data encontrada</h3>
                  <p>Tente remover alguns filtros ou adicione uma data personalizada.</p>
                  <button type="button" className="button button--primary" onClick={() => setFilters(defaultFilters)}>Mostrar todas</button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="brand brand--footer"><span className="brand__mark">27</span><span><strong>Calendário de Marketing</strong><small>Projeto open source</small></span></div>
          <p>Feito para planejar campanhas com estratégia, relevância e antecedência.</p>
          <a href="/api/events" target="_blank" rel="noreferrer">API de eventos ↗</a>
        </div>
      </footer>

      {isModalOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setIsModalOpen(false)}>
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="modal__heading">
              <div><span className="section-kicker">Personalize</span><h2 id="modal-title">Adicionar nova data</h2></div>
              <button type="button" className="icon-button" onClick={() => setIsModalOpen(false)} aria-label="Fechar">×</button>
            </div>

            <form onSubmit={handleAddEvent} className="event-form">
              <div className="form-row">
                <label>Data<input type="date" name="date" min="2027-01-01" max="2027-12-31" required /></label>
                <label>Prioridade<select name="priority" defaultValue="media">{Object.entries(PRIORITY_META).map(([value, meta]) => <option value={value} key={value}>{meta.label}</option>)}</select></label>
              </div>
              <label>Título<input type="text" name="title" placeholder="Ex.: Aniversário da empresa" maxLength={80} required /></label>
              <label>Categoria<select name="category" defaultValue="comercial">{Object.entries(CATEGORY_META).map(([value, meta]) => <option value={value} key={value}>{meta.label}</option>)}</select></label>
              <label>Descrição<textarea name="description" placeholder="Por que essa data é importante?" rows={3} maxLength={220} required /></label>
              <label>Ideia de campanha<textarea name="campaignIdea" placeholder="Qual conteúdo ou ação será criada?" rows={3} maxLength={260} required /></label>
              <div className="modal__actions">
                <button type="button" className="button button--ghost" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="button button--primary">Salvar data</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
