import React from 'react';
import { Chat, User } from '../types/chat';
import { UserAvatar } from './UserAvatar';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { GroupMemberList } from './GroupMemberList';

interface ChatInfoProps {
  chat: Chat;
  currentUser: User;
  onClose: () => void;
  onStartDirectMessage: (user: User) => void;
}

export const ChatInfo: React.FC<ChatInfoProps> = ({
  chat,
  currentUser,
  onClose,
  onStartDirectMessage,
}) => {
  const isGroup = chat.isGroup;
  const otherParticipant = !isGroup 
    ? chat.participants.find(p => p.id !== currentUser.id)
    : null;

  return (
    <div className="h-full w-full bg-white flex flex-col">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {isGroup ? 'Sobre o grupo' : 'Sobre o contato'}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col items-center mb-6">
          {isGroup ? (
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-32 h-32 rounded-full mb-4"
            />
          ) : (
            <UserAvatar user={otherParticipant!} size="lg" />
          )}
          <h3 className="text-xl font-semibold">
            {isGroup ? chat.name : otherParticipant?.name}
          </h3>
          {!isGroup && otherParticipant && (
            <p className="text-gray-500 mt-1">
              {otherParticipant.status === 'online'
                ? 'Online'
                : `Visto por ultimo ${format(otherParticipant.lastSeen!, 'HH:mm')}`}
            </p>
          )}
        </div>

        {isGroup && (
          <>
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">Sobre</h4>
              <p className="text-gray-600">
                Criado por {chat.participants.find(p => p.id === chat.createdBy)?.name}
              </p>
            </div>
            <GroupMemberList
              participants={chat.participants}
              currentUser={currentUser}
              onStartDirectMessage={onStartDirectMessage}
            />
          </>
        )}
      </div>
    </div>
  );
};