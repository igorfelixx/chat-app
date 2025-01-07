import React, { useState } from "react";
import { Message as MessageType } from "../types";
import { format } from "date-fns";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import { ImageViewer } from "./viewers/ImageViewer";
import { FileViewer } from "./viewers/FileViewer";
import { useChatStore } from "../store/chatStore";

interface MessageProps {
  name: string;
  message: MessageType;
  isOwn: boolean;
  avatar: string;
  isGroup: boolean;
}

export const Message: React.FC<MessageProps> = ({
  avatar,
  name,
  message,
  isOwn,
  isGroup,
}) => {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [isFileViewerOpen, setIsFileViewerOpen] = useState(false);
  const { sendMessage } = useChatStore();

  const handleEditedImageSend = (editedImage: File) => {
    const fileUrl = URL.createObjectURL(editedImage);

    sendMessage({
      senderId: message.senderId,
      content: "Image Edited",
      type: "image",
      fileUrl,
      fileName: editedImage.name,
      fileSize: editedImage.size,
    });
  };

  return (
    <>
      {isGroup && !isOwn && (
        <div
          className={`flex items-center ${
            isOwn ? "justify-end" : "justify-start"
          } pr-4 ml-4 `}
        >
          <img
            src={avatar}
            alt="Avatar"
            className="w-8 h-8 rounded-full"
            style={{ marginRight: 15 }}
          />
          {name}
        </div>
      )}

      <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}>
        <div
          className={`max-w-[70%] rounded-lg p-3 ${
            isOwn ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          {message.type === "text" && <p>{message.content}</p>}
          {message.type === "image" && (
            <img
              src={message.fileUrl}
              alt="Shared image"
              className="rounded-lg max-w-full cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setIsImageViewerOpen(true)}
            />
          )}
          {message.type === "file" && (
            <div
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setIsFileViewerOpen(true)}
            >
              <PaperClipIcon className="h-5 w-5" />
              <span>{message.fileName}</span>
            </div>
          )}
          <div className="text-xs mt-1 text-right">
            {format(message.timestamp, "HH:mm")}
          </div>
        </div>
      </div>

      {message.type === "image" && message.fileUrl && (
        <ImageViewer
          imageUrl={message.fileUrl}
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
          onDownload={() => console.log("Image downloaded")}
          onSendEdited={handleEditedImageSend}
        />
      )}

      {message.type === "file" && message.fileUrl && (
        <FileViewer
          fileUrl={message.fileUrl}
          fileName={message.fileName || "file"}
          fileSize={message.fileSize}
          isOpen={isFileViewerOpen}
          onClose={() => setIsFileViewerOpen(false)}
          onDownload={() => console.log("File downloaded")}
        />
      )}
    </>
  );
};
