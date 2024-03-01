import {useRef, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../API/axiosConfig'
import classes from "./Register.module.css"
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

 const navigate = useNavigate()
const usernameDom = useRef(null);
const firstnameDom = useRef(null);
const lastnameDom = useRef(null);
const emailDom = useRef(null);
const passwordDom = useRef(null);

  async function handleSubmit(e){
    e.preventDefault();
    const usernameValue = usernameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue || 
      !passwordValue  

    ){
      alert('please provide all required information');
      return;
    }
  
  try {
    await axios.post('/users/register',{
      username:usernameValue,
      firstname:firstValue,
      lastname:lastValue,
      email:emailValue,
      password:passwordValue,
})
alert ('register successful.please login');
navigate("/login")
}catch (error){
  alert ('something went wrong!')
  console.log(error)
}
  }
  return (
    <section className={classes.register_wrapper}>
      <div className={classes.Register_page_wrapper}>
          <div>
            <h2>Join the Evangadi Network</h2>
            <p>Already have an account? <Link to={"/login"}>Sign in</Link></p>
          </div>
          <form onSubmit={handleSubmit}>
              <div className={classes.register_input_wrapper}>
                <div>
                  <input ref={usernameDom} 
                          type="text" 
                          placeholder='User Name'/>
                </div>
                <br />
                <div className={classes.register_input_name_wrapper}>
                <input  ref={firstnameDom} 
                        type="text" 
                        placeholder='First Name'/>
                
                <input  ref={lastnameDom} 
                        type="text" 
                        placeholder='Last Name'/>
                </div>
                <br />
                <div>
                <input  ref={emailDom} 
                        type="text" 
                        placeholder='Email'/>
                </div>
                <br />
                <div className={classes.password_input}>
                      <input
                        ref={passwordDom}
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder='Password'
                      />
                      <InputAdornment position="start">
                        <IconButton onClick={togglePasswordVisibility} edge="end" className={`${classes.visibilityIcon}`}>
                          {passwordVisible ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>

                </div>

                <br />
                <div className={classes.register_last_wrapper}>
                <p>
                  I Agree to the <Link to={"/"}>Privacy Policy</Link> and <Link to={"/"}>Term of Service</Link>
                </p>
                </div>
                <div className={classes.register_submit_wrapper}>
                  <button type='submit'>Agree and join</button>
                </div>
              </div>
          </form>
      <div>
        <div className={classes.register_last_wrapper}>
          <span>
          <Link to={"/login"}><h4>Already have an account?</h4> </Link>
          </span>
        </div>
      </div>
      </div>
    </section>
  )
}

export default Register






// return (
//   <section className={classes.upper_wrapper}>
//     <form onSubmit={handleSubmit}>
//       <div>
//         <span>username :--- </span>
//         <input 
//         ref={usernameDom} 
//         type="text" 
//         placeholder='username' />
//       </div>
//       <br />
//       <div>
//         <span>First name :--- </span>
//         <input 
//         ref={firstnameDom}
//         type='text' 
//         placeholder='first name' />
//       </div>
//       <br />
//       <div>
//         <span>last name :--- </span>
//         <input 
//         ref={lastnameDom}
//         type='text'
//         placeholder='lastname' />
//       </div>
//       <br />
//       <div>
//         <span>email :--- </span>
//         <input
//         ref={emailDom}
//         type='email' placeholder='email' />
//       </div>
//       <br/>
//       <div>
//         <span>password :--- </span>
//         <input 
//         ref={passwordDom}
//         type='password' placeholder='password' />
//       </div>
//       <button type='submit'>Register</button>
//     </form>
//     <Link to={'/login'} >login</Link>
    
//   </section>
// )
// }

// export default Register