import React from 'react';
import Navbar from './components/navbar/Navbar';
import RemoveBackground from './components/removeBackground/RemoveBackground';
import Footer from './components/footer/Footer';
import BgSlider from './components/bgSlider/BgSlider';
import Testimonials from './components/testimonials/Testimonials'; // Testimonials importieren

export default function App() {
  return (
    <div>
      <Navbar />
      {/* BgSlider zuerst anzeigen */}
      <div className="py-5"> {/* Padding reduziert */}
        <BgSlider />
      </div>
      {/* RemoveBackground danach anzeigen */}
      <div className="">
        <RemoveBackground />
      </div>
      {/* Testimonials hinzufügen */}
      <div className="">
        <Testimonials />
      </div>
      <Footer />
    </div>
  );
}
