import React, { useState, useRef } from 'react';
import { PaperClipIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { FilePreview } from '../types';
import { handleFileSelection, revokeObjectURL } from '../utils/fileHandlers';

interface MessageInputProps {
  onSendMessage: (content: string, files: File[]) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() && filePreviews.length === 0) return;

    const files = filePreviews.map(preview => preview.file);
    onSendMessage(newMessage, files);
    
    setNewMessage('');
    filePreviews.forEach(preview => revokeObjectURL(preview.url));
    setFilePreviews([]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'file') => {
    if (!e.target.files?.length) return;
    const newPreviews = handleFileSelection(e.target.files, type);
    setFilePreviews(prev => [...prev, ...newPreviews]);
    e.target.value = ''; 
  };

  const handleRemoveFile = (id: string) => {
    setFilePreviews(prev => {
      const fileToRemove = prev.find(p => p.id === id);
      if (fileToRemove) {
        revokeObjectURL(fileToRemove.url);
      }
      return prev.filter(p => p.id !== id);
    });
  };

  return (
    <div className="p-4 border-t border-gray-200">
      {filePreviews.length > 0 && (
        <div className="mb-4 p-2 bg-gray-50 rounded-lg space-y-2">
          {filePreviews.map((preview) => (
            <div key={preview.id} className="flex items-center justify-between bg-white p-2 rounded">
              <div className="flex items-center">
                {preview.type === 'image' ? (
                  <img src={preview.url} alt="Preview" className="w-16 h-16 object-cover rounded" />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                    <PaperClipIcon className="h-8 w-8 text-gray-500" />
                  </div>
                )}
                <span className="ml-2 text-sm truncate max-w-[200px]">{preview.name}</span>
              </div>
              <button
                onClick={() => handleRemoveFile(preview.id)}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}
      <form onSubmit={handleSend} className="flex items-center space-x-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFileSelect(e, 'file')}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
          title='file'
          multiple
        />
        <input
          type="file"
          ref={imageInputRef}
          onChange={(e) => handleFileSelect(e, 'image')}
          className="hidden"
          accept="image/*"
          title='image'
          multiple
        />
        <button
          type="button"
          className="p-2 hover:bg-gray-100 rounded-full"
          onClick={() => imageInputRef.current?.click()}
        >
          <PhotoIcon className="h-6 w-6" />
        </button>
        <button
          type="button"
          className="p-2 hover:bg-gray-100 rounded-full"
          onClick={() => fileInputRef.current?.click()}
        >
          <PaperClipIcon className="h-6 w-6" />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escreva uma mensagem..."
          className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};