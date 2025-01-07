import React from 'react';
import { User } from '../types/chat';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = 'md',
  showStatus = true,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const statusClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
  };

  return (
    <div className="relative">
      <img
        src={user.avatar}
        alt={user.name}
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
      {showStatus && (
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
            statusClasses[user.status]
          }`}
        />
      )}
    </div>
  );
};