import React from 'react';
import { XMarkIcon, ArrowDownTrayIcon, DocumentIcon } from '@heroicons/react/24/outline';
import { Modal } from '../common/Modal';
import { formatFileSize } from '../../utils/fileUtils';

interface FileViewerProps {
  fileUrl: string;
  fileName: string;
  fileSize?: number;
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export const FileViewer: React.FC<FileViewerProps> = ({
  fileUrl,
  fileName,
  fileSize,
  isOpen,
  onClose,
  onDownload,
}) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onDownload();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Visualização do arquivo</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                <DocumentIcon className="h-12 w-12 text-gray-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium">{fileName}</h4>
                {fileSize && (
                  <p className="text-sm text-gray-500">{formatFileSize(fileSize)}</p>
                )}
              </div>
            </div>
            
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
              <span>Baixar</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};