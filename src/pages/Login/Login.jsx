import { useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../API/axiosConfig'
import classes from './Login.module.css'
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Login() {
const navigate = useNavigate();
const emailDom = useRef();
const passwordDom = useRef();

async function handleSubmit(e){
  e.preventDefault();
 
  const emailValue = emailDom.current.value;
  const passValue = passwordDom.current.value;
  if (
    
    !emailValue || 
    !passValue  

  ){
    alert('please provide all required information');
    return;
  }

try {
  const {data} = await axios.post('/users/login',{
    email:emailValue,
    password:passValue,
})
alert ('login successful.');

localStorage.setItem('token',data.token)

// navigate("/")
console.log(data);

}catch (error){
alert (error?.response?.data?.msg);
console.log(error.response.data)
}
}
  return (
    <section>
       <form onSubmit={handleSubmit}>
        <div>
          <span>email :--- </span>
          <input
          ref={emailDom}
          type='email' placeholder='email' />
        </div>
        <br/>
        <div>
          <span>password :--- </span>
          <input 
          ref={passwordDom}
          type='password' placeholder='password' />
        </div>
        <button type='submit'>Log in</button>
      </form>
      <Link to = {'/register'}>register</Link>
    </section>
  )
}

export default Login