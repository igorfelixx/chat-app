import { FilePreview } from '../types';

export const createObjectURL = (file: File): string => {
  return URL.createObjectURL(file);
};

export const revokeObjectURL = (url: string) => {
  URL.revokeObjectURL(url);
};

export const handleFileSelection = (files: FileList, type: 'image' | 'file'): FilePreview[] => {
  return Array.from(files).map(file => ({
    id: Math.random().toString(),
    type,
    name: file.name,
    url: createObjectURL(file),
    file
  }));
};