# Chat App

A modern and interactive chat application built with **TypeScript**, **Tailwind CSS**, and **Vite**. The app leverages **[Storybook](https://chat-app-pxmb.vercel.app/)** for unit testing and offers a rich set of features, including sending, downloading, and editing images, as well as file sharing.

## Features

- **Chat Functionality**:
  - Send and receive messages.
  - Share images and files.
  - Edit and download images.

- **Group Management**:
  - Create groups.
  - View group members.

- **Data Management**:
  - Mock data for testing, stored in `data/mockData.ts`.

- **State Management**:
  - Utilizes **Zustand** for efficient chat state management.

- **Testing**:
  - **[Storybook](https://chat-app-pxmb.vercel.app/)** is used for component-level unit tests.

## Tech Stack

- **TypeScript**: Provides static typing for safer and more reliable code.
- **Tailwind CSS**: For fast and efficient UI styling.
- **Vite**: Ensures a lightning-fast development experience.
- **[Storybook](https://chat-app-pxmb.vercel.app/)**: Allows for isolated testing and documentation of UI components.
- **Zustand**: Lightweight state management solution.

## Folder Structure

```plaintext
src/
│
├── components/       # All reusable React components
├── data/
│   └── mockData.ts   # Mocked data for testing
├── store/            # Zustand chat store
├── index.css           # Tailwind CSS configurations and custom styles
├── stories/            # Storybook stories and unit tests
└── utils/            # Utility functions and helpers
```

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/chat-app.git
   cd chat-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open the app in your browser at `http://localhost:3000`.

### Running Tests

To run unit tests with [Storybook](https://chat-app-pxmb.vercel.app/):

```bash
npm run storybook
# or
yarn storybook
```

### Building for Production

To build the app for production:

```bash
npm run build
# or
yarn build
```

The built files will be available in the `dist/` directory.

## Future Enhancements

- Integration with a backend API.
- Real-time messaging using WebSockets.
- Enhanced group management features.

## Contributing

Contributions are welcome! Feel free to fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

Happy coding! 🚀