import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const[roomId, setRoomId] = useState('');
  const[username, setUsername] = useState('');
  const createNewRoom = (e) => {
      e.preventDefault();
      const id = uuidv4();
      setRoomId(id);
      toast.success('Created a new room');
  };

  const joinRoom = () => {
    if(!roomId || !username) {
      toast.error('ROOM ID & Username is required');
      return;
    }
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleInputEnter = (e) => {
    if(e.code == 'Enter') {
      joinRoom();
    }
  };

  return (
    <div className='homePageWrapper'>
      <div className='formWrapper'>
        <img className="homePageLogo" src='/Logo.png' alt='SynCode Logo'/>
        <h4 className="mainLabel">Paste invitation Room ID</h4>
        <div className="inputGroup">
          <input 
            type="text" 
            className='inputBox' 
            placeholder='Room ID' 
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            onKeyUp={handleInputEnter}
          />
          <input 
            type="text" 
            className='inputBox' 
            placeholder='Username' 
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onKeyUp={handleInputEnter}
          />
          <button className='btn joinBtn' onClick={joinRoom}>Join</button>
          <span className='createInfo'>
            If you don't have an invite then create &nbsp;
            <a onClick={createNewRoom} href="/" className='createNewBtn'>
              new room
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>Built with 💛 by &nbsp;<a href="https://sarguroh20.github.io/Portfolio/">TS</a></h4>
      </footer>
    </div>
  )
}

export default Home
