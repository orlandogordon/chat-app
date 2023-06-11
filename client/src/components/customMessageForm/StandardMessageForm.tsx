import { useState } from "react";
import MessageFormUI from "./MessageFormUI";

type StandardMessageFormProps = {
  props: any;
  activeChat: any;
};

const StandardMessageForm = ({
  props,
  activeChat,
}: StandardMessageFormProps) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<any>("");

  const handleChange = (e: any) => setMessage(e.target.value);
  const handleSubmit = async () => {
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
    const form = {
      attachments: at,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };

    props.onSubmit(form);
    setMessage("");
    setAttachment("");
  };

  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default StandardMessageForm;
