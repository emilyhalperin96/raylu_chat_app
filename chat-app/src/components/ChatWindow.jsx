import React, { useEffect, useState } from 'react';
import ConversationHistory from './ConversationHistory';
import ChatInput from './ChatInput'; 
import ChatMessage from './ChatMessage'; 
import { useLocation } from 'react-router-dom';

function ChatWindow() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [conversationHistory, setConversationHistory] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState('');
    const [lastSentMessage, setLastSentMessage] = useState('');
    const [chatbotResponse, setChatbotResponse] = useState('');
    const location = useLocation();
    const user = location.state ? location.state.user : null;
    const [repliedMessage, setRepliedMessage] = useState(null);

  // Load messages and conversation history from localStorage 
  useEffect(() => {
    const storedMessages = localStorage.getItem('messages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }

     // Load conversation history based on the user's identifier
    if (user) {
      const userConversationHistory = localStorage.getItem(`conversationHistory_${user.id}`);
      if (userConversationHistory) {
        setConversationHistory(JSON.parse(userConversationHistory));
      } else {
        // Clear conversation history for a new user
        setConversationHistory([]);
      }
    }
  }, [user]);

   // Save messages and conversation history to localStorage whenever they change
   useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));

    // Save conversation history based on the user's identifier
    if (user) {
      localStorage.setItem(`conversationHistory_${user.id}`, JSON.stringify(conversationHistory));
    }
  }, [messages, conversationHistory, user]);

  const handleReplyToMessage = (message) => {
    setRepliedMessage(message);
  };
  
  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    // Don't send empty messages
    if (newMessage.trim() === '') {
      return;
    }

    const userMessage = {
      text: newMessage,
      sender: 'user',
      repliedTo: repliedMessage,
    };

    // Create a new array with the previous messages and the new message
    const updatedMessages = [...messages, userMessage];

    // Update the messages state with the updated array
    setMessages(updatedMessages);
    setRepliedMessage(null);

    // Clear the input field
    setNewMessage('');

    // Store the last sent message
    setLastSentMessage(newMessage);

    // Send the message to the backend
    try {
      const response = await fetch('http://localhost:5000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: newMessage }),
      });
      if (response.ok) {
        
        const responseData = await response.json();
        const chatbotResponse = responseData.response;
        // Create a new chatbot message
        const chatbotMessage = {
          text: chatbotResponse,
          sender: 'ChatBot',
        };
        // Add the chatbot message to the messages state
        setMessages([...updatedMessages, chatbotMessage]);

        // Save the updated messages to localStorage
        localStorage.setItem('messages', JSON.stringify([...updatedMessages, chatbotMessage]));
      } else {
    
        console.error('Failed to send message to the backend');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const addChatToHistory = () => {
    const conversation = {
      conversationName: new Date().toLocaleString(),
      messages: messages,
    };
    setConversationHistory([...conversationHistory, conversation]);
  };

  const handleEndChat = () => {
    // Call the function to add the chat to history
    addChatToHistory();
    handleResetChat();
  };

  const handleResetChat = () => {
    setMessages([]);
    setNewMessage('');
    setSelectedConversation('');
    setLastSentMessage('');
    setChatbotResponse('');
    setRepliedMessage(null);
  };

  return (
    <div className="flex flex-col h-screen bg-[#c7e4db]">
      <div className="bg-[#1078C8] text-white p-4 text-center">
        <h2 className="text-2xl font-semibold">Welcome {user ? user.name : ''} 👋</h2>
      </div>

      <div className='flex flex-grow'>
        {/* Conversation History Sidebar */}
        <ConversationHistory
          conversationHistory={conversationHistory}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
        />

        {/* Chat Window */}
        <div className="w-3/4 bg-white p-4 border">
          <div className="h-4/5 border rounded-md p-4 bg-gray-100 mb-4 overflow-y-scroll">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} handleReplyToMessage={handleReplyToMessage} handleNewMessageChange={handleNewMessageChange} />
            ))}

            {chatbotResponse && (
              <div className="mb-2 text-left text-gray-600">
                <strong>Chatbot:</strong> {chatbotResponse}
              </div>
            )}
          </div>

          <ChatInput
            newMessage={newMessage}
            handleNewMessageChange={handleNewMessageChange}
            handleSendMessage={handleSendMessage}
            handleEndChat={handleEndChat}
            handleResetChat={handleResetChat}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;

