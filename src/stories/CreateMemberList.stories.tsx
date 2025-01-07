import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, fn } from '@storybook/test';
import { GroupMemberList } from '../components/GroupMemberList';
import { mockUsers } from '../data/mockData';

const meta = {
  title: 'Components/GroupMemberList',
  component: GroupMemberList,
} satisfies Meta<typeof GroupMemberList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    participants: mockUsers,
    currentUser: mockUsers[0],
    onStartDirectMessage: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    mockUsers.forEach(user => {
      expect(canvas.getByText(
        user.name === args.currentUser.name ? user.name + ' (Você)' : user.name
      )).toBeInTheDocument();
    });

    const dmButton = canvas.getAllByTitle('Enviar mensagem')[0];
    await userEvent.click(dmButton);
    await expect(args.onStartDirectMessage).toHaveBeenCalled();
  },
};