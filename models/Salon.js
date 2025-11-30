const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: String,
    required: true,
  },
  duration: {
    type: Number, // in minutes
    default: 30,
  },
  description: {
    type: String,
    trim: true,
  },
});

const serviceCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  services: [serviceSchema],
  icon: {
    type: String, // icon name or URL
    default: "cut",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const stylistSchema = new mongoose.Schema({
  profilePhoto: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  specialization: {
    type: [String], // array of categories they specialize in
    default: [],
  },
  experience: {
    type: String, // e.g., "5 years"
    default: "",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const reviewSchema = new mongoose.Schema({
  review_message: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const salonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    locationName: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    averagePrice: {
      type: String,
      default: "₹0",
    },
    serviceCategories: [serviceCategorySchema], // Dynamic categories
    description: {
      type: String,
      required: true,
    },
    stylists: [stylistSchema],
    location: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    contact: {
      phone: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
      },
      website: {
        type: String,
        trim: true,
      },
    },
    operatingHours: {
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String },
    },
    amenities: [
      {
        type: String, // e.g., ["WiFi", "Parking", "AC", "Wheelchair Accessible"]
      },
    ],
    reviews: [reviewSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate average rating before saving
salonSchema.pre("save", function (next) {
  if (this.reviews.length > 0) {
    const totalRating = this.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    this.rating = parseFloat((totalRating / this.reviews.length).toFixed(1));
    this.numberOfReviews = this.reviews.length;
  }

  // Calculate average price from all services
  let totalPrice = 0;
  let serviceCount = 0;

  this.serviceCategories.forEach((category) => {
    category.services.forEach((service) => {
      const price = parseInt(service.price.replace(/[^0-9]/g, ""));
      if (!isNaN(price)) {
        totalPrice += price;
        serviceCount++;
      }
    });
  });

  this.averagePrice =
    serviceCount > 0 ? `₹${Math.round(totalPrice / serviceCount)}` : "₹0";

  next();
});

module.exports = mongoose.model("Salon", salonSchema);
