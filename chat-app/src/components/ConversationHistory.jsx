import React, { useState } from 'react';

function ConversationHistory({
  conversationHistory,
  selectedConversation,
  setSelectedConversation,
}) {
  const [showConversationModal, setShowConversationModal] = useState(false);

  const toggleModal = () => {
    setShowConversationModal(!showConversationModal);
  };

  const selectedConversationData = conversationHistory.find(
    (conversation) => conversation.conversationName === selectedConversation
  );

  return (
    <div className="w-1/4 bg-gray-200 p-4">
      <h2 className="text-xl font-semibold mb-4">Previous Conversations</h2>
      <ul>
        {conversationHistory.map((conversation) => (
          <li
            key={conversation.conversationName}
            className={`cursor-pointer ${
              conversation.conversationName === selectedConversation
                ? 'bg-[#a1e0d9]'
                : ''
            }`}
            onClick={() => setSelectedConversation(conversation.conversationName)}
          >
            <div className="border rounded p-2 mb-2">
              {conversation.conversationName}
            </div>
          </li>
        ))}
      </ul>
      {selectedConversation && (
        <div className="mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={toggleModal}
          >
            Show Conversation
          </button>
        </div>
      )}
      {showConversationModal && selectedConversationData && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow-md w-3/4">
            <h2 className="text-xl font-semibold mb-4">
              {selectedConversationData.conversationName}
            </h2>
            <div className="h-80 border rounded-md p-4 bg-gray-100 mb-4 overflow-y-scroll">
              {selectedConversationData.messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`rounded-lg p-2 max-w-md inline-block ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-black'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConversationHistory;
