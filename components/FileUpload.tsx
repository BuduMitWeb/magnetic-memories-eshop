import React, { useCallback, useState, useEffect } from 'react';
import { UploadedPhoto } from '../types';
import { PhotoEditorModal } from './PhotoEditorModal';

interface FileUploadProps {
  onUploadComplete: (photos: UploadedPhoto[], groupId: string | null) => void;
  requiredCount: number;
  productName: string;
  onUploadingChange?: (uploading: boolean) => void;
  labelHint?: string;
  currentPhotos?: UploadedPhoto[];
  aspect?: number;
  sizeLabel?: string;
  hideUpload?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onUploadComplete, requiredCount, productName, onUploadingChange, labelHint, currentPhotos, aspect = 1, sizeLabel, hideUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [internalPhotos, setInternalPhotos] = useState<UploadedPhoto[]>([]);
  const [progress, setProgress] = useState(0);
  const [groupId, setGroupId] = useState<string | null>(null);

  // Editor states
  const [editingQueue, setEditingQueue] = useState<File[]>([]);
  const [currentEditIndex, setCurrentEditIndex] = useState<number>(-1);
  const [currentEditImage, setCurrentEditImage] = useState<string | null>(null);

  const CLOUDINARY_CLOUD_NAME = 'dvzuwzrpm'; 
  const CLOUDINARY_UPLOAD_PRESET = 'magnetic_preset'; 

  const isMagnet = productName.toLowerCase().includes('magnet');

  useEffect(() => {
    if (currentPhotos) {
      setInternalPhotos(currentPhotos);
    }
  }, [currentPhotos]);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (requiredCount > 0 && files.length !== requiredCount && productName.toLowerCase().includes('kalendář')) {
      alert(`Pro kalendář je potřeba vybrat přesně ${requiredCount} fotografií. Vybrali jste ${files.length}.`);
      return;
    }

    const fileList = Array.from(files);
    
    // For magnets, we want to edit every photo
    if (isMagnet) {
      setEditingQueue(fileList);
      setCurrentEditIndex(0);
      const reader = new FileReader();
      reader.onload = (ev) => setCurrentEditImage(ev.target?.result as string);
      reader.readAsDataURL(fileList[0]);
    } else {
      // Normal upload flow
      startUpload(fileList);
    }
  }, [requiredCount, productName, isMagnet]);

  const startUpload = async (files: (File | Blob)[], names?: string[]) => {
    setUploading(true);
    onUploadingChange?.(true);
    setProgress(5);

    try {
      const newUploadedPhotos: UploadedPhoto[] = [];
      const newGroupId = groupId || `order-${Date.now()}`;
      setGroupId(newGroupId);

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = names ? names[i] : (file instanceof File ? file.name : `photo-${Date.now()}.jpg`);
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: 'POST', body: formData }
        );

        const data = await response.json();
        if (!response.ok) throw new Error(data.error?.message || 'Chyba serveru Cloudinary');
        
        newUploadedPhotos.push({ 
          url: data.secure_url, 
          name: fileName,
          quantity: 1
        });
        setProgress(Math.round(((i + 1) / files.length) * 100));
      }

      const updatedPhotos = [...internalPhotos, ...newUploadedPhotos];
      setInternalPhotos(updatedPhotos);
      onUploadComplete(updatedPhotos, newGroupId);
    } catch (error: any) {
      alert(`Chyba při nahrávání: ${error.message}`);
    } finally {
      setUploading(false);
      onUploadingChange?.(false);
      setProgress(0);
    }
  };

  const [processedBlobs, setProcessedBlobs] = useState<Blob[]>([]);
  const [processedNames, setProcessedNames] = useState<string[]>([]);

  const handleEditorConfirm = (blob: Blob) => {
    const nextIndex = currentEditIndex + 1;
    const currentFileName = editingQueue[currentEditIndex].name;
    
    const newBlobs = [...processedBlobs, blob];
    const newNames = [...processedNames, currentFileName];

    if (nextIndex < editingQueue.length) {
      setProcessedBlobs(newBlobs);
      setProcessedNames(newNames);
      setCurrentEditIndex(nextIndex);
      const reader = new FileReader();
      reader.onload = (ev) => setCurrentEditImage(ev.target?.result as string);
      reader.readAsDataURL(editingQueue[nextIndex]);
    } else {
      // Last one edited, start upload
      setProcessedBlobs([]);
      setProcessedNames([]);
      setCurrentEditIndex(-1);
      setCurrentEditImage(null);
      setEditingQueue([]);
      startUpload(newBlobs, newNames);
    }
  };

  const handleEditorCancel = () => {
    setCurrentEditIndex(-1);
    setCurrentEditImage(null);
    setEditingQueue([]);
    setProcessedBlobs([]);
    setProcessedNames([]);
  };

  const updatePhotoQuantity = (index: number, newQty: number) => {
    const updated = [...internalPhotos];
    updated[index].quantity = Math.max(1, newQty);
    setInternalPhotos(updated);
    onUploadComplete(updated, groupId);
  };

  const removePhoto = (index: number) => {
    const updated = internalPhotos.filter((_, i) => i !== index);
    setInternalPhotos(updated);
    onUploadComplete(updated, groupId);
  };

  const totalAssigned = internalPhotos.reduce((sum, p) => sum + (p.quantity || 1), 0);

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">
            {requiredCount > 0 ? (
              isMagnet ? `Nahrajte fotky (celkem ${requiredCount} ks magnetů)` : `Nahrajte ${requiredCount} ${requiredCount === 1 ? 'fotku' : 'fotek'}`
            ) : 'Nahrajte fotku'} 
            {labelHint && <span className="text-brand-purple lowercase font-normal ml-1 italic">{labelHint}</span>}
          </h3>
          {isMagnet && (
            <p className="text-[9px] font-bold text-brand-pink uppercase">
              Rozděleno: {totalAssigned} z {requiredCount} magnetů
              {totalAssigned > requiredCount && <span className="text-red-500 ml-1">(! limit překročen)</span>}
            </p>
          )}
        </div>
        {internalPhotos.length > 0 && !uploading && (
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${totalAssigned === requiredCount ? 'text-green-600 bg-green-50 border-green-200' : 'text-brand-purple bg-purple-50 border-purple-200'}`}>
                {isMagnet ? `Magnety: ${totalAssigned}/${requiredCount}` : `Fotky: ${internalPhotos.length}/${requiredCount}`}
            </span>
        )}
      </div>

      {!hideUpload && (
        <label className={`relative flex flex-col items-center justify-center w-full min-h-[100px] border-2 border-dashed rounded-xl cursor-pointer transition-all ${uploading ? 'bg-gray-50 border-gray-300 cursor-wait' : 'bg-brand-purple/5 border-brand-purple/30 hover:bg-brand-purple/10'}`}>
          <div className="flex flex-col items-center justify-center p-4 w-full text-center">
            {uploading ? (
              <div className="w-full max-w-[200px] mx-auto">
                  <div className="w-8 h-8 border-3 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-[10px] font-bold text-brand-purple mb-2 tracking-wide">Ukládám... {progress}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden shadow-inner">
                      <div className="bg-gradient-to-r from-brand-purple to-brand-pink h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                  </div>
              </div>
            ) : (
              <>
                <svg className="w-8 h-8 mb-2 text-brand-purple/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mb-1 text-[13px] text-gray-800 font-bold">Přidat další fotky</p>
                <p className="text-[9px] text-black uppercase font-light tracking-[0.1em]">Klikněte nebo přetáhněte</p>
              </>
            )}
          </div>
          <input type="file" className="hidden" multiple accept="image/*" onChange={handleFileChange} disabled={uploading} />
        </label>
      )}

      {internalPhotos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {internalPhotos.map((photo, i) => (
            <div key={i} className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="aspect-square relative overflow-hidden">
                <img src={photo.url} alt="" className="w-full h-full object-cover" />
                <button 
                  onClick={() => removePhoto(i)}
                  className="absolute top-2 right-2 bg-white/90 backdrop-blur text-brand-pink hover:bg-brand-pink hover:text-white p-1.5 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {isMagnet && (
                <div className="p-3 bg-gray-50/50 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Kusů:</span>
                    <span className="text-xs font-black text-brand-purple">{photo.quantity || 1}x</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => updatePhotoQuantity(i, (photo.quantity || 1) - 1)}
                      className="flex-1 bg-white border border-gray-200 py-1 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <button 
                      onClick={() => updatePhotoQuantity(i, (photo.quantity || 1) + 1)}
                      className="flex-1 bg-white border border-gray-200 py-1 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {currentEditImage && (
        <PhotoEditorModal
          image={currentEditImage}
          aspect={aspect}
          sizeLabel={sizeLabel}
          onConfirm={handleEditorConfirm}
          onCancel={handleEditorCancel}
        />
      )}
    </div>
  );
};

export default FileUpload;
