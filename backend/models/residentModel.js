import mongoose from "mongoose";

// Blood Pressure Schema
const bloodPressureSchema = mongoose.Schema({
  systolic: {
    type: Number,
    required: true,
  },
  diastolic: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Heartrate Schema
const heartrateSchema = mongoose.Schema({
  heartrate: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Conditions Schema
const conditionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  treatment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Notes Schema
const notesSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Residents Schema
const residentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fname: {
      type: String,
      required: true,
    },
    nhi: {
      type: String,
      unique: true,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    bloodtype: {
      type: String,
    },
    bloodpressue: [bloodPressureSchema],
    heartrate: [heartrateSchema],
    conditions: [conditionSchema],
    notes: [notesSchema],
  },
  {
    timestamps: true,
  }
);

const Resident = mongoose.model("Resident", residentSchema);

export default Resident;
