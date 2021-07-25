import React, { useState } from 'react'
import Header from '../components/Header'
import MessageBox from '../components/MessageBox'
import Entry from '../components/Entry'
import NameDialogue from '../components/NameDialogue'
import { SocketContext } from '../service/socket'
import randomColor from 'randomcolor';


export default function Home() {
    const socket = React.useContext(SocketContext);

    const [name, setName] = useState('');
    let color = randomColor({
        luminosity: 'dark'
    });

    const sendName = (name) => {
        socket.emit('new-user-joined', {name:name, color:color});
    }

    const sendMessage = (message) => {
        if(message!='') {
        socket.emit('send', {message: message, name: name, color:color});
        }
    }

    return (
        <>
            <NameDialogue state={true} nameFunction={name => {
                setName(name);
                sendName(name);
            }} />
            <Header />
            <MessageBox name={name} color={color} />
            <Entry messageFunction={message => {
                sendMessage(message);
            }} name={name} color={color} />
        </>
    )
}
