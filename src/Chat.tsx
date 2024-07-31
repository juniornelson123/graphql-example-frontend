import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import Messages from './Messages';

const POST_MESSAGE = gql`
  mutation($user: String!, $content: String!) {
    postMessage(user: $user, content: $content) {
      id
      user
      content
    }
  }
`;

interface ChatProps {
  openChat: (open: boolean) => void;
}


const Chat: React.FC<ChatProps>  = ({openChat}) => {
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');

  const [postMessage] = useMutation(POST_MESSAGE);

  const getLoggedUser = async () => {
      const user = await localStorage.getItem("username")
      if(user){
          setUsername(user)
      }
  } 
  useEffect(() => {
    getLoggedUser()
  }, [])

  const onSend = () => {
    if (content.length > 0) {
      postMessage({
        variables: { user: username, content },
      });
    }
    setContent('');
  };

  const onQuit = async () => {
    await localStorage.removeItem("username")
    openChat(false)
  }
  return (
    <div>
      <Messages user={username} />
      <div>
        <textarea
          placeholder="Mensagem"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              onSend();
            }
          }}>

        </textarea>
        <button onClick={onSend}>Enviar</button><br />
        <button onClick={onQuit} style={{ background: "red" }}>Sair</button>
      </div>
    </div>
  );
};

export default Chat;