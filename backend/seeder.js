import Cab from "./models/cabModel.js";
import Edge from "./models/edgeModel.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

connectDB();

const seedData = async () => {
  // Seed cabs
  await Cab.create([
    { name: "Alto", pricePerMinute: 2 },
    { name: "Swift Dzire", pricePerMinute: 4 },
    { name: "Innova", pricePerMinute: 6 },
    { name: "XUV", pricePerMinute: 8 },
    { name: "BMW", pricePerMinute: 10 },
  ]);

  // Seed graph edges
  await Edge.create([
    { source: 'A', destination: 'B', duration: 5 },
    { source: 'B', destination: 'A', duration: 5 }, 
    { source: 'A', destination: 'C', duration: 7 },
    { source: 'C', destination: 'A', duration: 7 }, 
    { source: 'B', destination: 'D', duration: 15 },
    { source: 'D', destination: 'B', duration: 15 }, 
    { source: 'D', destination: 'F', duration: 20 },
    { source: 'F', destination: 'D', duration: 20 }, 
    { source: 'F', destination: 'E', duration: 10 },
    { source: 'E', destination: 'F', duration: 10 }, 
    { source: 'E', destination: 'C', duration: 35 },
    { source: 'C', destination: 'E', duration: 35 }, 
    { source: 'C', destination: 'D', duration: 5 },
    { source: 'D', destination: 'C', duration: 5 }, 
    { source: 'E', destination: 'B', duration: 20 },
    { source: 'B', destination: 'E', duration: 20 } 

  ]);

  console.log("Seed data inserted successfully");
};

seedData().catch((err) => console.error("Error seeding data:", err));
