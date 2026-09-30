const express = require("express");

const {
    registerForEvent,
    getMyRegistrations,
    cancelRegistration,
} = require("../controllers/registrationController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/:eventId",
    protect,
    registerForEvent
);

router.get(
    "/my",
    protect,
    getMyRegistrations
);

router.delete(
    "/:eventId",
    protect,
    cancelRegistration
);

module.exports = router;