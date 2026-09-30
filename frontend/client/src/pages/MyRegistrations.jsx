import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("MY REGISTRATIONS PAGE LOADED");
    loadRegistrations();
  }, []);

  const loadRegistrations = async () => {
    try {
      console.log("CALLING GET /registrations/my");

      const response = await api.get("/registrations/my");

      console.log("MY REGISTRATIONS RESPONSE:", response);
      console.log("MY REGISTRATIONS DATA:", response.data);

      setRegistrations(response.data);
    } catch (error) {
      console.error("MY REGISTRATIONS ERROR:", error);
      console.error(
        "SERVER RESPONSE:",
        error.response?.data
      );

      setError(
        error.response?.data?.message ||
        error.message ||
        "Failed to load registrations"
      );
    } finally {
      setLoading(false);
    }
  };

  const cancelRegistration = async (eventId) => {
    try {
      await api.delete(`/registrations/${eventId}`);

      setRegistrations((current) =>
        current.filter(
          (registration) =>
            registration.event?._id !== eventId
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to cancel registration"
      );
    }
  };

  if (loading) {
    return (
      <main className="events-section">
        <h1>My Registrations</h1>
        <p>Loading registrations...</p>
      </main>
    );
  }

  return (
    <main className="events-section">
      <h1>My Registrations</h1>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {registrations.length === 0 && !error ? (
        <div className="details-card">
          <h3>No registrations found</h3>

          <p>
            You haven't registered for any events yet.
          </p>

          <Link
            to="/"
            className="details-btn"
          >
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="event-grid">
          {registrations.map((registration) => {
            if (!registration.event) {
              return null;
            }

            return (
              <div
                className="event-card"
                key={registration._id}
              >
                <div className="event-category">
                  {registration.event.category}
                </div>

                <h3>
                  {registration.event.title}
                </h3>

                <p>
                  {registration.event.description}
                </p>

                <div className="event-info">
                  <span>
                    📅{" "}
                    {new Date(
                      registration.event.date
                    ).toLocaleDateString()}
                  </span>

                  <span>
                    🕐 {registration.event.time}
                  </span>

                  <span>
                    📍 {registration.event.venue}
                  </span>
                </div>

                <Link
                  to={`/events/${registration.event._id}`}
                  className="details-btn"
                >
                  View Event
                </Link>

                <button
                  className="cancel-btn"
                  onClick={() =>
                    cancelRegistration(
                      registration.event._id
                    )
                  }
                >
                  Cancel Registration
                </button>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default MyRegistrations;