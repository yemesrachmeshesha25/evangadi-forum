import { useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../API/axiosConfig'
import classes from './Login.module.css'
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Login() {

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
const navigate = useNavigate();
const emailDom = useRef(null);
const passwordDom = useRef(null);

async function handleSubmit(e){
  e.preventDefault();
 
  const emailValue = emailDom.current.value;
  const passwordValue = passwordDom.current.value;
  if (
    !emailValue || !passwordValue  
){
    alert('please provide all required information');
    return;
  }

try {
  const {data} = await axios.post('/users/login',{
    email:emailValue,
    password:passwordValue,
})
alert ('login successful.');

localStorage.setItem('token',data.token)
navigate("/")
console.log(data);

}catch (error){
alert (error?.response?.data?.msg);
console.log(error.response.data.msg)
}
}
  return (
    <section className={classes.login_wrapper}>
      <div className={classes.login_page_wrapper}>
        <h3>Login to your account</h3>
        <p>Don't have an account? <Link to={"/register"}>Create a new account</Link></p>
        <form onSubmit={handleSubmit}>
        <div className={classes.login_input_wrapper}>
          <input
          ref={emailDom}
          type='text' placeholder='Your Email' />
        </div>
        <br/>
        <div className={classes.login_input_wrapper}>
          <input 
          ref={passwordDom}
          type={passwordVisible ? 'text' :'password'} 
          placeholder='password' />
          <InputAdornment position="start">
                      <IconButton onClick={togglePasswordVisibility} edge="end" className={`${classes.visibilityIcon}`}>
                          {passwordVisible ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
        </div>
        <div className={classes.login_login_wrapper}>
        <button type='submit'>Log in</button>
        </div>
       
    </form>
      <Link to = {'/register'}>Forgot Password</Link>
      </div>
    </section>
  )
}

export default Login