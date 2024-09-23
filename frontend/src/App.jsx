import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="App" >
        <Navbar/>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<NotFound />} />

        {/* Footer Component */}
        </Routes>
        {/* <Footer/> */}
      </div>
    </Router>
  );
}

export default App;
