// controllers/bookingController.js

import User from "../models/userModel.js";
import findShortestPath from "../utils/findShortestPath.js";
import Cab from "../models/cabModel.js";
import Booking from "../models/bookingModel.js";
import isCabBooked from "../utils/isCabBooked.js";
import moment from "moment";
import dotenv from "dotenv";

dotenv.config();
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "ankit1082.be20@chitkarauniversity.edu.in",
      pass: "Ankit@2922"
    },
    pool: false,
  });






  const sendMail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions); // Pass mailOptions here
        console.log('Email sent successfully!');
    } catch (error) {
        console.error(error);
    }
}


const createBooking = async (req, res) => {
  try {
    const { name, email, source, destination, startTime, cabId, date } = req.body;

    // Check if booking details are provided
    if (!name || !email || !source || !destination || !startTime || !cabId || !date) {
      return res
        .status(400)
        .json({ message: "Booking details are incomplete" });
    }

    // Find or create the user based on the provided email
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email });
    }

    // Find the shortest path from source to destination
    const { path: shortestPath, duration } = await findShortestPath(
      source,
      destination
    );

    if (!shortestPath) {
      return res
        .status(400)
        .json({ message: "Unable to find the shortest path" });
    }

    // Check if the chosen cab exists and is available
    const chosenCab = await Cab.findById(cabId);
    if (!chosenCab) {
      return res.status(404).json({ message: "Cab not found" });
    }
    if (!chosenCab.available) {
      return res.status(400).json({ message: "Chosen cab is not available" });
    }

    // Calculate start and end times based on the provided date and start time
    const combinedDateTime = moment(`${date} ${startTime}`, "YYYY-MM-DD h:mm A");
    const endTime = combinedDateTime
      .clone()
      .add(duration, "minutes")
      .format("YYYY-MM-DD h:mm A");

    // Check if the chosen cab is booked for the specified time range
    const cabBooked = await isCabBooked(cabId, combinedDateTime.format("YYYY-MM-DD h:mm A"), endTime);
    if (cabBooked) {
      return res.status(400).json({
        message: "Chosen cab is already booked for the specified time range",
      });
    }

    const amount = chosenCab.pricePerMinute * duration;

    console.log("Cab"+chosenCab)

    // Create the booking
    const booking = new Booking({
      user: user._id,
      cab: chosenCab._id,
      source,
      destination,
      startTime: combinedDateTime.format("YYYY-MM-DD h:mm A"),
      endTime,
      amount,
    });
    await booking.save();

    const emailHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          padding: 40px;
        }
        h1 {
          color: #333333;
        }
        p {
          margin-bottom: 10px;
          color: #666666;
        }
        .icon {
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
        }
        .info-container {
          margin-top: 20px;
          border-top: 1px solid #cccccc;
          padding-top: 20px;
        }
        .amount {
          font-size: 18px;
          color: #ff6600;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1><span class="icon">🚖</span>Booking Confirmation</h1>
        <p>Thank you for booking your ride with us. Here are the details:</p>
        <p><strong>Source:</strong> ${source}</p>
        <p><strong>Destination:</strong> ${destination}</p>
        <p><strong>Start Time:</strong> ${combinedDateTime.format("YYYY-MM-DD h:mm A")}</p>
        <p><strong>End Time:</strong> ${endTime}</p>
        <div class="info-container">
          <p><strong>Cab:</strong> ${chosenCab.name}</p>
          <p><strong>Amount to be Paid:</strong> <span class="amount">Rs.${amount}</span></p>
        </div>
      </div>
    </body>
    </html>
  `;
  


    const mailOptions = {
      from: {
          name: "Rapid Route",
          address: "ankit1082.be20@chitkarauniversity.edu.in",
      }, // sender address
      to: email, // list of receivers
      subject: "Booking Confirmation", 
      text: "Your booking has been confirmed.", 
      html: emailHTML,
  };

  

  await sendMail(transporter, mailOptions);
    // Return the created booking
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};



const checkBooking = async (req, res) => {
  try {
    const { name, email, source, destination, startTime, date } = req.body;

    // Check if name, email, source, destination, startTime, and date are provided
    if (!name || !email || !source || !destination || !startTime || !date) {
      return res
        .status(400)
        .json({ message: "Booking details are incomplete" });
    }

    // Parse date and start time into a combined moment object
    const combinedDateTime = moment(`${date} ${startTime}`, "YYYY-MM-DD h:mm A");

    // Find or create the user based on the provided email
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email });
    }

    // Find the shortest path from source to destination
    const shortestPath = await findShortestPath(source, destination);

    if (!shortestPath) {
      return res
        .status(400)
        .json({ message: "Unable to find the shortest path" });
    }

    // Calculate the end time based on the start time and shortest path duration
    const endTime = combinedDateTime
      .clone()
      .add(shortestPath.duration, "minutes")
      .format("YYYY-MM-DD h:mm A");

    // Find available cabs
    const availableCabs = await Cab.find();

    // Check cab availability at the specified start time
    const availableCabsWithRates = [];
    let noAvailableCabs = true;
    for (const cab of availableCabs) {
      const cabAvailable = await isCabBooked(
        cab._id,
        combinedDateTime.format("YYYY-MM-DD h:mm A"),
        endTime
      );
      if (!cabAvailable) {
        noAvailableCabs = false;
        const rate = cab.pricePerMinute * shortestPath.duration;
        availableCabsWithRates.push({ _id: cab._id, name: cab.name, rate });
      }
    }

    if (noAvailableCabs) {
      return res.status(400).json({ message: "No cabs available" });
    }

    // Return user, shortest path, end time, and available cabs with rates
    res.json({ endTime, availableCabsWithRates });
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};




const getBookings = async (req, res) => {
  try {
    // Fetch all bookings from the database and populate the user and cab fields
    const bookings = await Booking.find()
      .populate('user', 'name email') // Populate the 'user' field with the 'name' property
      .populate('cab'); // Populate the 'cab' field with all properties
    
    // Return the bookings
    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const deletedBooking = await Booking.findOneAndDelete({ _id: bookingId });
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking removed" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const editBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { name, email, source, destination, startTime, cabId, date } = req.body;

    // Check if booking details are provided
    if (!name || !email || !source || !destination || !startTime || !cabId || !date) {
      return res.status(400).json({ message: "Booking details are incomplete" });
    }

    // Find the booking by ID
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if the chosen cab exists and is available
    const chosenCab = await Cab.findById(cabId);
    if (!chosenCab) {
      return res.status(404).json({ message: "Cab not found" });
    }
    // Check if the chosen cab is available for the updated time range
    const startTimeMoment = moment(`${date} ${startTime}`, "YYYY-MM-DD h:mm A");
    const endTimeMoment = startTimeMoment.clone().add(booking.duration, "minutes");
    const cabBooked = await isCabBooked(cabId, startTimeMoment.format("YYYY-MM-DD h:mm A"), endTimeMoment.format("YYYY-MM-DD h:mm A"));
    if (cabBooked) {
      return res.status(400).json({
        message: "Chosen cab is already booked for the specified time range",
      });
    }

    // Update the booking details
    booking.user.name = name;
    booking.user.email = email;
    booking.source = source;
    booking.destination = destination;
    booking.startTime = startTimeMoment.format("YYYY-MM-DD h:mm A");
    booking.endTime = endTimeMoment.format("YYYY-MM-DD h:mm A");
    booking.cab = cabId;
    booking.date = date;

    // Save the updated booking
    await booking.save();

    // Return the updated booking
    res.json({ message: "Booking updated successfully", booking });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export { checkBooking, createBooking, getBookings , deleteBooking, editBooking};
