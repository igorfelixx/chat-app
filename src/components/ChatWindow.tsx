import React from 'react';
import { useChatStore } from '../store/chatStore';
import { Message } from './Message';
import { ChatHeader } from './ChatHeader';
import { MessageInput } from './MessageInput';

export const ChatWindow: React.FC = () => {
  const { currentChat, currentUser, sendMessage, startDirectMessage } = useChatStore();

  const handleSendMessage = (content: string, files: File[]) => {
    if (content.trim()) {
      sendMessage({
        senderId: currentUser.id,
        content,
        type: 'text',
      });
    }

    files.forEach(file => {
      const type = file.type.startsWith('image/') ? 'image' : 'file';
      const fileUrl = URL.createObjectURL(file);
      
      sendMessage({
        senderId: currentUser.id,
        content: '',
        type,
        fileUrl,
        fileName: file.name,
        fileSize: file.size,
      });
    });
  };

  const handleAudioCall = () => {
    alert('Iniciando chamada de voz... (mock)');
  };

  const handleVideoCall = () => {
    alert('Iniciando chamada de video... (mock)');
  };

  if (!currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Selecione um chat para começar a conversar</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <ChatHeader
        chat={currentChat}
        currentUser={currentUser}
        onAudioCall={handleAudioCall}
        onVideoCall={handleVideoCall}
        onStartDirectMessage={startDirectMessage}
      />

      <div className="flex-1 overflow-y-auto p-4">
        {currentChat.messages.map((message) => (
          <Message
            avatar={currentChat.participants.find(p => p.id === message.senderId)?.avatar || ''}
            name={currentChat.participants.find(p => p.id === message.senderId)?.name || ''}
            key={message.id}
            message={message}
            isOwn={message.senderId === currentUser.id}
            isGroup={currentChat.isGroup}
          />
        ))}
      </div>

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};