import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="event-card">
      <div className="event-category">
        {event.category}
      </div>

      <h3>{event.title}</h3>

      <p>{event.description}</p>

      <div className="event-info">
        <span>📅 {new Date(event.date).toLocaleDateString()}</span>
        <span>🕐 {event.time}</span>
        <span>📍 {event.venue}</span>
      </div>

      <Link
        to={`/events/${event._id}`}
        className="details-btn"
      >
        View Details
      </Link>
    </div>
  );
}

export default EventCard;