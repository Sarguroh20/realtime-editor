import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import Client from '../components/Client';
import Editor from '../components/Editor';
import LanguageSelector from "../components/LanguageSelector";
import { LANGUAGE_VERSIONS, CODE_SNIPPETS } from "../constants";
import Output from "../components/Output";
import { initSocket } from '../socket';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import ACTIONS from '../Actions';

const EditorPage = () => {
  const editorRef = useRef();
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);

  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const javascriptCodeSnippet = CODE_SNIPPETS.javascript;

  useEffect(() => {
    const init = async() => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      function handleErrors(e) {
        console.log('socket error', e);
        toast.error('Socket connection failed, try again later.');
        reactNavigator('/');
      }
console.log(`codeRef.current`, codeRef.current, selectedLanguage)
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
        selectedLanguage: codeRef.current
      });


      socketRef.current.on(
        ACTIONS.JOINED, 
        ({clients, username, socketId, language}) => {
          if(username !== location.state?.username){
            toast.success(`${username} joined the room.`);
            console.log(`${username} joined`);
          }
          setClients(clients);
          console.log('codeRe', language, selectedLanguage)
          setSelectedLanguage(selectedLanguage);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
            selectedLanguage
          });
      });

      socketRef.current.on(
        ACTIONS.DISCONNECTED, 
        ({socketId, username}) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => {
          return prev.filter(
            (client) => client.socketId !== socketId
          );
        });
      });

      socketRef.current.on(ACTIONS.LANGUAGE_CHANGE, ({language}) => {
        console.log(`language change`, language);
        setSelectedLanguage(language)
      })
    };
    init();
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    }
  }, []);

  async function copyRoomId() {
    try{
      await navigator.clipboard.writeText(roomId);
      toast.success('Room ID has been copied to your clipboard');
    }catch(err){
      toast.error('Could not copy the Room ID');
      console.log(err);
    }
  }

  function leaveRoom() {
    reactNavigator('/');
  }

  if(!location.state){
    return <Navigate to="/" />;
  }

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    const refCode = codeRef.code;
    console.log(`socketRef hangle`, socketRef)
    socketRef.current.emit(ACTIONS.LANGUAGE_CHANGE, {
  roomId,
  refCode,
      language
    });
  };

  const handleCodeChange = (code) => {
    codeRef.current = code;
  };

  return (
    <div className='mainWrap'>
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img 
              className='LogoImage' 
              src="/Logo.png" 
              alt="Logo" 
            />
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {
              clients.map((client) => (
                <Client 
                  key={client.socketId} 
                  username={client.username}
                />
              ))
            }
          </div>
        </div>
      <button className='btn copyBtn' onClick={copyRoomId}>
        Copy ROOM ID
      </button>
      <button className='btn leaveBtn' onClick={leaveRoom}>
        Leave
      </button>
      </div>
      <div className="editorWrap">
        <LanguageSelector
          language={selectedLanguage}
          onSelect={handleLanguageSelect}
        />
        <div style={{display: 'flex'}}>
        <div style={{flex : '1'}}>
        <Editor 
          socketRef={socketRef} 
          roomId={roomId} 
          selectedLanguage={selectedLanguage}
          // codeSnippets={CODE_SNIPPETS}
          // value = {codeSnippets[CODE_SNIPPETS]}
          // onChange={handleCodeChange}
          // onChange={(e) => handleCodeChange(e.target.value)}
          onCodeChange={(code) => handleCodeChange(code)}
        />
        </div>
        <div style={{flex : '1', padding : '10px'}}>
        <Output editorRef={codeRef} language={selectedLanguage} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage
