import React from 'react';
import { User } from '../types/chat';
import { UserAvatar } from './UserAvatar';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

interface GroupMemberListProps {
  participants: User[];
  currentUser: User;
  onStartDirectMessage: (user: User) => void;
}

export const GroupMemberList: React.FC<GroupMemberListProps> = ({
  participants,
  currentUser,
  onStartDirectMessage,
}) => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">
        {participants.length} Membros
      </h4>
      <div className="space-y-2">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
          >
            <div className="flex items-center">
              <UserAvatar user={participant} size="md" />
              <div className="ml-3">
                <p className="font-medium">
                  {participant.name}
                  {participant.id === currentUser.id && ' (Você)'}
                </p>
                <p className="text-sm text-gray-500">
                  {participant.status === 'online'
                    ? 'Online'
                    : `Visto por ultimo ${format(participant.lastSeen!, 'HH:mm')}`}
                </p>
              </div>
            </div>
            {participant.id !== currentUser.id && (
              <button
                onClick={() => onStartDirectMessage(participant)}
                className="p-2 hover:bg-gray-100 rounded-full"
                title="Enviar mensagem"
              >
                <ChatBubbleLeftIcon className="h-5 w-5 text-gray-600" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};