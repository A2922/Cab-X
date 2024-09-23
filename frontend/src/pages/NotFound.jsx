import React from 'react';

const NotFound = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">404 - Page Not Found</h1>
          <p className="py-6">Oops! The page you're looking for does not exist.</p>
          <button className="btn btn-primary" onClick={() => window.history.back()}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
