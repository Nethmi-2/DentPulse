// controllers/serviceController.js
import Service from "../models/service.model.js";

// Create a new service
export const createService = async (req, res) => {
  try {
    const { title, amount } = req.body;
    const newService = new Service({ title, amount });
    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single service by title
export const getServiceByTitle = async (req, res) => {
  try {
    const service = await Service.findOne({ title: req.params.title });
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
