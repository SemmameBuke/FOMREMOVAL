import React from 'react';
// Bilder importieren
import profileImg1 from '../../assets/profile_img_1.png';
import profileImg2 from '../../assets/profile_img_2.png';

// Testimonials-Daten lokal definieren
const testimonialsData = [
  {
    id: 1,
    text: "Eine Erleichterung für den Alltag. Kann ich nur weiterempfehlen.",
    author: "John Schlosser",
    image: profileImg1,
    jobTitle: 'SAP Consultant',
  },
  {
    id: 2,
    text: "Schnell, Zuverlässig und Effizient. Sowas habe ich gesucht.",
    author: "Jasid Khalaf",
    image: profileImg2,
    jobTitle: 'Application Developer',
  },
];

const Testimonials = () => {
  return (
    <div>
      {/* Titel */}
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-teal-200 to-lime-200 bg-clip-text text-transparent py-5">
        Customer Testimonials
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto px-4 py-8">
        {testimonialsData.map((item, index) => (
          <div
            className="bg-white rounded-xl p-6 drop-shadow-md max-w-lg m-auto hover:scale-105 transition-all duration-700"
            key={index}
          >
            <p className="text-4xl text-gray-900">“</p>
            <p className="text-sm text-gray-500">{item.text}</p>
            <div className="flex items-center gap-3 mt-5">
              <img className="w-12 rounded-full" src={item.image} alt={item.author} />
              <div>
                <p>{item.author}</p>
                <p className="text-sm text-gray-600">{item.jobTitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
