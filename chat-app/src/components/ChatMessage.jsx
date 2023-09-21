import React from 'react';

function ChatMessage({ message, user }) {
  return (
    <div className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
      <div
        className={`rounded-lg p-2 max-w-md inline-block ${
          message.sender === 'user'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-black'
        }`}
      >
        {message.sender === 'user' ? <span>{message.text}</span> : message.text}
      </div>
    </div>
  );
}

export default ChatMessage;
