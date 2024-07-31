import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import CreateUser from './CreateUser';
import Chat from './Chat';
import './App.css';

const App: React.FC = () => {
    const [openChat, setOpenChat] = useState(false)

    const getLoggedUser = async () => {
        const user = await localStorage.getItem("username")
        if(user){
            setOpenChat(true)
        }
    } 
    
    useEffect(() => {
        getLoggedUser()
    }, [])

    return (
        <div className="App">

            {
            openChat ? <Chat openChat={setOpenChat} />  : <CreateUser openChat={setOpenChat} />
            }
            
        </div>
    );
};

export default App;