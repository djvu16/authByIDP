import React from "react";
import "react-chat-elements/dist/main.css";
import { MessageBox } from "react-chat-elements";
import { ChatItem } from "react-chat-elements";
const ChatUI = (props) => {
  return (
    <ChatItem
      avatar={"https://facebook.github.io/react/img/logo.svg"}
      alt={"Reactjs"}
      title={"Facebook"}
      subtitle={"What are you doing?"}
      date={new Date()}
      unread={0}
    />
  );
};

export default ChatUI;
