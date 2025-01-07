import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, fn } from '@storybook/test';
import { ImageViewer } from '../../components/viewers/ImageViewer';

const meta = {
  title: 'Components/Viewers/ImageViewer',
  component: ImageViewer,
} satisfies Meta<typeof ImageViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageUrl: 'https://picsum.photos/800/600',
    isOpen: true,
    onClose: fn(),
    onDownload: fn(),
    onSendEdited: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    const downloadButton = canvas.getByText('Baixar');
    await userEvent.click(downloadButton);
    await expect(args.onDownload).toHaveBeenCalled();

    const editButton = canvas.getByText('Editar');
    await userEvent.click(editButton);
    await expect(canvas.getByText('Filtros')).toBeInTheDocument();
  },
};