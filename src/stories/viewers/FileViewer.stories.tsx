import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, fn} from '@storybook/test';
import { FileViewer } from '../../components/viewers/FileViewer';

const meta = {
  title: 'Components/Viewers/FileViewer',
  component: FileViewer,
} satisfies Meta<typeof FileViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fileUrl: 'https://example.com/sample.pdf',
    fileName: 'sample.pdf',
    fileSize: 1024 * 1024,
    isOpen: true,
    onClose: fn(),
    onDownload: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    expect(canvas.getByText('sample.pdf')).toBeInTheDocument();
    expect(canvas.getByText('1 MB')).toBeInTheDocument();

    const downloadButton = canvas.getByText('Baixar');
    await userEvent.click(downloadButton);
    await expect(args.onDownload).toHaveBeenCalled();
  },
};