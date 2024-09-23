import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RecentBooking from "../components/RecentBooking";

import { TypeAnimation } from 'react-type-animation';
import Booking from "../components/Booking";

const Homepage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch bookings when the component mounts
    fetch("https://rapid-route.onrender.com/api/bookings/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        return response.json();
      })
      .then((data) => {
        setBookings(data.bookings);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);


  console.log(bookings);

  return (
    <div className="">
      <div className="bg-[url('https://cdn.blablacar.com/kairos/assets/images/carpool_only_large-1fb250954893109fa160.svg')] bg-no-repeat bg-cover bg-center h-[300px] flex flex-col gap-36">
        <header className="text-white text-center p-8">
          <h2 className="text-5xl font-bold mb-4">Your pick of rides at  <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'low prices',
        2000, // wait 1s before replacing "Mice" with "Hamsters"
        'low duration',
        2000,
        'less distance',
        2000,
      ]}
      wrapper="span"
      speed={50}
      style={{display: 'inline-block' }}
      repeat={Infinity}
    /></h2>
        </header>
  
        {/* Bookings component */}
        <div className="relative z-20">
          <Booking />
        </div>
      </div>
  
      {/* Recent bookings */}
      {/* <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 relative top-44">
        {loading ? (
          <p>Loading...</p>
        ) : (
          bookings.map((booking, index) => (
            <RecentBooking key={index} booking={booking} />
          ))
        )} */}

    </div>
  );
};

export default Homepage;
