import Booking from "../models/bookingModel.js";

const isCabBooked = async (cabId, startTime, endTime) => {
  console.log(
    `Checking if cab ${cabId} is booked from ${startTime} to ${endTime}`
  );
  try {
    const bookings = await Booking.find({
      cab: cabId,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    });

    console.log("Bookings:", bookings);
    return bookings.length > 0;
  } catch (err) {
    console.error(err);
    throw new Error("Error checking cab booking status");
  }
};

export default isCabBooked;
