const Salon = require("../../models/Salon");

// @desc    Create a new salon
// @route   POST /api/salons
// @access  Private
const createSalon = async (req, res) => {
  try {
    const {
      name,
      images,
      locationName,
      serviceCategories,
      description,
      stylists,
      location,
      contact = {},
      operatingHours = {},
      amenities = [],
      reviews = [],
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !images ||
      !locationName ||
      !serviceCategories ||
      !description ||
      !stylists ||
      !location
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Validate that at least one service category exists
    if (!Array.isArray(serviceCategories) || serviceCategories.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please add at least one service category",
      });
    }

    // Validate that each category has at least one service
    for (const category of serviceCategories) {
      if (
        !category.name ||
        !Array.isArray(category.services) ||
        category.services.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message: `Category "${category.name}" must have at least one service`,
        });
      }
    }

    const salonData = {
      name,
      images,
      locationName,
      serviceCategories,
      description,
      stylists,
      location,
      contact,
      operatingHours,
      amenities,
      reviews,
      // averagePrice will be calculated automatically in pre-save hook
    };

    const salon = await Salon.create(salonData);

    res.status(201).json({
      success: true,
      message: "Salon created successfully",
      data: salon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating salon",
      error: error.message,
    });
  }
};

// @desc    Get all salons
// @route   GET /api/salons
// @access  Public
const getAllSalons = async (req, res) => {
  try {
    const salons = await Salon.find({ isActive: true })
      .select("-reviews -serviceCategories.services")
      .sort({ rating: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: salons.length,
      data: salons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Get single salon by ID
// @route   GET /api/salons/:id
// @access  Public
const getSalonById = async (req, res) => {
  try {
    const salon = await Salon.findById(req.params.id);

    if (!salon) {
      return res.status(404).json({
        success: false,
        message: "Salon not found",
      });
    }

    if (!salon.isActive) {
      return res.status(404).json({
        success: false,
        message: "Salon is not active",
      });
    }

    res.status(200).json({
      success: true,
      data: salon,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid salon ID",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Update a salon
// @route   PUT /api/salons/:id
// @access  Public (you might want to make this private in production)
const updateSalon = async (req, res) => {
  try {
    const salon = await Salon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!salon) {
      return res.status(404).json({
        success: false,
        message: "Salon not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Salon updated successfully",
      data: salon,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid salon ID",
      });
    }
    res.status(500).json({
      success: false,
      message: "Error updating salon",
      error: error.message,
    });
  }
};

// @desc    Delete a salon
// @route   DELETE /api/salons/:id
// @access  Public (you might want to make this private in production)
const deleteSalon = async (req, res) => {
  try {
    const salon = await Salon.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!salon) {
      return res.status(404).json({
        success: false,
        message: "Salon not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Salon deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid salon ID",
      });
    }
    res.status(500).json({
      success: false,
      message: "Error deleting salon",
      error: error.message,
    });
  }
};

module.exports = {
  getAllSalons,
  getSalonById,
  createSalon,
  updateSalon,
  deleteSalon,
};
