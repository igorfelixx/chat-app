import { Chat, Message, User } from '../types/chat';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'online',
  },
  {
    id: '2',
    name: 'Junior Moraes',
    avatar: 'https://i.pravatar.cc/150?img=8',
    status: 'offline',
    lastSeen: new Date('2024-02-20T15:30:00'),
  },
  {
    id: '3',
    name: 'Felix Torres',
    avatar: 'https://i.pravatar.cc/150?img=7',
    status: 'online',
  },
  {
    id: '4',
    name: 'Cassio Ramos',
    avatar: 'https://i.pravatar.cc/150?img=4',
    status: 'offline',
    lastSeen: new Date('2024-02-20T16:45:00'),
  },
  {
    id: '5',
    name: 'Yuri Alberto',
    avatar: 'https://i.pravatar.cc/150?img=5',
    status: 'online',
  },
];

export const createMockMessages = (participants: User[]): Message[] => {
  const messages: Message[] = [];
  const now = new Date();

  participants.forEach((user, index) => {
    messages.push({
      id: `msg-${index + 1}`,
      senderId: user.id,
      content: `Olá a todos! Quem vos fala é ${user.name}`,
      timestamp: new Date(now.getTime() - (1000 * 60 * 60 * index)), 
      type: 'text',
    });
  });

  return messages;
};

export const mockChats: Chat[] = [
  // Chats individuais
  {
    id: '1',
    isGroup: false,
    participants: [mockUsers[0], mockUsers[1]],
    messages: createMockMessages([mockUsers[0], mockUsers[1]]),
    unreadCount: 2,
    lastMessage: createMockMessages([mockUsers[0], mockUsers[1]]).slice(-1)[0],
  },
  {
    id: '2',
    isGroup: false,
    participants: [mockUsers[0], mockUsers[2]],
    messages: createMockMessages([mockUsers[0], mockUsers[2]]),
    unreadCount: 0,
    lastMessage: createMockMessages([mockUsers[0], mockUsers[2]]).slice(-1)[0],
  },
  // Chats de grupos
  {
    id: '3',
    name: 'Time Projeto',
    isGroup: true,
    participants: [mockUsers[0], mockUsers[1], mockUsers[2]],
    messages: createMockMessages([mockUsers[0], mockUsers[1], mockUsers[2]]),
    unreadCount: 5,
    lastMessage: createMockMessages([mockUsers[0], mockUsers[1], mockUsers[2]]).slice(-1)[0],
    avatar: 'https://i.pravatar.cc/150?img=10',
    createdBy: mockUsers[0].id,
  },
  {
    id: '4',
    name: 'Grupo da Familia',
    isGroup: true,
    participants: [mockUsers[0], mockUsers[3], mockUsers[4]],
    messages: createMockMessages([mockUsers[0], mockUsers[3], mockUsers[4]]),
    unreadCount: 1,
    lastMessage: createMockMessages([mockUsers[0], mockUsers[3], mockUsers[4]]).slice(-1)[0],
    avatar: 'https://i.pravatar.cc/150?img=11',
    createdBy: mockUsers[0].id,
  },
];