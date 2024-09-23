// context/BookingContext.js

import React, { createContext, useState, useContext, useEffect } from "react";

const BookingContext = createContext();

export const useBookingContext = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    source: "",
    destination: "",
    startTime: "",
    date: "",
  });


  const apiURL = "https://rapid-route.onrender.com";

  const [previousBookings, setPreviousBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableCabs, setAvailableCabs] = useState([]);
  const [selectedCab, setSelectedCab] = useState(null);
  const [isFetchingCabs, setIsFetchingCabs] = useState(false);
  const [allCabs, setAllCabs] = useState([]);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  const [toast, setToast] = useState(null); // New toast state



  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiURL}/api/bookings/`);
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const data = await response.json();
      setPreviousBookings(data.bookings);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchBookings();
    fetchAllCabs();
  }, []);

  const showToast = (message, status) => {
    setToast({ message, status });
    setTimeout(() => {
      hideToast();
    }, 3000); // Set timeout to hide toast after 3 seconds
  };

  const hideToast = () => {
    setToast(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if(name === 'date') {
      const date = new Date(value);
      const today = new Date();
      if(date < today) {
        setBookingError("Please select a valid date");
        setBookingStatus("error");
        setTimeout(() => {
          setBookingStatus(null);
          setBookingError(null);
        }, 2000);
        return;
      }
    }
    

    setFormData({ ...formData, [name]: value });
  };

  const handleCheckAvailableCabs = async () => {
    if (
      !formData.source ||
      !formData.destination ||
      !formData.startTime ||
      !formData.date
    ) {
      setBookingError("Please fill in all the fields");
      setBookingStatus("error");
      setTimeout(() => {
        setBookingStatus(null);
        setBookingError(null);
      }, 2000);
      return;
    }

    setIsFetchingCabs(true);
    try {
      const response = await fetch(`${apiURL}/api/bookings/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch available cabs");
      }
      const data = await response.json();
      setAvailableCabs(data.availableCabsWithRates);
    } catch (error) {
      console.error(error);
      setBookingStatus("error");
    } finally {
      setIsFetchingCabs(false);
    }
  };

  const handleCabSelection = (cabId) => {
    setSelectedCab(cabId);
  };

  const handleCreateBooking = async () => {
    try {
      const response = await fetch(`${apiURL}/api/bookings/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          cabId: selectedCab,
        }),
      });
      const responseData = await response.json(); // Parse response JSON

      if (!response.ok) {
        throw new Error(responseData.message); // Throw error message received from server
      } else {
        setBookingStatus("success");
        setTimeout(() => setBookingStatus(null), 2000);
        resetFormFields();
      }
      availableCabs.length = 0; // Clear available cabs
      fetchBookings(); // Fetch bookings again to update the list
    } catch (error) {
      console.error(error);
      setBookingError(error.message); // Set booking error message
      setBookingStatus("error");
      setTimeout(() => {
        setBookingStatus(null);
        setBookingError(null); // Clear error message after displaying
      }, 2000);
    }
  };


  

  const resetFormFields = () => {
    setFormData({
      name: "",
      email: "",
      source: "",
      destination: "",
      startTime: "",
      date: "",
    });
  };


  const handleDeleteBooking = async (bookingId) => {
    try {
      const response = await fetch(`${apiURL}/api/bookings/${bookingId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }
      const data = await response.json();
      setPreviousBookings((previousBookings) =>
        previousBookings.filter((booking) => booking._id !== bookingId)
      );
    } catch (error) {
      console.error(error);
    }
  }


  const fetchAllCabs = async () => {
    try {
      const response = await fetch(`${apiURL}/api/cabs`);
      if (!response.ok) {
        throw new Error('Failed to fetch cabs');
      }
      const data = await response.json();
      setAllCabs(data); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCab = async (editedCab) => {
    try {
      const response = await fetch(`${apiURL}/api/cabs/${editedCab._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedCab),
      });

      if (!response.ok) {
        throw new Error("Failed to update cab");
      }

      const updatedCab = await response.json();

      // You can handle the updated cab data as needed, e.g., updating state
      fetchAllCabs(); // Fetch all cabs again to update the list
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <BookingContext.Provider
      value={{
        formData,
        setFormData,
        availableCabs,
        setAvailableCabs,
        selectedCab,
        setSelectedCab,
        isFetchingCabs,
        setIsFetchingCabs,
        bookingStatus,
        setBookingStatus,
        bookingError, // Provide booking error to components
        handleChange,
        handleCheckAvailableCabs,
        handleCabSelection,
        handleCreateBooking,
        previousBookings,
        handleDeleteBooking,
        showToast,
        loading,
        allCabs,
        handleEditCab,
        hideToast,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
