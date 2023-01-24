import './App.css';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import { useState } from 'react';

// components
import Home from './components/Home';
import NavBar from './components/NavBar';
import Tasks from './components/Tasks';
import NewTask from './components/NewTask';
//"proxy": "https://tasks-management-server.onrender.com"

function App() {

  const [user, setUser] = useState("NotLoggedIn")

  return (
    <div className="App">
      <h1>Tasks Management</h1>

    <Router>
      <NavBar />
      <Routes>
        <Route path={'/'} element={<Home updateUser={setUser} />} />
        <Route path={'/tasks'} element={<Tasks currentUser = {user}/>} />
        <Route path={'/newTask'} element={<NewTask />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
