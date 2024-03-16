import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import axios from "./API/axiosConfig";
import LandingLayout from "./pages/LandingLayout/LandingLayout";
import Home from "./pages/Home/Home";
import Question from "./Components/AskQuestions/AskQuestions";
import Answer from "./Components/Answer/Answer";

export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});
  const  [question ,setQuestion] = useState({})
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log(user)
  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(data)
      setUser(data);
      console.log(data)
    } catch (error) {
      navigate("/Login");
      console.log(error.response);
    }
  }

  async function getQuestion() {

    try {
      const { data } = await axios.get('questions/questions', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(data)
      setQuestion(data); 
    } catch (error) {
      
      console.error('Error fetching question:', error);
  }
  }
useEffect(() => {
  checkUser();
  getQuestion();
}, [navigate]);

  return (
    <AppState.Provider value={{ user, setUser , question, setQuestion}}>
      <Routes>
        <Route path="/Login" element={<LandingLayout />} />
        <Route path="/" element={<Home />} />
        <Route  path="/questions" element={<Question/>}/>
        <Route path="/answer"  element={<Answer/>}/>
      </Routes>
    </AppState.Provider>
  );
}

export default App;





// import {Route, Routes, useNavigate} from "react-router-dom"
// import "./App.css";
// import SignInPage from "./Components/SignInPage/SignInPage"
// import SignUpPage from "./Components/SignUpPage/SignUpPage";
// import AskQuestions from "./Components/AskQuestions/AskQuestions";
// import Home from "./pages/Home/Home";
// import { useEffect, useState, createContext} from 'react'
// import axios from "./API/axiosConfig";

// export const AppState = createContext();

// function App() {
 
//   const [user, setUser] = useState({});
 
//   const token = localStorage.getItem('token');
//   const navigate = useNavigate();

//   async function fetchData() {
//     try {
//       const [userData] = await Promise.all([
//         axios.get('/users/check', {
//           headers: {
//             Authorization: 'Bearer ' + token,
//           },
//         }),
//         axios.get('/questions', {
//           headers: {
//             Authorization: 'Bearer ' + token,
//           },
//         }),
//       ]);

//       setUser(userData.data);
//      console.log(userData,"test")
//     } catch (error) {
//       console.error(error.response);
//       navigate('/login');
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   console.log(user, 'user123');
  

//   return (
//     <AppState.Provider value={{ user, setUser }}>
    
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/login' element={<SignUpPage />} />
//         <Route path='/register' element={<SignInPage />} />
//         <Route path='/ask-questions' element={<AskQuestions />} />
//       </Routes>
    
//     </AppState.Provider>
//   );
// }

// export default App;
