const Registration = require("../models/Registration");
const Event = require("../models/Event");

// REGISTER FOR EVENT
exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const existingRegistration =
      await Registration.findOne({
        user: req.user.id,
        event: event._id,
      });

    if (existingRegistration) {
      return res.status(400).json({
        message: "Already registered for this event",
      });
    }

    const registrationCount =
      await Registration.countDocuments({
        event: event._id,
      });

    if (registrationCount >= event.capacity) {
      return res.status(400).json({
        message: "Event is full",
      });
    }

    const registration = await Registration.create({
      user: req.user.id,
      event: event._id,
    });

    res.status(201).json({
      message: "Successfully registered",
      registration,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET MY REGISTRATIONS
exports.getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({
      user: req.user.id,
    })
      .populate("event")
      .sort({ createdAt: -1 });

    res.json(registrations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CANCEL REGISTRATION
exports.cancelRegistration = async (req, res) => {
  try {
    const registration =
      await Registration.findOne({
        user: req.user.id,
        event: req.params.eventId,
      });

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    await registration.deleteOne();

    res.json({
      message: "Registration cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};