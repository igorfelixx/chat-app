import { create } from 'zustand';
import { Chat, Message, User } from '../types/chat';
import { mockChats, mockUsers } from '../data/mockData';

interface ChatStore {
  chats: Chat[];
  currentChat: Chat | null;
  currentUser: User;
  setCurrentChat: (chat: Chat) => void;
  sendMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  createGroup: (name: string, participants: User[]) => void;
  startDirectMessage: (user: User) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: mockChats,
  currentChat: null,
  currentUser: mockUsers[0],
  setCurrentChat: (chat) => set({ currentChat: chat }),
  sendMessage: (message) => {
    set((state) => {
      if (!state.currentChat) return state;

      const newMessage: Message = {
        ...message,
        id: Math.random().toString(),
        timestamp: new Date(),
      };

      const updatedChat = {
        ...state.currentChat,
        messages: [...state.currentChat.messages, newMessage],
        lastMessage: newMessage,
      };

      const updatedChats = state.chats.map((chat) =>
        chat.id === updatedChat.id ? updatedChat : chat
      );

      return {
        ...state,
        chats: updatedChats,
        currentChat: updatedChat,
      };
    });
  },
  createGroup: (name, participants) => {
    set((state) => {
      const newGroup: Chat = {
        id: Math.random().toString(),
        name,
        isGroup: true,
        participants,
        messages: [],
        unreadCount: 0,
        createdBy: state.currentUser.id,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      };

      return {
        ...state,
        chats: [...state.chats, newGroup],
        currentChat: newGroup,
      };
    });
  },
  startDirectMessage: (user) => {
    const { chats, currentUser, setCurrentChat } = get();
    
    const existingChat = chats.find(
      chat => !chat.isGroup && chat.participants.some(p => p.id === user.id)
    );

    if (existingChat) {
      setCurrentChat(existingChat);
      return;
    }

    const newChat: Chat = {
      id: Math.random().toString(),
      isGroup: false,
      participants: [currentUser, user],
      messages: [],
      unreadCount: 0,
    };

    set((state) => ({
      chats: [...state.chats, newChat],
  
      currentChat: newChat,
    }));
  },
}));