import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Technical",
    date: "",
    time: "",
    venue: "",
    capacity: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      await api.post("/events", {
        ...form,
        capacity: Number(form.capacity),
      });

      setSuccess("Event created successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to create event"
      );
    }
  };

  return (
    <main className="create-event-page">
      <div className="event-form-card">

        <h1>Create Event</h1>

        <p className="form-subtitle">
          Create a new event for students to discover and register.
        </p>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {success && (
          <div className="success">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <label>Event Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter event title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            placeholder="Describe your event"
            value={form.description}
            onChange={handleChange}
            required
          />

          <label>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="Technical">
              Technical
            </option>

            <option value="Sports">
              Sports
            </option>

            <option value="Cultural">
              Cultural
            </option>

            <option value="Workshop">
              Workshop
            </option>

            <option value="Other">
              Other
            </option>
          </select>

          <label>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <label>Time</label>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />

          <label>Venue</label>
          <input
            type="text"
            name="venue"
            placeholder="Enter venue"
            value={form.venue}
            onChange={handleChange}
            required
          />

          <label>Capacity</label>
          <input
            type="number"
            name="capacity"
            placeholder="Maximum participants"
            min="1"
            value={form.capacity}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Create Event
          </button>

        </form>
      </div>
    </main>
  );
}

export default CreateEvent;