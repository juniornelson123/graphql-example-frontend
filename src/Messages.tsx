import React, { useEffect } from 'react';
import { useQuery, gql, useSubscription } from '@apollo/client';

const GET_MESSAGES = gql`
  query {
    messages {
      id
      user
      content
    }
  }
`;

const MESSAGE_ADDED = gql`
  subscription {
    messageAdded {
      id
      user
      content
    }
  }
`;

interface Message {
  id: string;
  user: string;
  content: string;
}

const Messages: React.FC<{ user: string }> = ({ user }) => {
  const { data, loading, error, subscribeToMore } = useQuery(GET_MESSAGES);
  const { data: subscriptionData } = useSubscription(MESSAGE_ADDED);

  useEffect(() => {
    subscribeToMore({
      document: MESSAGE_ADDED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageAdded;
        return Object.assign({}, prev, {
          messages: [...prev.messages, newMessage],
        });
      },
    });
  }, [subscribeToMore]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro :(</p>;

  return (
    <div>
      {data.messages.map(({ id, user: messageUser, content }: Message) => (
        <div key={id} style={{ display: 'flex', justifyContent: user === messageUser ? 'flex-end' : 'flex-start', paddingBottom: '1em' }}>
          <div style={{
            background: user === messageUser ? '#58bf56' : '#e5e6ea',
            color: user === messageUser ? 'white' : 'black',
            padding: '1em',
            borderRadius: '1em',
            maxWidth: '60%'
          }}>
            {messageUser}: {content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;