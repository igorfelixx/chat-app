import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, fn} from '@storybook/test';
import { ChatHeader } from '../components/ChatHeader';
import { mockChats, mockUsers } from '../data/mockData';

const meta = {
  title: 'Components/ChatHeader',
  component: ChatHeader,
} satisfies Meta<typeof ChatHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DirectChat: Story = {
  args: {
    chat: mockChats[0],
    currentUser: mockUsers[0],
    onAudioCall: fn(),
    onVideoCall: fn(),
    onStartDirectMessage: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    const audioButton = canvas.getByTitle('Chamada de voz');
    await userEvent.click(audioButton);
    await expect(args.onAudioCall).toHaveBeenCalled();

    const videoButton = canvas.getByTitle('Chamada de video');
    await userEvent.click(videoButton);
    await expect(args.onVideoCall).toHaveBeenCalled();

    const infoButton = canvas.getByTitle('Sobre');
    await userEvent.click(infoButton);

    const infoContact = canvas.getByText('Sobre o contato');
    await expect(infoContact).toBeInTheDocument();
  },
};