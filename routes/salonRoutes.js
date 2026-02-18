const express = require("express");
const router = express.Router();
const {
  getAllSalons,
  getSalonById,
  createSalon,
  updateSalon,
  deleteSalon,
  getNearbySalons,
} = require("../controllers/salon/salonController");

// GET /salons - Get all salons
router.get("/", getAllSalons);

router.get("/nearby", getNearbySalons);

// GET /salons/:id - Get single salon by ID
router.get("/:id", getSalonById);

// POST /salons - Create a new salon
router.post("/", createSalon);

// PUT /salons/:id - Update a salon
router.put("/:id", updateSalon);

// DELETE /salons/:id - Delete a salon
router.delete("/:id", deleteSalon);

module.exports = router;
