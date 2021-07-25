import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react'
import { SocketContext } from "../service/socket";



export default function Header() {
    const socket = React.useContext(SocketContext);

    const [number, setNumber] = useState(0);

    useEffect(() => {
        socket.on("number", data => {
            setNumber(data.count);
            let arr = Object.values(data.users);
            ReactDOM.render(arr.map(x => (<h1 className="text-white">{x}</h1>)), document.getElementById("usersonline"));
        })

    }, [socket])

    const [useronline, setUseronline] = useState(true);

    return (
        <div className="flex flex-wrap flex-row bg-gray-800 h-14">
            <h1 className="text-white mx-auto my-auto ">ELITE ROOM</h1>
            <h1 className="text-white absolute right-0 cursor-pointer my-2 mr-4 p-2 rounded-full bg-blue-400 noSelect" onClick={() => {
                if(useronline) {
                    setUseronline(false);
                }
                else {
                    setUseronline(true);
                }
            }}>{number} online</h1>
            <div id="usersonline" className={useronline? "hidden":"flex max-h-40 overflow-y-auto flex-col bg-blue-500 p-2 rounded-2xl absolute right-0 top-14 mr-4"}>
                
            </div>
        </div>
    )
}
