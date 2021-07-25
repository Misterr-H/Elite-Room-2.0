import React, { useEffect, useState, useRef } from 'react';
import { SocketContext } from "../service/socket";
import Timer from './Timer';
import tone from './tone.mp3';
 

export default function MessageBox(props) {
    const socket = React.useContext(SocketContext);
    const messagesEndRef = useRef(null);
    var isActive;
    window.onfocus = function () {
        isActive = true;
    };
    window.onblur = function () {
        isActive = false;
    };
    const notify = () => {
        var audio = new Audio(tone);
        audio.play();
    }


    


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const [rows, setRows] = useState([]);
    const [tusers, setTusers] = useState({});




    useEffect(() => {
        scrollToBottom()
    }, [rows]);





    useEffect(() => {
        socket.on("user-joined", data => {
            let nameSpan = React.createElement("span", { style: { color: data.color } }, data.name);
            let h1 = React.createElement("h1", { className: "text-black p-1 bg-blue-400 shadow-2xl bg-opacity-50 rounded-xl mx-auto my-1" }, [nameSpan, " has joined the chat"]);
            setRows(arr => [...arr, h1]);
            // ReactDOM.render(rows.map(x => {<h1>{x} has joined the chat</h1>}), document.getElementById("messagebox"));

        })
        socket.on("receive", data => {

            let nameHeading = React.createElement("h1", { className: "text-xs shadow-2xl p-1", style: { color: data.color } }, data.name);
            let msgText = React.createElement("h1", { className: "text-black" }, data.message);
            let messagebox = React.createElement("div", { className: "bg-white shadow-2xl m-2 p-2 rounded-xl w-1/3 flex flex-col break-words" }, [nameHeading, msgText, <Timer />]);
            setRows(arr => [...arr, messagebox]);
            if (!isActive) {
                notify();
            }
        })

        socket.on("receive-user", data => {
            let usermessagebox = React.createElement("h1", { className: "text-white bg-blue-600 shadow-2xl m-2 p-2 rounded-xl w-1/3 ml-auto flex flex-col break-words" }, [data.message, <Timer />]);
            setRows(arr => [...arr, usermessagebox]);
        })

        socket.on("user-left", data => {
            let nameSpan = React.createElement("span", { style: { color: data.color } }, data.name);
            let h1 = React.createElement("h1", { className: "text-black p-1 bg-blue-400 shadow-2xl bg-opacity-50 rounded-xl mx-auto my-1" }, [nameSpan, " has left the chat"]);
            setRows(arr => [...arr, h1]);
            // ReactDOM.render(rows.map(x => {<h1>{x} has joined the chat</h1>}), document.getElementById("messagebox"));

        })



        socket.on("user-typing", data => {
            let id = data.id;
            let typingdot = React.createElement("span", { className: "dot mx-auto" });
            let nameHeading = React.createElement("h1", { className: "text-xs shadow-2xl p-1", style: { color: data.color } }, data.name);
            let msgText = React.createElement("h1", { className: "text-black" }, [typingdot, typingdot, typingdot]);
            let messagebox = React.createElement("div", { className: "bg-white shadow-2xl m-2 p-2 rounded-xl w-20 flex flex-col" }, [nameHeading, msgText]);
            setTusers({ ...tusers, id: messagebox });

        })

        socket.on("user-not-typing", data => {
            let id = data;
            setTusers({ ...tusers, id: undefined });
        })


    }, [socket])

    return (
        <>
            <div className="flex flex-wrap flex-row mt-3">
                <h1 className="text-xl mx-auto">Welcome <span style={{ color: props.color }}>{props.name}</span></h1>
            </div>

            <div className="flex flex-col bg-gray-200 mx-2 md:mx-auto mt-5 border-2 md:w-1/3  border-black rounded-xl overflow-y-auto" style={{ height: "70vh" }} id="messagebox">


                {/* <div className="bg-white shadow-2xl m-2 p-2 rounded-xl w-1/3 flex flex-col"><h1 className="text-xs text-red-400">Mark Zuckerberg</h1><h1 className="text-black">hello himanshu</h1> <p className="text-xs ml-auto">{currentime}</p> </div>
                <div className="text-white bg-blue-600 shadow-2xl m-2 p-2 rounded-xl w-1/3 ml-auto flex flex-col">yes it is good <p className="text-xs ml-auto">{currentime}</p> </div>
                <h1 className="text-black p-1 bg-blue-400 shadow-2xl bg-opacity-50 rounded-xl mx-auto my-1">User has joined the chat</h1> */}
                {rows}
                {Object.values(tusers)}
                <div ref={messagesEndRef} />
            </div>
        </>
    )
}

