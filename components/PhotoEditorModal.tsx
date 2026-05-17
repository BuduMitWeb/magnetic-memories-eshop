
import React, { useState, useCallback } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';

interface PhotoEditorModalProps {
  image: string;
  aspect: number;
  sizeLabel?: string;
  onConfirm: (croppedImageBlob: Blob) => void;
  onCancel: () => void;
}

export const PhotoEditorModal: React.FC<PhotoEditorModalProps> = ({ image, aspect: initialAspect, sizeLabel, onConfirm, onCancel }) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState(initialAspect);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area,
    rotation: number
  ): Promise<Blob> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('No 2d context');

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    const tempCanvas = document.createElement('canvas');
    const tctx = tempCanvas.getContext('2d');
    if (!tctx) throw new Error('No 2d context');

    const rotRad = (rotation * Math.PI) / 180;
    const { width: rotW, height: rotH } = {
      width: Math.abs(Math.cos(rotRad) * image.width) + Math.abs(Math.sin(rotRad) * image.height),
      height: Math.abs(Math.sin(rotRad) * image.width) + Math.abs(Math.cos(rotRad) * image.height),
    };

    tempCanvas.width = rotW;
    tempCanvas.height = rotH;
    tctx.translate(rotW / 2, rotH / 2);
    tctx.rotate(rotRad);
    tctx.drawImage(image, -image.width / 2, -image.height / 2);

    ctx.drawImage(
      tempCanvas,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        resolve(blob);
      }, 'image/jpeg', 0.95);
    });
  };

  const handleConfirm = async () => {
    if (croppedAreaPixels) {
      try {
        const blob = await getCroppedImg(image, croppedAreaPixels, rotation);
        onConfirm(blob);
      } catch (e) {
        console.error(e);
        alert('Chyba při zpracování fotky.');
      }
    }
  };

  const toggleAspect = () => {
      setAspect(1 / aspect);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6 bg-black/95 backdrop-blur-xl">
      <div className="bg-white w-full max-w-2xl rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-full max-h-[96vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-50 flex items-center justify-between bg-white z-10">
          <div className="flex flex-col">
            <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-pink animate-pulse"></span>
              Ořez fotky {sizeLabel && <span className="text-brand-purple">[{sizeLabel}]</span>}
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Nastavte výřez fotky dle potřeby</p>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onCancel();
            }} 
            className="p-2 sm:p-3 hover:bg-gray-50 rounded-full transition-all group cursor-pointer"
            aria-label="Zavřít editor"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-hover:text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cropper Container */}
        <div className="relative flex-grow w-full bg-gray-900 overflow-hidden">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
          />

          {/* Floating Zoom Control - Top Right */}
          <div className="absolute right-4 top-4 flex flex-col items-center gap-2 bg-white/20 backdrop-blur-xl p-1.5 rounded-2xl border border-white/30 shadow-2xl z-20">
            <button 
              onClick={() => setZoom(z => Math.min(3, z + 0.2))}
              className="w-10 h-10 rounded-xl bg-white hover:bg-brand-purple text-brand-purple hover:text-white flex items-center justify-center text-xl font-black transition-all shadow-lg active:scale-90"
              title="Přiblížit"
            >+</button>
            <button 
              onClick={() => setZoom(z => Math.max(1, z - 0.2))}
              className="w-10 h-10 rounded-xl bg-white hover:bg-brand-purple text-brand-purple hover:text-white flex items-center justify-center text-xl font-black transition-all shadow-lg active:scale-90"
              title="Oddálit"
            >–</button>
          </div>
          
          {/* Aspect Ratio Toggle - Top Left */}
          <button
            onClick={toggleAspect}
            className="absolute left-4 top-4 flex items-center gap-2 px-4 py-3 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 text-white hover:bg-white hover:text-brand-purple transition-all z-20 shadow-2xl"
            title="Otočit formát"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">
              {aspect > 1 ? 'Na šířku' : 'Na výšku'}
            </span>
          </button>
        </div>

        {/* Controls */}
        <div className="p-5 sm:p-6 bg-white space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <button
               onClick={() => setRotation(r => (r + 90) % 360)}
               className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl border-2 border-brand-purple/20 bg-brand-purple/5 hover:bg-brand-purple hover:text-white text-brand-purple transition-all group"
            >
              <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-xs font-black uppercase tracking-widest">Otočit o 90°</span>
            </button>

            <div className="flex gap-3 w-full sm:w-auto flex-grow justify-end">
              <button
                onClick={onCancel}
                className="flex-1 sm:flex-none sm:px-8 py-4 rounded-2xl border-2 border-gray-50 font-black text-gray-400 uppercase text-[10px] tracking-widest hover:bg-gray-50 transition-all"
              >
                Zrušit
              </button>
              <button
                onClick={handleConfirm}
                className="flex-[2] sm:flex-none sm:px-12 py-4 rounded-2xl bg-gradient-to-r from-brand-purple to-brand-pink text-white font-black uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-brand-purple/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Uložit ořez
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
