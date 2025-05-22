import React from 'react';
import '../styles.css'; // Ensure this import is present to apply global styles

const Header = () => {
  return (
    <header className="bg-pink-100 text-gray-700 py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Radiant Glow Beauty Salon</h1>
        <button className="elegant-button" onClick={() => window.location.href = '/contact'}>
          Contact Us
        </button>
      </div>
    </header>
  );
};

export default Header;