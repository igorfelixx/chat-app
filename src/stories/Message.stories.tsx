import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Message } from '../components/Message';

const meta = {
  title: 'Components/Message',
  component: Message,
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextMessage: Story = {
  args: {
    name: 'John Doe',
    message: {
      id: '1',
      senderId: '1',
      content: 'Hello, how are you?',                               
      timestamp: new Date(),
      type: 'text',
    },
    isOwn: false,
    avatar: 'https://example.com/avatar.png',
    isGroup: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Hello, how are you?')).toBeInTheDocument();
  },
};

export const ImageMessage: Story = {
  args: {
    name: 'Felix Torres',
    message: {
      id: '2',
      senderId: '1',
      content: '',
      timestamp: new Date(),
      type: 'image',
      fileUrl: 'https://picsum.photos/400/300',
    },
    isOwn: false,
    avatar: 'https://example.com/avatar.png',
    isGroup: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    const image = canvas.getByRole('img');
    await userEvent.click(image);
    await expect(canvas.getByText('Editar')).toBeInTheDocument();
  },
};