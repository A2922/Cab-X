import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useBookingContext } from "../context/BookingContext";
import { confirmAlert } from "react-confirm-alert"; // Import react-confirm-alert
import "react-confirm-alert/src/react-confirm-alert.css"; // Import react-confirm-alert CSS
import Loader from "./Loader";

function RecentBooking({ booking }) {
  const { handleDeleteBooking, loading } = useBookingContext();
  const [confirmDelete, setConfirmDelete] = useState(false); // State to track confirmation

  const confirmDeleteBooking = () => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this booking?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            handleDeleteBooking(booking._id); // Call handleDeleteBooking if confirmed
          },
        },
        {
          label: "No",
          onClick: () => {}, // Do nothing if canceled
        },
      ],
    });
  };

  return (
    <div
      key={booking._id}
      className="border border-gray-200 rounded-md p-4 flex flex-col justify-between"
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <p className="text-sm font-semibold">
              User Name: {booking.user.name}
            </p>
            <p className="text-sm font-semibold">
              Cab Booked : {booking.cab.name}
            </p>
            <p className="text-sm font-semibold">Source: {booking.source}</p>
            <p className="text-sm font-semibold">
              Destination: {booking.destination}
            </p>
            <p className="text-sm font-semibold">
              Journey Time : {booking.startTime}
            </p>
            <p className="text-sm font-semibold">Amount: Rs.{booking.amount}</p>
          </div>

          <button
            className="text-red-500 hover:text-red-700 mt-2"
            onClick={() => confirmDeleteBooking()} // Open confirmation popup
          >
            <RiDeleteBin6Line className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
}

export default RecentBooking;
