import type { Meta, StoryObj } from '@storybook/react';
import { ChatWindow } from '../components/ChatWindow';
import { expect, userEvent, within } from "@storybook/test";

const meta = {
  title: 'Components/ChatWindow',
  component: ChatWindow,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ChatWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByPlaceholderText('Escreva uma mensagem...');
    await userEvent.type(input, 'Hello, World!');
    await userEvent.click(canvas.getByText('Enviar'));

    await expect(canvas.getByText('Hello, World!')).toBeInTheDocument();
  }
};