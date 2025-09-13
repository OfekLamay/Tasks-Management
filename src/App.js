import './App.css';
import { Route, Routes } from 'react-router-dom';

// components
import Home from './components/Home';
import NavBar from './components/NavBar';
import Tasks from './components/Tasks';
import NewTask from './components/NewTask';

function App() {
  return (
    <div className="App">
      {/* <h1>Tasks Management</h1>
      <NavBar /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tasks' element={<Tasks />} />
        <Route path='/newTask' element={<NewTask />} />
      </Routes>
    </div>
  );
}

export default App;
