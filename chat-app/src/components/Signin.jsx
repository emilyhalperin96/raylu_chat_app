import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      name: name,
      username: username,
    };
    fetch('http://localhost:5000/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        setName('');
        setIsLoading(false);

        // Redirect to ChatWindow route and pass user info as a prop
        navigate('/chatwindow', { state: { user: responseData, resetChat: true } });
      })
      .catch((error) => {
        console.log('Error', error);
        setIsLoading(false);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#c7e4db]">
      <h1 className="text-5xl font-bold text-[#1078C8] text-center mt-10">Emily's Chatbot</h1>
      <p className='text-center mt-2'>This chat bot is build with React and Python and sends automated responses using the OpenAI API.</p>
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-[#10C8BB] ring-2 ring-[#243D98] lg:max-w-xl mt-6">
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col">
            <label className="text-sm font-semibold text-[#222244dd9]" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#10C8BB] focus:ring-[#10C8BB] focus:outline-none focus:ring focus:ring-opacity-40"
              type="text"
              id="name"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="text-sm font-semibold text-gray-800" htmlFor="username">
              Username
            </label>
            <input
              className="w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#10C8BB] focus:ring-[#10C8BB] focus:outline-none focus:ring focus:ring-opacity-40"
              type="text"
              id="username"
              autoComplete="off"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="mt-6">
            <button
              className="w-32 px-2 py-1 text-white transition-colors duration-200 transform rounded-full bg-[#243D98] hover:bg-[#9daada] focus:outline-none focus:bg-[#9daada]"
              variant="fill"
              color="primary"
              type="submit"
            >
              {isLoading ? 'Loading...' : 'Enter Chat'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
