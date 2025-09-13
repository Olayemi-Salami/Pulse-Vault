import { useState } from 'react';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

const Chatbot = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm your AI Health Coach! How can I help you today?",
      sender: "ChatGPT",
      direction: 'incoming'
    }
  ]);

  const handleSend = async (message:any) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: 'outgoing'
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);

    // Process message with ChatGPT
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages:any) {
    // Format messages for API
    let apiMessages = chatMessages.map((messageObject:any) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: "system",
      content: "Explain things like you're a friendly and helpful health coach."
    };

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + import.meta.env.VITE_OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT",
        direction: 'incoming'
      }]);
      setIsTyping(false);
    });
  }

  return (
    <div style={{ height: "500px", width: "400px" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList typingIndicator={isTyping ? <TypingIndicator content="AI Health Coach is typing" /> : null}>
            {messages.map((message, i) => {
              return <Message key={i} model={message} />
            })}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  )
}

export default Chatbot;