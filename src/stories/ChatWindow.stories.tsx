import type { Meta, StoryObj } from "@storybook/react";
import { ChatWindow } from "../components/ChatWindow";
import { expect, userEvent, within } from "@storybook/test";
import { useChatStore } from "../store/chatStore";

const meta = {
  title: "Components/ChatWindow",
  component: ChatWindow,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ChatWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    if (useChatStore.getState().currentChat) {
      const canvas = within(canvasElement);

      const input = canvas.getByPlaceholderText("Escreva uma mensagem...");
      await userEvent.type(input, "Hello, World!");
      await userEvent.click(canvas.getByText("Enviar"));

      const messages = canvas.getAllByText("Hello, World!");

      messages.forEach(async (message) => {
        await expect(message).toBeInTheDocument();
      });
    }
  },
};