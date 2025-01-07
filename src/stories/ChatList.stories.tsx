import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { ChatList } from "../components/ChatList";
import { mockChats } from "../data/mockData";

const meta = {
  title: "Components/ChatList",
  component: ChatList,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ChatList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const createGroup = canvas.getByText("Criar Grupo");
    await userEvent.click(createGroup);

    const cancelButton = canvas.getByText("Cancelar");
    await userEvent.click(cancelButton);

    const users = mockChats.map((chat) =>
      chat.isGroup ? chat.name : chat.participants[1].name
    );

    users.forEach(async (user) => {
      if (user) {
        const userElement = canvas.getByText(user);
        await userEvent.click(userElement);
      }
    });
  },
};
