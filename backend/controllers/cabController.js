import Cab from "../models/cabModel.js";

const getCabs = async (req, res) => {
  try {
    const cabs = await Cab.find({});
    res.json(cabs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCabById = async (req, res) => {
  try {
    const cab = await Cab.findById(req.params.id);
    res.json(cab);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCab = async (req, res) => {
  try {
    const { name, pricePerMinute } = req.body;
    const cab = await Cab.findById(req.params.id);
    if (cab) {
      cab.name = name;
      cab.pricePerMinute = pricePerMinute;
      const updatedCab = await cab.save();
      res.json(updatedCab);
    } else {
      res.status(404).json({ message: "Cab not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getCabs, getCabById , updateCab };
