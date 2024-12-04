import React from 'react';
// Importiere das Logo
import hochschuleLogo from '../../assets/Hochschule_für_Oekonomie_&_Management_2012_logo.svg.png';

export default function Footer() {
  return (
    <div className="relative">
      <div className="bg-teal-950 py-4 flex justify-center items-center flex-col">
        {/* Copyright Text */}
        <h2 className="text-white text-center font-light mb-2">
          © 2024 WebTechnologie. Made by Jasid Khalaf and Joshua Schlosser.
        </h2>
        <p className="text-white text-sm text-center font-light">
          All rights reserved.
        </p>
      </div>
      {/* Logo unten rechts */}
      <div className="absolute bottom-0 right-0 m-4">
        <img
          src={hochschuleLogo}
          alt="Hochschule Logo"
          className="w-12 h-auto"
        />
      </div>
    </div>
  );
}
