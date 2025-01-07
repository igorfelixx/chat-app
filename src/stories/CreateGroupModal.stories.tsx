import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within, fn } from "@storybook/test";
import { CreateGroupModal } from "../components/CreateGroupModal";
import { mockUsers } from "../data/mockData";

const meta = {
  title: "Components/CreateGroupModal",
  component: CreateGroupModal,
} satisfies Meta<typeof CreateGroupModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: fn(),
    onCreateGroup: fn(),
    availableUsers: mockUsers,
    currentUser: mockUsers[0],
  },
  play: async ({ canvasElement, args }) => {
    
    const canvas = within(canvasElement);

    const nameInput = canvas.getByPlaceholderText("Insira o nome do grupo");
    await userEvent.type(nameInput, "Test Group");
    expect(nameInput).toHaveValue("Test Group");

    const user1 = canvas.getByText("Junior Moraes");
    await userEvent.click(user1);

    const createButton = canvas.getByText("Criar grupo");
    await userEvent.click(createButton);

    await expect(args.onCreateGroup).toHaveBeenCalled();
  },
};