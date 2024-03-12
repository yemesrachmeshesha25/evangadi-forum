import { useContext } from "react"
import { AppState } from '../../App';
// import classes from './Home.module.css'
import AskQuestion from "../../Components/AskQuestions/AskQuestions"
import Question from "../../Components/Question/Question";
import Header from "../Header/Header";
//  import Footer from "../Footer/Footer";
import { useNavigate , Link } from "react-router-dom";
import { PiUserCircleDuotone } from "react-icons/pi";
import { FaAngleRight } from "react-icons/fa6";
import "../../index.css";

const Home = () => {
  const { user, question } = useContext(AppState);
  console.log(question);
  console.log(user);

  const navigate = useNavigate();
  const handleAnswerClick = () => {
    navigate("/answer"); // Navigates to the "/answer" route
  };

  const handleAskQuestionClick = () => {
    navigate("/questions"); // Navigates to the "/questions" route
  };

  return (
    <>
      <Header />
      <section className=" bg-body-tertiary">
        <div className="d-flex justify-content-around pt-5  ">
          <a
            href="#"
            onClick={handleAskQuestionClick}
            className="btn btn-primary action_btn px-5"
          >
           
            Ask Question
          </a>
            <p className="fw-semibold">
            <span className="text-warning">Welcome:  </span>{user.username}
          </p>
        </div>

        <div className="container mt-5">
          <h2>Question</h2>

          {question.allquestion &&
            question.allquestion.map((item, index) => (
              <Link
              className="text-decoration-none text-black"
              key={index}
              to={`/answer?title=${encodeURIComponent(item.title)}&description=${encodeURIComponent(item.description)}&questionid=${encodeURIComponent(item.questionid)}`}
            >
              <hr />
              <div className="d-flex justify-content-between align-items-center ">
                <div className="d-flex flex-column align-items-center gap-3">
                  {/* user */}
                  <div className="user-icon">
                    <PiUserCircleDuotone />
                  </div>
                  <div>{item.username}</div>
                </div>
                <div>
                  {/* question */}
                  <p>{item.title}</p>
                </div>
                <div>
                  {/* arrow */}
                  <FaAngleRight />
                </div>
              </div>
            </Link>
            ))}
        </div>
        
      </section>

    </>
  );
};

export default Home;

// function Home() {
//   const { user, questions } = useContext(AppState);
//   const [firstName, setFirstName] = useState(' ');
//   const [userQuestions, setUserQuestions] = useState([])

//   useEffect(() => {
//     if (user) {
//       setFirstName(user.firstname);
//     }
//   }, [user]);
//   useEffect(() => {
//     if (questions) {
//       setUserQuestions(questions);
//     }
//   }, [questions]);

//   useEffect(() => {
//     console.log("userQuestions:", userQuestions);
//   }, [userQuestions]);


//   return (
//     <section>
//       <div>
//         <Header />
//       </div>
//       <hr className={classes.hr} />

//       <div className={classes.home_body_wrapper}>
//         <div className={classes.top_body_wrapper}>
//           <div className={classes.ask_questions}>
//             <button><Link to={"/ask-questions"}>Ask Questions</Link></button>
//           </div>

//           <div className={classes.search_input}>
//             <input
//               type="search"
//               placeholder="Search Questions"
//             />
//           </div>
//           <div className={classes.username_wrapper}>
//           <h2>Wellcome :{user.username}</h2>
//           </div>
//         </div>
//       <div>
//           <h2>Questions</h2>
          
//         </div>
//       </div>

//       <div>
//         <Footer />
//       </div>
//     </section>
//   );
// }

// export default Home;


{/* div>
          <h2>Questions</h2>
        </div>
        <div>users and questions</div>
      </div> */}



// function Home() {
//   const { user } =  useContext(AppState);
//   return (
//    <div>
//     <h1>Home</h1>
//     <br />
//     <br />
//     <br />
//     <h2>welcome : {user.username}</h2>
//     </div>
//   );
// }

// export default Home