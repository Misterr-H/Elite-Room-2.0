import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'
import { SocketContext,  socket } from './service/socket';

function App() {

  return (
    <>
      <SocketContext.Provider value={socket}>
        <Home />
      </SocketContext.Provider>

    </>
  );
}

export default App;
