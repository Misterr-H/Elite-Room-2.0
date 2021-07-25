import React, { useState, useRef } from 'react'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons';
import Picker from 'emoji-picker-react';
import ReactDOM from 'react-dom';
import { SocketContext } from "../service/socket";


library.add(fab, fas, far);


export default function Entry(props) {
    const socket = React.useContext(SocketContext);
    const [message, setMessage] = useState('');
    const [emojipicker, setEmojipicker] = useState(false);
    const [pickerstate, setPickerstate] = useState(0);

    const onEmojiClick = (event, emojiObject) => {
        setMessage(message + emojiObject.emoji);
        focusFunction();
    };

    const msgInputRef = useRef(null);

    if (emojipicker) {
        ReactDOM.render(<Picker pickerStyle={{ width: "20rem", marginLeft: "auto", marginRight: "auto" }} onEmojiClick={onEmojiClick} />, document.getElementById("emojidiv"));
    }
    else {
        if (pickerstate == 1)
            ReactDOM.render(<h1></h1>, document.getElementById("emojidiv"));
    }
    const focusFunction = () => {
        msgInputRef.current.focus();
    }


    function handleSubmit(event) {
        event.preventDefault();
    }

    


    return (
        <>
            <div className="flex flex-row md:mx-auto md:w-1/3  bg-gray-400 rounded-full mx-2">



                <FontAwesomeIcon className={emojipicker ? "my-auto mx-3 text-3xl cursor-pointer noSelect text-blue-600" : "my-auto mx-3 text-3xl cursor-pointer noSelect"} icon={['far', 'laugh-beam']} onClick={() => {
                    if (emojipicker) {
                        setEmojipicker(false);
                        focusFunction();
                    }
                    else
                        setEmojipicker(true);
                    setPickerstate(1);
                }} />
                <form onSubmit={handleSubmit} action="#" id="entry" className="w-full">
                    <input ref={msgInputRef} onChange={event => {

                        setMessage(event.target.value);
                        if(event.target.value!='')
                        socket.emit('typing', {name:props.name, color:props.color});

                    }} type="text" name="message" id="message" placeholder="Type a message" className="rounded-full bg-gray-500 p-2 w-8/12 m-2 ml-0 text-white focus:outline-none" value={message}></input>
                    <button onClick={() => {
                        focusFunction();
                        props.messageFunction(message);
                        setMessage('');
                    }} type="submit" className="bg-blue-700 md:hover:bg-blue-400 rounded-full md:w-24 w-20 flex flex-row h-14 text-white float-right noSelect"><span className="my-auto mx-auto">SEND</span> <FontAwesomeIcon className="text-2xl md:mr-4 mr-2 my-auto" icon={['fas', 'paper-plane']} /> </button>
                </form>
            </div>
            <div id="emojidiv" className="lg:absolute lg:left-10 lg:top-1/3">

            </div>


        </>
    )
}
