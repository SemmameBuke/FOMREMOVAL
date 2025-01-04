import React, { useRef, useState, useEffect } from 'react';

const ImageSelector = ({ imageSrc, onAreaSelected }) => {
  const [selection, setSelection] = useState(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [scaledRatio, setScaledRatio] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.src = imageSrc;
    img.onload = () => {
      const maxWidth = 800; // Maximal erlaubte Breite
      const maxHeight = 600; // Maximal erlaubte Höhe

      const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
      setScaledRatio(scale);

      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      imgRef.current = img;
    };
  }, [imageSrc]);

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Canvas löschen und Bild neu zeichnen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);

    // Rechteck zeichnen, falls vorhanden
    if (selection) {
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 3; // Dickere Linie
      ctx.setLineDash([]); // Volle Linie
      ctx.strokeRect(
        selection.startX * scaledRatio,
        selection.startY * scaledRatio,
        selection.width * scaledRatio,
        selection.height * scaledRatio
      );
    }
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const startX = (e.clientX - rect.left) / scaledRatio;
    const startY = (e.clientY - rect.top) / scaledRatio;

    setSelection({ startX, startY, width: 0, height: 0 });
  };

  const handleMouseMove = (e) => {
    if (!selection || selection.fixed) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const currentX = (e.clientX - rect.left) / scaledRatio;
    const currentY = (e.clientY - rect.top) / scaledRatio;

    const updatedSelection = {
      ...selection,
      width: currentX - selection.startX,
      height: currentY - selection.startY,
    };
    setSelection(updatedSelection);

    redrawCanvas(); // Rechteck während der Bewegung zeichnen
  };

  const handleMouseUp = () => {
    if (selection) {
      const fixedSelection = { ...selection, fixed: true };
      setSelection(fixedSelection); // Auswahl fixieren
      redrawCanvas(); // Rechteck bleibt sichtbar

      if (onAreaSelected) {
        onAreaSelected({
          startX: fixedSelection.startX,
          startY: fixedSelection.startY,
          width: fixedSelection.width,
          height: fixedSelection.height,
        });
      }
    }
  };

  // Sicherstellen, dass das Rechteck nach dem Zeichnen sichtbar bleibt
  useEffect(() => {
    if (imgRef.current) {
      redrawCanvas();
    }
  }, [selection]);

  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          cursor: 'crosshair',
          border: '1px solid black',
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
};

export default ImageSelector;
