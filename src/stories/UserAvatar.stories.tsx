import type { Meta, StoryObj } from '@storybook/react';
import { UserAvatar } from '../components/UserAvatar';
import { mockUsers } from '../data/mockData';

const meta = {
  title: 'Components/UserAvatar',
  component: UserAvatar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof UserAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    user: mockUsers[0],
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    user: mockUsers[0],
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    user: mockUsers[0],
    size: 'lg',
  },
};

export const Offline: Story = {
  args: {
    user: mockUsers[1],
    size: 'md',
  },
};