import React, { useRef, useEffect, useState } from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { DrawingCanvas } from './DrawingCanvas';

interface ImageEditorProps {
  imageUrl: string;
  onSave: (editedImage: File) => void;
  onCancel: () => void;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({
  imageUrl,
  onSave,
  onCancel,
}) => {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [mode, setMode] = useState<'filters' | 'draw'>('filters');
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.crossOrigin = 'anonymous';
    
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      
      ctx.drawImage(image, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setImageData(imgData);
      
      applyFilters(ctx, image);
    };

    image.src = imageUrl;
  }, [imageUrl]);

  const applyFilters = (ctx: CanvasRenderingContext2D, image: HTMLImageElement) => {
    if (!ctx || !image) return;

    ctx.filter = 'none';
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
    ctx.drawImage(image, 0, 0);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || mode !== 'filters') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => applyFilters(ctx, image);
    image.src = imageUrl;
  }, [brightness, contrast, saturation, mode]);

  const handleDrawingComplete = (drawingCanvas: HTMLCanvasElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(drawingCanvas, 0, 0);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'edited-image.jpg', { type: 'image/jpeg' });
        onSave(file);
      }
    }, 'image/jpeg', 0.9); // 0.9 para uma qualidade melhor
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-2 border-b pb-2">
        <button
          onClick={() => setMode('filters')}
          className={`px-4 py-2 rounded-lg ${
            mode === 'filters'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Filtros
        </button>
        <button
          onClick={() => setMode('draw')}
          className={`px-4 py-2 rounded-lg ${
            mode === 'draw'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Desenho
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {mode === 'filters' ? (
          <>
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-[50vh] mx-auto"
            />
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brilho: {brightness}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraste: {contrast}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Saturação: {saturation}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={saturation}
                  onChange={(e) => setSaturation(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </>
        ) : (
          imageData && (
            <DrawingCanvas
              width={canvasRef.current?.width || 0}
              height={canvasRef.current?.height || 0}
              imageData={imageData}
              onDrawingComplete={handleDrawingComplete}
            />
          )
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center space-x-1"
        >
          <XMarkIcon className="h-5 w-5" />
          <span>Cancelar</span>
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-1"
        >
          <CheckIcon className="h-5 w-5" />
          <span>Salvar</span>
        </button>
      </div>
    </div>
  );
};