import './App.css';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// components
import Home from './components/Home';
import NavBar from './components/NavBar';
import Tasks from './components/Tasks';
import NewTask from './components/NewTask';


function App() {

  // const navigate = useNavigate()
  const [user, setUser] = useState("NotLoggedIn")

  // const [check, setCheck] = useState([]);
  // const [data, setData] = useState([])
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const [errMessage, setErrMessage] = useState('')
  // const [products, setProducts] = useState([])

  // useEffect(()=>{
  //   fetch('/api/users')
  //   .then(response => response.json())
  //   .then(data => setCheck(data))
  // }, [])
  
  // const checkLogin = (username, password) => {
  //   // Request the server to log in

  //   fetch('/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ uName: username, uPass: password })
  //   })
  //   .then(response => response.json())
  //   .then(res => {
  //     if(res.isLogin) {
  //       alert(res.message)
  //     } else {
  //       alert(res.message)
  //     }
  //   })

  // }

  // const addUser = (username, password) => {
  //   // request to the server and get true/false
  //   fetch('/api/add-user', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ uName: username, uPass: password }),
  //   })
  //   .then(response => response.json())
  //   .then(res => {
  //     if(res.isAdded) {
  //       alert(res.message)
  //     } else {
  //       alert(res.message)
  //     }
  //   })
  //   // alert the result

  //   // fetch('/api/users')
  //   // .then(response => response.json())
  //   // .then(data => setCheck(data))
  // }

  return (
    <div className="App">
      <h1>Tasks Management</h1>

    <Router>
      <NavBar />
      <Routes>
        <Route path={'/'} element={<Home updateUser={setUser} />} />
        <Route path={'/tasks'} element={<Tasks currentUser = {user}/>} />
        <Route path={'/newTask'} element={<NewTask />} />
        {/* <Route path={'/endTask'} element={<TaskInfo />} /> */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;
