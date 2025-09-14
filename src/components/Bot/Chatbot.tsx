import { useState } from 'react';
import { 
  MainContainer, 
  ChatContainer, 
  MessageList, 
  Message as ChatMessage, 
  MessageInput, 
  TypingIndicator,
  type MessageModel
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

interface ChatMessageModel extends MessageModel {
  message: string;
  sender: string;
  direction: 'incoming' | 'outgoing';
  position: 'single' | 'first' | 'normal' | 'last' | 0 | 1 | 2 | 3;
}

const Chatbot = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessageModel[]>([
    {
      message: "Hello, I'm your AI Health Coach! How can I help you today?",
      sender: "ChatGPT",
      direction: 'incoming',
      position: 'single'
    }
  ]);

  const handleSend = async (message: string) => {
    const newMessage: ChatMessageModel = {
      message,
      sender: "user",
      direction: 'outgoing',
      position: 'single'
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);

    // Process message with ChatGPT
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages: ChatMessageModel[]) {
    // Format messages for API
    const apiMessages = chatMessages.map((messageObject: ChatMessageModel) => {
      const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role, content: messageObject.message };
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
        direction: 'incoming',
        position: 'single'
      }]);
      setIsTyping(false);
    });
  }

  return (
    <div style={{ height: "500px", width: "400px" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList typingIndicator={isTyping ? <TypingIndicator content="AI Health Coach is typing" /> : null}>
            {messages.map((message, i) => (
              <ChatMessage
                key={i}
                model={{
                  message: message.message,
                  sentTime: 'just now',
                  sender: message.sender,
                  direction: message.direction,
                  position: message.position,
                }}
              />
            ))}
          </MessageList>
          <MessageInput 
            placeholder="Type message here" 
            onSend={handleSend}
            attachButton={false}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  )
}

export default Chatbot;