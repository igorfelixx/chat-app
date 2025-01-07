import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within, fn } from "@storybook/test";
import { MessageInput } from "../components/MessageInput";

const meta = {
  title: "Components/MessageInput",
  component: MessageInput,
} satisfies Meta<typeof MessageInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSendMessage: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByPlaceholderText("Escreva uma mensagem...");
    await userEvent.type(input, "Hello, World!");
    expect(input).toHaveValue("Hello, World!");

    const sendButton = canvas.getByText("Enviar");
    await userEvent.click(sendButton);
    expect(args.onSendMessage).toHaveBeenCalled();

    const imageButton = canvas.getByTitle(/image/i);
    const fileButton = canvas.getByTitle(/file/i);
    expect(imageButton).toBeInTheDocument();
    expect(fileButton).toBeInTheDocument();
  },
};
