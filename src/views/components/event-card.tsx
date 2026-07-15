import {
  formatEventDate,
} from "@/controllers/calendar-controller";
import {
  CATEGORY_META,
  PRIORITY_META,
  type MarketingEvent,
} from "@/models/marketing-event";

interface EventCardProps {
  event: MarketingEvent;
  onDeleteCustom?: (id: string) => void;
}

export function EventCard({ event, onDeleteCustom }: EventCardProps) {
  const category = CATEGORY_META[event.category];

  return (
    <article className="event-card" data-category={event.category}>
      <div className="event-card__date">
        <strong>{event.date.slice(8, 10)}</strong>
        <span>{formatEventDate(event.date).split(" ").slice(1).join(" ")}</span>
      </div>

      <div className="event-card__content">
        <div className="event-card__eyebrow">
          <span className="category-badge">
            <span aria-hidden="true">{category.icon}</span>
            {category.shortLabel}
          </span>
          <span className={`priority-badge priority-badge--${event.priority}`}>
            {PRIORITY_META[event.priority].label}
          </span>
          {event.custom && <span className="custom-badge">Personalizada</span>}
        </div>

        <h3>{event.title}</h3>
        <p>{event.description}</p>

        <div className="campaign-idea">
          <span aria-hidden="true">↳</span>
          <div>
            <strong>Ideia de campanha</strong>
            <p>{event.campaignIdea}</p>
          </div>
        </div>
      </div>

      {event.custom && onDeleteCustom && (
        <button
          type="button"
          className="icon-button event-card__delete"
          onClick={() => onDeleteCustom(event.id)}
          aria-label={`Excluir ${event.title}`}
          title="Excluir data personalizada"
        >
          ×
        </button>
      )}
    </article>
  );
}
