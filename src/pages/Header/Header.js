import React, { useContext} from 'react'
// import classes  from './Header.module.css'
import { Link,useNavigate } from 'react-router-dom';
import { AppState } from '../../App';
// import MenuIcon from '@mui/icons-material/Menu';
// import ClearIcon from '@mui/icons-material/Clear';
import logo from '../../assets/logo.png'


const Header = () => {
    const { user, setUser, token } = useContext(AppState);
    const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login'); 
    };
return (
    <section className='sticky-top custom-sticky'>
        <nav
        className="navbar p-3 navbar-expand-lg"
        style={{ backgroundColor: "white" }}
      >
        <div className="container">
            <a className="navbar-brand" href="#"><img src={logo} alt="EvangadiLogo" /></a>
  
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end fw-semibold" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item align-items-center d-flex">
                <a className="nav-link active" aria-current="page" href="http://localhost:3000/">Home</a>
                </li>
                <li className="nav-item align-items-center d-flex">
                <a className="nav-link" href="#">How It Works</a>
                </li>
                <li className="nav-item align-items-center d-flex">
                {user ? (
                    <Link className="nav-link" to="http://localhost:3000/login">
                    <button className='btn btn-primary fw-bold px-5 action__btn' onClick={handleLogout}>
                        Logout
                    </button>
                    </Link>
                ) : (
                    <Link className="nav-link" to="http://localhost:3000/login">
                    <button className='btn btn-primary fw-bold px-5 action__btn'>
                        Sign In
                    </button>
                    </Link>
                )}
                </li>
            </ul>
            </div>

        </div>
        </nav>
    </section>
    )
  }
  
  export default Header



// function Header() {
//     const [menuOpen, setMenuOpen] = useState(false);

//     const toggleMenu = () => {
//         setMenuOpen(!menuOpen);
//     };
//     const closeMenu = () => {
//         setMenuOpen(false);
//     };
//   return (
//     <div>
//         <section className={classes.header__wrapper}>
//                 <div className={classes.header_wrapper_logo}>
//                     <Link to="/"><img src={logo} alt="" /></Link>
//                 </div>
//                 <div className={`${classes.menuIcon} ${menuOpen ? classes.open : ''}`}>
//                     <button onClick={toggleMenu}>
//                         <span><MenuIcon /></span>
//                     </button>
//                     <div className={classes.dropdown_content} style={{ display: menuOpen ? 'block' : 'none' }}
//                     >
//                         <Link to=""><ClearIcon onClick={closeMenu}/></Link>
//                         <Link to="/">Home</Link>
//                         <Link to="/">How it Works</Link>
//                         <Link to="/signin"><button>SIGN IN</button></Link>
//                     </div>
//                 </div>
//                 <div className={classes.header_menubar}>
//                     <div className={classes.header_middle_wrapper}>
//                         <ul>
//                             <li><Link to="/"><span>Home</span></Link></li>
//                             <li><Link to="/"><span>How it Works</span></Link></li>

//                         </ul>
//                     </div>
//                     <div className={classes.header_signin_wrapper}>
//                         <button>
//                             <Link to="/login"><p>SIGN IN</p></Link>
//                         </button>
//                     </div>
//                 </div>
//             </section>
//     </div>
//   )
// }

// export default Header