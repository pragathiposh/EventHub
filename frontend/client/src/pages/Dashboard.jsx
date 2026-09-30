import { useEffect, useState } from "react";
import api from "../services/api";
import EventCard from "../components/EventCard";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get("/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <h2 className="loading">Loading events...</h2>;
  }

  return (
    <main>
      <section className="hero">
        <h1>Discover Amazing Events</h1>

        <p>
          Find events, connect with people, and make
          unforgettable experiences.
        </p>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Technical">Technical</option>
            <option value="Sports">Sports</option>
            <option value="Cultural">Cultural</option>
            <option value="Workshop">Workshop</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </section>

      <section className="events-section">
        <h2>Upcoming Events</h2>

        {filteredEvents.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <div className="event-grid">
            {filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Dashboard;