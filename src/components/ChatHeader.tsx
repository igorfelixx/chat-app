import React, { useState } from 'react';
import { PhoneIcon, VideoCameraIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { Chat, User } from '../types/chat';
import { format } from 'date-fns';
import { ChatInfo } from './ChatInfo';

interface ChatHeaderProps {
  chat: Chat;
  currentUser: User;
  onAudioCall: () => void;
  onVideoCall: () => void;
  onStartDirectMessage: (user: User) => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  chat,
  currentUser,
  onAudioCall,
  onVideoCall,
  onStartDirectMessage,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const otherParticipant = !chat.isGroup
    ? chat.participants.find((p) => p.id !== currentUser.id)
    : null;

  return (
    <>
      <div className="p-4 border-b border-gray-200 flex items-center">
        <div className="flex-1 cursor-pointer" onClick={() => setShowInfo(true)}>
          {chat.isGroup ? (
            <div className="flex items-center">
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-4">
                <h3 className="font-semibold">{chat.name}</h3>
                <p className="text-sm text-gray-500">
                  {chat.participants.length} membros
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <img
                src={otherParticipant?.avatar}
                alt={otherParticipant?.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-4">
                <h3 className="font-semibold">{otherParticipant?.name}</h3>
                <p className="text-sm text-gray-500">
                  {otherParticipant?.status === 'online'
                    ? 'Online'
                    : `Visto por ultimo ${format(otherParticipant?.lastSeen!, 'HH:mm')}`}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={onAudioCall}
            title="Chamada de voz"
          >
            <PhoneIcon className="h-6 w-6" />
          </button>
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={onVideoCall}
            title="Chamada de video"
          >
            <VideoCameraIcon className="h-6 w-6" />
          </button>
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setShowInfo(true)}
            title="Sobre"
          >
            <InformationCircleIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {showInfo && (
        <div className="absolute right-0 top-0 h-full w-1/3 border-l border-gray-200 bg-white shadow-lg">
          <ChatInfo
            chat={chat}
            currentUser={currentUser}
            onClose={() => setShowInfo(false)}
            onStartDirectMessage={onStartDirectMessage}
          />
        </div>
      )}
    </>
  );
};