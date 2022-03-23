import "./App.css";
import ChatUI from "./components/chat-ui/chat-ui";
import ChatBox from "./components/talkjs/chat-box";
import UserLogin from "./components/users/userLogin";
import LoginComponent from "./components/users/signInWithGoogle";
function App() {
  return (
    <div className="App">
      {/* <ChatBox /> */}
      <LoginComponent />
    </div>
  );
}

export default App;
