import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

// components
import Home from './components/Home';
import NavBar from './components/NavBar';
import Tasks from './components/Tasks';
import NewTask from './components/NewTask';


function App() {

  const [user, setUser] = useState("NotLoggedIn")

  return (
    <div className="App">
      <h1>Tasks Management</h1>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home updateUser={setUser}/>} />
        <Route path={'/tasks'} element={<Tasks currentUser = {user}/>} />
        <Route path={'/newTask'} element={<NewTask currentUser = {user}/>} />
      </Routes>
    </div>
  );
}

export default App;
