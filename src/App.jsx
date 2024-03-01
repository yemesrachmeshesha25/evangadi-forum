import {Route, Routes, useNavigate} from "react-router-dom"
import "./App.css";
import SignUpPage from "./Components/SignUpPage/SignUpPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState, createContext} from 'react'
import axios from "./axiosConfig";
import Footer from "./pages/Footer/Footer";

export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  async function checkUser() {
    try {
    const { data } = await axios.get("/users/check",{
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    setUser(data);
    } catch (error) {
      console.log(error.response);
      navigate('/login');
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppState.Provider value={{ user, setUser }}>
     
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<SignUpPage />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    
    </AppState.Provider>
  );
}

export default App;
