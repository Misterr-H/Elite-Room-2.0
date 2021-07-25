import io from "socket.io-client";
import { SOCKET_URL } from "./config";
import React from "react";

export const socket = io.connect(SOCKET_URL);
export const SocketContext = React.createContext();