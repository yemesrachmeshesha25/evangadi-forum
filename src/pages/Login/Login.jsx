import React, { useRef } from "react";
import axios from '../../API/axiosConfig'
import { useNavigate } from "react-router-dom";

const Login = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;
    if (!emailValue || !passValue) {
      alert("please provide all required information ");
      return
    }
    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      alert("login successful.  ");
      localStorage.setItem("token", data.token);
      navigate('/');
    } catch (error) {
  
      console.log(error.response.data);
    }
  }

  return (
    <div className="col card mt-3 p-4 text-center">
      <div>
        <h4 className="m-3">Login to your account</h4>
        <p className="mb-2">
          Don’t have an account?
          <a
            href=""
            onClick={() => setCurrentPage("signup")}
            className="fw-semibold text-decoration-none text-warning"
          >
            Create a new account
          </a>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column gap-3">
          <input
            type="email"
            placeholder="Email Address"
            className="form-control p-3"
            ref={emailDom}
          />

          <input
            type="password"
            placeholder="Password"
            className="form-control p-3"
            ref={passwordDom}
          />
        </div>

        <div className="mt-3">
          <a
            href=""
            className="text-decoration-none text-warning d-flex justify-content-end"
          >
            Forgot Password
          </a>
        </div>

        <div className="d-grid mt-2">
          <button
            className="btn btn-primary fw-bold px-5 action_btn"
            type="Submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;





// import { useRef, useState } from "react";
// import { Link, useNavigate } from 'react-router-dom';
// import axios from '../../API/axiosConfig'
// import classes from './Login.module.css'
// import { IconButton, InputAdornment, TextField } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';

// function Login() {

//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };
// const navigate = useNavigate();
// const emailDom = useRef(null);
// const passwordDom = useRef(null);

// async function handleSubmit(e){
//   e.preventDefault();
 
//   const emailValue = emailDom.current.value;
//   const passwordValue = passwordDom.current.value;
//   if (
//     !emailValue || !passwordValue  
// ){
//     alert('please provide all required information');
//     return;
//   }

// try {
//   const {data} = await axios.post('/users/login',{
//     email:emailValue,
//     password:passwordValue,
// })
// alert ('login successful.');

// localStorage.setItem('token',data.token)
// navigate("/")
// console.log(data);

// }catch (error){
// alert (error?.response?.data?.msg);
// console.log(error.response.data.msg)
// }
// }
//   return (
//     <section className={classes.login_wrapper}>
//       <div className={classes.login_page_wrapper}>
//         <h3>Login to your account</h3>
//         <p>Don't have an account? <Link to={"/register"}>Create a new account</Link></p>
//         <form onSubmit={handleSubmit}>
//         <div className={classes.login_input_wrapper}>
//           <input
//           ref={emailDom}
//           type='text' placeholder='Your Email' />
//         </div>
//         <br/>
//         <div className={classes.login_input_wrapper}>
//           <input 
//           ref={passwordDom}
//           type={passwordVisible ? 'text' :'password'} 
//           placeholder='password' />
//           <InputAdornment position="start">
//                       <IconButton onClick={togglePasswordVisibility} edge="end" className={`${classes.visibilityIcon}`}>
//                           {passwordVisible ? <Visibility /> : <VisibilityOff />}
//                         </IconButton>
//                       </InputAdornment>
//         </div>
//         <div className={classes.login_login_wrapper}>
//         <button type='submit'>Log in</button>
//         </div>
       
//     </form>
//       <Link to = {'/register'}>Forgot Password</Link>
//       </div>
//     </section>
//   )
// }

// export default Login