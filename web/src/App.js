import './App.css';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
function App() {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);


  const [alert, setAlert] = useState('');
  const [alertMessages, setAlertMessages] = useState([]);

  const socket = io('http://localhost:4000');

  useEffect(() => {

    socket.on('message', (message) => {
      // console.log('%cweb\src\App.js:13 message', 'color: #007acc;', message);
      setReceivedMessages((prevMessages) => [...prevMessages, message]);
    });
    socket.on('alert', (alert) => {
      setAlertMessages((prevMessages) => [...prevMessages, alert]);
    });

    // 清理事件监听器
    // return () => {
    //   socket.off('message');
    //   socket.off('alert');
    // };
  }, [socket]);
  // 

  const sendMessage = () => {
    socket.emit('message', message);
    setMessage('');
  };

  const sendAlert = () => {
    socket.emit('alert', alert);
    setAlert('');
  };

  return (
    <div className="App">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      {/* <div>123</div> */}
      <div>
        {receivedMessages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>

      {/* ******************************* */}
      <input
        type="text"
        value={alert}
        onChange={(e) => setAlert(e.target.value)}
      />
      <button onClick={sendAlert}>Send Alert</button>

      <div>
        {alertMessages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
