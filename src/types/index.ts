export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastSeen?: Date;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'video';
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
}

export interface Chat {
  id: string;
  participants: User[];
  messages: Message[];
  unreadCount: number;
  lastMessage?: Message;
}

export interface FilePreview {
  id: string;
  type: 'image' | 'file';
  name: string;
  url: string;
  file: File;
}