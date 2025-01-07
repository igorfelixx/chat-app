import type { Meta, StoryObj } from "@storybook/react";
import { ChatInfo } from "../components/ChatInfo";
import { mockChats, mockUsers } from "../data/mockData";
import { expect, userEvent, within, fn } from "@storybook/test";

const meta = {
  title: "Components/ChatInfo",
  component: ChatInfo,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ChatInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GroupChatInfo: Story = {
  args: {
    chat: mockChats[2],
    currentUser: mockUsers[0],
    onClose: () => alert("Close"),
    onStartDirectMessage: fn(),
  },
  play: async ({ canvasElement, args}) => {
    const canvas = within(canvasElement);

    const nameGroup = canvas.getByText("Time Projeto");
    await expect(nameGroup).toBeInTheDocument();

    const startDM = canvas.getAllByTitle("Enviar mensagem");
    startDM.forEach(async (button) => {
      await userEvent.click(button);
      await expect(args.onStartDirectMessage).toHaveBeenCalled()
    });
  },
};
