import React from 'react';
// Importiere das Logo
import hochschuleLogo from '../../assets/Hochschule_für_Oekonomie_&_Management_2012_logo.svg.png';

export default function Navbar() {
    return (
        <div>
            <div className="flex justify-center py-5">
                <div className="">
                    {/* Logo hinzufügen */}
                    <div className="flex justify-center mb-5">
                        <img
                            className="w-16" // Größe des neuen Logos anpassen
                            src={hochschuleLogo}
                            alt="Hochschule Logo"
                        />
                    </div>

                    {/* Titel */}
                    <h1 className="text-4xl lg:text-6xl font-medium text-center mb-3 bg-gradient-to-r from-teal-200 to-lime-200 bg-clip-text text-transparent">
                        FOMremoval
                    </h1>

                    {/* Beschreibung */}
                    <p className="text-xl lg:text-2xl font-medium text-center mb-3 bg-gradient-to-r from-teal-200 to-lime-200 bg-clip-text text-transparent">
                        Fast, simple and great performance.
                    </p>
                </div>
            </div>
        </div>
    );
}
