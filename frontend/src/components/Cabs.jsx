import React, { useState } from "react";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import { useBookingContext } from "../context/BookingContext";
import { confirmAlert } from "react-confirm-alert"; // Import react-confirm-alert
import "react-confirm-alert/src/react-confirm-alert.css"; // Import react-confirm-alert CSS
import Loader from "./Loader";

function Cabs({ cab }) {
  const { loading, handleEditCab } = useBookingContext();
  const [editMode, setEditMode] = useState(false);
  const [editedCab, setEditedCab] = useState(cab); // Track edited cab details

  const handleEdit = () => {
    setEditMode(true);
    // Initialize editedCab state with current cab details
    setEditedCab(cab);
  };

  const handleSave = async () => {
    try {
      // Call the edit function from context with the edited cab details
      await handleEditCab(editedCab);
      setEditMode(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating cab:", error);
      // Handle error
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the editedCab state with the changed value
    setEditedCab((prevCab) => ({
      ...prevCab,
      [name]: value,
    }));
  };



  return (
    <div className="border border-gray-200 rounded-md p-4 flex flex-col justify-between">
      {loading ? (
        <Loader />
      ) : (
        <>
          {!editMode ? (
            <div>
              <p className="text-sm font-semibold">Cab Name: {cab.name}</p>
              <p className="text-sm font-semibold">
                Price per Minute: Rs. {cab.pricePerMinute}
              </p>
            </div>
          ) : (
            <div>
              <input
                type="text"
                name="name"
                value={editedCab.name}
                onChange={handleChange}
                className="input input-bordered mb-2"
              />
              <input
                type="number"
                name="pricePerMinute"
                value={editedCab.pricePerMinute}
                onChange={handleChange}
                className="input input-bordered"
              />
            </div>
          )}

          <div className="flex justify-between mt-2">
            {!editMode ? (
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={handleEdit}
              >
                <RiEdit2Fill className="w-5 h-5" />
              </button>
            ) : (
              <button
                className="text-green-500 hover:text-green-700"
                onClick={handleSave}
              >
                Save
              </button>
            )}

          </div>
        </>
      )}
    </div>
  );
}

export default Cabs;
