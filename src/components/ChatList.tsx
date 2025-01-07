import React, { useState } from 'react';
import { useChatStore } from '../store/chatStore';
import { format } from 'date-fns';
import { UserAvatar } from './UserAvatar';
import { CreateGroupModal } from './CreateGroupModal';
import { UserGroupIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Chat, User } from '../types/chat';
import { mockUsers } from '../data/mockData';

export const ChatList: React.FC = () => {
  const { chats, setCurrentChat, currentChat, currentUser, createGroup } = useChatStore();
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);

  const handleCreateGroup = (name: string, participants: User[]) => {
    createGroup(name, participants);
  };

  const getChatName = (chat: Chat) => {
    if (chat.isGroup) return chat.name;
    const otherParticipant = chat.participants.find(p => p.id !== currentUser.id);
    return otherParticipant?.name;
  };

  const getChatAvatar = (chat: Chat) => {
    if (chat.isGroup) return chat.avatar;
    const otherParticipant = chat.participants.find(p => p.id !== currentUser.id);
    return otherParticipant?.avatar;
  };

  return (
    <div className="w-1/3 border-r border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={() => setIsCreateGroupModalOpen(true)}
          className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          <UserGroupIcon className="h-5 w-5" />
          <PlusIcon className="h-4 w-4" />
          <span>Criar Grupo</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
              currentChat?.id === chat.id ? 'bg-gray-100' : ''
            }`}
            onClick={() => setCurrentChat(chat)}
          >
            <div className="flex items-center">
              {chat.isGroup ? (
                <div className="relative">
                  <img
                    src={getChatAvatar(chat)}
                    alt={getChatName(chat)}
                    className="w-12 h-12 rounded-full"
                  />
                  <UserGroupIcon className="h-4 w-4 absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-0.5" />
                </div>
              ) : (
                <UserAvatar
                  user={chat.participants.find(p => p.id !== currentUser.id)!}
                  size="lg"
                />
              )}
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{getChatName(chat)}</h3>
                  {chat.lastMessage && (
                    <span className="text-sm text-gray-500">
                      {format(chat.lastMessage.timestamp, 'HH:mm')}
                    </span>
                  )}
                </div>
                {chat.lastMessage && (
                  <p className="text-sm text-gray-500 truncate">
                    {chat.isGroup && (
                      <span className="font-medium">
                        {chat.participants.find(p => p.id === chat.lastMessage?.senderId)?.name}:{' '}
                      </span>
                    )}
                    {chat.lastMessage.type === 'text'
                      ? chat.lastMessage.content
                      : `${chat.lastMessage.type} message`}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <CreateGroupModal
        isOpen={isCreateGroupModalOpen}
        onClose={() => setIsCreateGroupModalOpen(false)}
        onCreateGroup={handleCreateGroup}
        availableUsers={mockUsers}
        currentUser={currentUser}
      />
    </div>
  );
};