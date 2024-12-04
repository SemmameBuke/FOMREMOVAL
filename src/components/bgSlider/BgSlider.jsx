import React, { useState } from 'react';
// Bilder direkt importieren
import imageWithBackground from '../../assets/image_w_bg.png';
import imageWithoutBackground from '../../assets/image_wo_bg.png';

const BgSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    

      <div className="relative w-full max-w-3xl overflow-hidden m-auto rounded-xl">
        {/* Hintergrundbild */}
        <img
          src={imageWithBackground} // Direktimport
          style={{ clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)` }}
          alt="Image with Background"
        />

        {/* Vordergrundbild */}
        <img
          className="absolute top-0 left-0 w-full h-full"
          src={imageWithoutBackground} // Direktimport
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
          alt="Image without Background"
        />

        {/* Schieberegler */}
        <input
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10 slider"
          type="range"
          min={0}
          max={100}
          value={sliderPosition}
          onChange={handleSliderChange}
          style={{
            accentColor: '#9ae6b4', // Grünton für den Slider
          }}
        />
      </div>
  );
};

export default BgSlider;
