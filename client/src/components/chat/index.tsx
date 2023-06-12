import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
  ChatHeaderProps,
  MessageFormProps,
} from "react-chat-engine-advanced";
import Header from "../customHeader";
import StandardMessageForm from "../customMessageForm/StandardMessageForm";
import Ai from "../customMessageForm/Ai";

type ChatProps = {
  user: any;
  secret: any;
};

const Chat = ({ user, secret }: ChatProps) => {
  const chatProps = useMultiChatLogic(
    process.env.REACT_APP_PROJECT_ID,
    user,
    secret
  );
  return (
    <div style={{ flexBasis: "100%" }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }}
        renderChatHeader={(chat: ChatHeaderProps) => <Header chat={chat} />}
        renderMessageForm={(props: MessageFormProps) => {
          if (chatProps.chat?.title.startsWith("AiChat_")) {
            return <Ai props={props} activeChat={chatProps.chat} />;
          }
          return (
            <StandardMessageForm props={props} activeChat={chatProps.chat} />
          );
        }}
      />
    </div>
  );
};

export default Chat;
