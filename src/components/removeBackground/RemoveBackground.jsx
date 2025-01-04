import React, { useState } from 'react';
import ImageSelector from '../imageSelector/ImageSelector';

export default function RemoveBackground() {
  const [image, setImage] = useState(null);
  const [bgRemove, setBgRemove] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [useSelection, setUseSelection] = useState(false); // Modus für Bereichsauswahl
  const [loading, setLoading] = useState(false); // Zustand für den Ladebalken/Spinner
  const [leftButtonText, setLeftButtonText] = useState("Remove Background (Full Image)"); // Dynamischer Button-Text

  const handleRemoveBackground = async () => {
    setLoading(true); // Spinner starten
    const apiKey = 'uAAnrmCTcW34kPgmnM8vbUCr';
    const apiUrl = 'https://api.remove.bg/v1.0/removebg';

    const img = new Image();
    img.src = URL.createObjectURL(image);

    img.onload = async () => {
      let blobToSend;

      if (useSelection && selectedArea && selectedArea.width && selectedArea.height) {
        // Zuschneiden des ausgewählten Bereichs
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = selectedArea.width;
        canvas.height = selectedArea.height;

        ctx.drawImage(
          img,
          selectedArea.startX,
          selectedArea.startY,
          selectedArea.width,
          selectedArea.height,
          0,
          0,
          selectedArea.width,
          selectedArea.height
        );

        blobToSend = await new Promise((resolve) =>
          canvas.toBlob(resolve, 'image/png')
        );
      } else {
        // Ganzes Bild verwenden, wenn keine Auswahl getroffen wurde
        blobToSend = await new Promise((resolve) => {
          const fullCanvas = document.createElement('canvas');
          fullCanvas.width = img.width;
          fullCanvas.height = img.height;
          const fullCtx = fullCanvas.getContext('2d');
          fullCtx.drawImage(img, 0, 0, img.width, img.height);
          fullCanvas.toBlob(resolve, 'image/png');
        });
      }

      const formData = new FormData();
      formData.append('image_file', blobToSend, 'image.png');
      formData.append('size', 'auto');

      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'X-api-key': apiKey,
          },
          body: formData,
        });

        if (!res.ok) {
          console.error('Fehler beim Entfernen des Hintergrunds:', res.statusText);
          setLoading(false); // Spinner stoppen
          return;
        }

        const data = await res.blob();

        const reader = new FileReader();
        reader.onloadend = () => {
          setBgRemove(reader.result);
          setLoading(false); // Spinner stoppen
        };
        reader.readAsDataURL(data);
      } catch (error) {
        console.error('Fehler bei der API:', error);
        setLoading(false); // Spinner stoppen
      }
    };
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="pb-10 md:py-2 mx-2">
          <h2 className="text-center text-lg font-medium mb-4">
            
          </h2>

          <div className="input border border-gray-200 px-2 py-2 rounded-lg bg-gray-950 mb-5">
            <input
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setBgRemove(null); // Setze das Ergebnis zurück
                setSelectedArea(null); // Setze die Auswahl zurück
                setLeftButtonText("Remove Background (Full Image)"); // Setze den Text zurück
                setUseSelection(false); // Standardmodus
              }}
              className="text-sm text-gray-500 file:mr-5 file:py-1 file:px-3 file:text-xs file:font-medium file:border-0 file:rounded-md file:bg-gray-800 file:text-gray-500 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700 lg:w-[40em]"
            />
          </div>

          {/* Buttons für Optionen */}
          {image && (
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => {
                  if (useSelection) {
                    handleRemoveBackground(); // Entferne ausgewählten Bereich
                  } else {
                    handleRemoveBackground(); // Entferne gesamten Hintergrund
                  }
                }}
                className="text-black bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {leftButtonText}
              </button>
              <button
                onClick={() => {
                  setUseSelection(true); // Modus: Bereichsauswahl
                  setLeftButtonText("Remove Selected Area"); // Ändere Button-Text
                }}
                className="text-black bg-gradient-to-r from-blue-200 to-purple-200 hover:bg-gradient-to-l hover:from-blue-200 hover:to-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Select Area and Remove Background
              </button>
            </div>
          )}

          {/* Bildanzeige für Auswahl */}
          {useSelection && image && (
            <div className="mb-10">
              <ImageSelector
                imageSrc={URL.createObjectURL(image)}
                onAreaSelected={(area) => setSelectedArea(area)}
              />
            </div>
          )}

          {/* Spinner während des Ladens */}
          {loading && (
            <div className="flex justify-center my-5">
              <div className="loader"></div>
            </div>
          )}

          {/* Ergebnisse */}
          <div className="flex justify-center items-center gap-20 mb-5">
            {image && (
              <div className="border-2 border-gray-500 rounded-lg border-dashed flex justify-center p-4 w-60 lg:w-80">
                <img
                  className="w-full h-auto"
                  src={image ? URL.createObjectURL(image) : ''}
                  alt="Original"
                />
              </div>
            )}

            {bgRemove && (
              <div className="border-2 border-green-500 rounded-lg border-dashed flex justify-center p-4 w-60 lg:w-80">
                <img className="w-full h-auto" src={bgRemove} alt="Ohne Hintergrund" />
              </div>
            )}
          </div>

          {bgRemove && (
            <div className="flex justify-center">
              <a className="w-full" href={bgRemove} download={'save.png'}>
                <button className="text-black bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full">
                  Download
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
