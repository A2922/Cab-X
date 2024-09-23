# Rapid Route

Rapid Route is a cab booking system web application designed to provide efficient and convenient transportation services. It allows users to book cabs, view available routes, and manage bookings seamlessly. The application is built using React.js, Vite.js, MongoDB, Express, Tailwind CSS, and Daisy UI for styling, along with React Icons and Context API for enhanced user experience.

## Features

- **User-friendly Interface:** Intuitive design and smooth navigation for a seamless user experience.
- **Responsive Design:** Optimized for various screen sizes and devices, ensuring accessibility from desktop to mobile.
- **Route Selection:** Users can choose from available routes and book their preferred cab.
- **Dynamic Pricing:** Each cab has a different pricing structure based on distance traveled.
- **Dijkstra Algorithm:** Utilizes Dijkstra's algorithm for calculating the shortest distance between pickup and drop-off locations.
- **Email Notifications:** Sends email notifications to users upon successful booking, providing confirmation and details.
- **Admin Functionality:** Admins can manage bookings, including deleting previous bookings to maintain system efficiency.

## Screenshots

### Booking Form
![Booking Form](/bookingform.png)
*The home page displays booking form with further available cabs.*

### Previous Bookings
![Previous Bookings](/BookingAndCabSection.png)
*Here Admin can manage bookings and even edit cab details.*
### Booking Mail Confirmation
![Booking Mail Confirmation](/bookingmailconfirmation.png)
*As Soon as cab is booked a booking confirmation mail is sended to the user*

## Technologies Used

- **React.js:** Frontend framework for building dynamic user interfaces.
- **Vite.js:** Next-generation frontend tooling for faster development.
- **MongoDB:** NoSQL database for efficient data storage and retrieval.
- **Express:** Backend framework for building robust and scalable web applications.
- **Tailwind CSS:** Utility-first CSS framework for rapid styling.
- **Daisy UI:** UI component library for Tailwind CSS, enhancing design capabilities.
- **React Icons:** Library providing a wide range of icons for use in React applications.
- **Context API:** React's built-in state management solution for managing global application state.
- **Nodemailer:** Node.js module for sending emails, used for sending booking confirmations.

## Setup

To run Rapid Route locally, follow these steps:

1. Clone the repository:  
```bash
git clone 
```
2. Navigate to the project directory:
```bash
cd rapid-route && cd frontend
```
3. Install dependencies:
```bash
npm install
```
4. Start the development server:
```bash
npm run dev
```
5. Open your browser and navigate to `http://localhost:5173` to view the application.


