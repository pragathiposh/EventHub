const express = require("express");

const {
    createEvent,
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent,
} = require("../controllers/eventController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// GET all events
router.get("/", getEvents);

// GET one event
router.get("/:id", getEvent);

// CREATE event
router.post("/", protect, createEvent);

// UPDATE event
router.put("/:id", protect, updateEvent);

// DELETE event
router.delete("/:id", protect, deleteEvent);

module.exports = router;