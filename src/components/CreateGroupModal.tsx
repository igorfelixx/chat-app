import { useState } from "react";
import { User } from "../types/chat";
import { Modal } from "./common/Modal";
import { UserAvatar } from "./UserAvatar";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (name: string, participants: User[]) => void;
  availableUsers: User[];
  currentUser: User;
}

export function CreateGroupModal({
  isOpen,
  onClose,
  onCreateGroup,
  availableUsers,
  currentUser,
}: CreateGroupModalProps) {
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (groupName.trim() && selectedUsers.length > 0) {
      const participants = selectedUsers.includes(currentUser)
        ? selectedUsers
        : [...selectedUsers, currentUser];
      onCreateGroup(groupName, participants);
      setGroupName("");
      setSelectedUsers([]);
      onClose();
    }
  };

  const toggleUser = (user: User) => {
    if (user.id === currentUser.id) return;

    setSelectedUsers((prev) =>
      prev.find((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user]
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Criar novo grupo</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do grupo
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Insira o nome do grupo"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Selecionar membros ({selectedUsers.length} Selecionados)
              </label>
              <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
                {availableUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => toggleUser(user)}
                    className={` flex items-center p-2 hover:opacity-90 cursor-pointer ${
                      selectedUsers.find((u) => u.id === user.id)
                        ? "bg-blue-500"
                        : ""
                    } ${
                      user.id === currentUser.id
                        ? "opacity-50 cursor-not-allowed "
                        : ""
                    }`}
                  >
                    <UserAvatar user={user} size="sm" />
                    <span className="ml-2">{user.name}</span>
                    {user.id === currentUser.id && (
                      <span className="ml-2 text-sm text-gray-500">(Você)</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!groupName.trim() || selectedUsers.length === 0}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Criar grupo
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
