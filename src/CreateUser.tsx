import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';

const ADD_USER = gql`
  mutation($username: String!) {
    addUser(username: $username) {
      id
      username
    }
  }
`;

interface CreateUserProps {
  openChat: (open: boolean) => void;
}

const CreateUser: React.FC<CreateUserProps> = ({ openChat }) => {
  const [username, setUsername] = useState('');
  const [addUser] = useMutation(ADD_USER);
  
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username) {
      try {
        localStorage.setItem("username", username)
        openChat(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Novo usuario</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Nome do usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateUser;