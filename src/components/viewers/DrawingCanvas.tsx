import React, { useRef, useEffect, useState } from 'react';
import { CursorArrowRaysIcon, PencilIcon, BackspaceIcon } from '@heroicons/react/24/outline';

interface DrawingCanvasProps {
  width: number;
  height: number;
  imageData: ImageData;
  onDrawingComplete: (canvas: HTMLCanvasElement) => void;
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  width,
  height,
  imageData,
  onDrawingComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser' | 'cursor'>('pen');
  const [color, setColor] = useState('#FF0000');
  const [size, setSize] = useState(5);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    canvas.width = width;
    canvas.height = height;

    ctx.putImageData(imageData, 0, 0);
  }, [width, height, imageData]);

  const getMousePos = (e: MouseEvent | React.MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent | TouchEvent) => {
    if (tool === 'cursor') return;
    setIsDrawing(true);
    lastPos.current = getMousePos(e);
  };

  const draw = (e: React.MouseEvent | TouchEvent) => {
    if (!isDrawing || tool === 'cursor') return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const currentPos = getMousePos(e);
    if (!currentPos || !lastPos.current) return;

    ctx.beginPath();
    ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
    
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();

    lastPos.current = currentPos;
    onDrawingComplete(canvas);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPos.current = null;
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4 items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => setTool('cursor')}
            className={`p-2 rounded ${
              tool === 'cursor' ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
            title="Select"
          >
            <CursorArrowRaysIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => setTool('pen')}
            className={`p-2 rounded ${
              tool === 'pen' ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
            title="Draw"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => setTool('eraser')}
            className={`p-2 rounded ${
              tool === 'eraser' ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
            title="Eraser"
          >
            <BackspaceIcon className="h-5 w-5" />
          </button>
        </div>

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer"
          title="Color"
          disabled={tool === 'eraser'}
        />

        <input
          type="range"
          min="1"
          max="50"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-32"
          title="Brush size"
        />
      </div>

      <canvas
        ref={canvasRef}
        className="max-w-full cursor-crosshair touch-none border border-gray-200 rounded-lg"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchEnd={stopDrawing}
      />
    </div>
  );
};