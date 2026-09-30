import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/events/${id}`);

      console.log("EVENT DATA:", response.data);

      setEvent(response.data);
    } catch (error) {
      console.error("EVENT ERROR:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load event"
      );
    } finally {
      setLoading(false);
    }
  };

  const registerForEvent = async () => {
    try {
      setMessage("");
      setError("");

      const response = await api.post(
        `/registrations/${id}`
      );

      console.log(
        "REGISTRATION RESPONSE:",
        response.data
      );

      setMessage(
        response.data.message ||
        "Successfully registered"
      );
    } catch (error) {
      console.error(
        "REGISTRATION ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  if (loading) {
    return (
      <main className="details-page">
        <div className="details-card">
          <h2>Loading event...</h2>
        </div>
      </main>
    );
  }

  if (error && !event) {
    return (
      <main className="details-page">
        <div className="details-card">
          <h2>Unable to load event</h2>

          <div className="error">
            {error}
          </div>

          <button
            className="details-btn"
            onClick={() => navigate("/")}
          >
            Back to Events
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="details-page">
      <div className="details-card">

        <div className="event-category">
          {event.category}
        </div>

        <h1>{event.title}</h1>

        <p className="details-description">
          {event.description}
        </p>

        <div className="details-info">

          <p>
            <strong>📅 Date:</strong>{" "}
            {new Date(event.date).toLocaleDateString()}
          </p>

          <p>
            <strong>🕐 Time:</strong>{" "}
            {event.time}
          </p>

          <p>
            <strong>📍 Venue:</strong>{" "}
            {event.venue}
          </p>

          <p>
            <strong>👥 Capacity:</strong>{" "}
            {event.capacity}
          </p>

          {event.organizer && (
            <p>
              <strong>Organizer:</strong>{" "}
              {event.organizer.name}
            </p>
          )}

        </div>

        {message && (
          <div className="success">
            {message}
          </div>
        )}

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        <button
          className="details-btn"
          onClick={registerForEvent}
        >
          Register for Event
        </button>

      </div>
    </main>
  );
}

export default EventDetails;