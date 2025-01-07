import { ChatList } from './components/ChatList';
import { ChatWindow } from './components/ChatWindow';

function App() {
  return (
    <div className="h-screen flex bg-white">
      <ChatList />
      <ChatWindow />
    </div>
  );
}

export default App;