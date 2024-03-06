import {Route, Routes, useNavigate} from "react-router-dom"
import "./App.css";
import SignInPage from "./Components/SignInPage/SignInPage"
import SignUpPage from "./Components/SignUpPage/SignUpPage";
import AskQuestions from "./Components/AskQuestions/AskQuestions";
import Home from "./pages/Home/Home";
import { useEffect, useState, createContext} from 'react'
import axios from "./API/axiosConfig";

export const AppState = createContext();

function App() {
 
  const [user, setUser] = useState({});
 
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const [userData] = await Promise.all([
        axios.get('/users/check', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }),
        axios.get('/questions', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }),
      ]);

      setUser(userData.data);
     console.log(userData,"test")
    } catch (error) {
      console.error(error.response);
      navigate('/login');
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log(user, 'user123');
  

  return (
    <AppState.Provider value={{ user, setUser }}>
    
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<SignUpPage />} />
        <Route path='/register' element={<SignInPage />} />
        <Route path='/ask-questions' element={<AskQuestions />} />
      </Routes>
    
    </AppState.Provider>
  );
}

export default App;
