import React, { useEffect } from "react";
import Talk from "talkjs";
const ChatBox = () => {
  let container;

  const user1 = {
    id: "2",
    name: "userName",
    email: "dy83421@gmail.com",
    photoUrl: `https://randomuser.me/api/portraits/men/2.jpg`,
    role: "default",
  };
  const user2 = {
    id: "1",
    name: "Prof. George Larry",
    email: "george@larry.net",
    photoUrl: "https://randomuser.me/api/portraits/men/83.jpg",
    role: "default",
  };
  Talk.ready
    .then(() => {
      const me = new Talk.User(user1);
      const other = new Talk.User(user2);
      if (!window.talkSession) {
        window.talkSession = new Talk.Session({
          appId: "tu3YP1lw",
          me: me,
        });
      }
      const conversation = window.talkSession.getOrCreateConversation(
        Talk.oneOnOneId(me, other)
      );
      conversation.setAttributes({
        subject: "Testing chat service",
      });
      conversation.setParticipant(me);
      conversation.setParticipant(other);
      const chatbox = window.talkSession.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(container);
    })
    .catch((e) => console.error(e));
  return (
    <div
      className="talk-js-chatbox flex-child"
      ref={(c) => (container = c)}
    ></div>
  );
};

export default ChatBox;
