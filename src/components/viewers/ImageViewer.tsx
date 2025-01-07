import React, { useState } from 'react';
import { XMarkIcon, ArrowDownTrayIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Modal } from '../common/Modal';
import { ImageEditor } from './ImageEditor';

interface ImageViewerProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  onSendEdited: (editedImage: File) => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  imageUrl,
  isOpen,
  onClose,
  onDownload,
  onSendEdited,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'image.jpg';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onDownload();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
                <span>Baixar</span>
              </button>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <PencilIcon className="h-5 w-5" />
                <span>Editar</span>
              </button>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex-1 overflow-auto p-4">
            {isEditing ? (
              <ImageEditor
                imageUrl={imageUrl}
                onSave={(editedImage) => {
                  onSendEdited(editedImage);
                  setIsEditing(false);
                  onClose();
                }}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <img
                src={imageUrl}
                alt="Full size"
                className="max-w-full max-h-[70vh] mx-auto object-contain"
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};