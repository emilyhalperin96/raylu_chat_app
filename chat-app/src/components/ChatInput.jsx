import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

function ChatInput({
  newMessage,
  handleNewMessageChange,
  handleSendMessage,
  handleEndChat,
  handleResetChat,
}) {
  return (
    <div className="flex space-y-2">
      <input
        type="text"
        className="flex-grow border rounded-l py-2 px-2" 
        placeholder="Ask me anything..."
        value={newMessage}
        onChange={(e) => handleNewMessageChange(e, null)}
      />
      <div className="space-x-2">
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          className="bg-blue-500 text-white py-2 px-4 rounded-r flex items-center"
          onClick={handleSendMessage}
        >
          Send
        </Button>
        <Button
          variant='outlined'
          className="bg-[#243D98] text-white py-1 px-2 rounded text-base"
          onClick={handleEndChat}
        >
          End
        </Button>
        <Button
          variant='outlined'
          endIcon={<DeleteIcon />}
          className="bg-red-500 text-white mt-2 py-1 px-2 rounded text-base"
          onClick={handleResetChat}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export default ChatInput;
