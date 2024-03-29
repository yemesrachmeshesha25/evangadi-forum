import { useContext } from "react"
import { AppState } from '../../App';
import AskQuestion from "../../Components/AskQuestions/AskQuestions"
import Header from "../Header/Header";
import { useNavigate , Link } from "react-router-dom";
import { PiUserCircleDuotone } from "react-icons/pi";
import { FaAngleRight } from "react-icons/fa6";
import "../../index.css";
import Footer from "../Footer/Footer";

const Home = () => {
  const { user, question } = useContext(AppState);
  console.log(question);
  console.log(user);

  const navigate = useNavigate();

  // Function to handle clicking on the "Ask Question" button
  const handleAskQuestionClick = () => {
    navigate("/questions"); 
  };

  return (
    <>
      <Header />
      <section className=" bg-body-tertiary">
        <div className="d-flex justify-content-around pt-5  ">
          {/* Ask Question button */}
          <a
            href="#"
            onClick={handleAskQuestionClick}
            className="btn btn-primary action_btn px-5"
          >
            Ask Question
          </a>
          {/* Display username if user object is not null */}
          {user && (
            <p className="fw-semibold">
              <span className="text-warning">Welcome:  </span>{user.username}
            </p>
          )}
        </div>

        <div className="container mt-5">
          <h2>Question</h2>

          {question.questions && (
            question.questions.map((item, index) => (
              <Link
                className="text-decoration-none text-black"
                key={index}
                to={`/answer?question=${encodeURIComponent(item.question)}&questiondescription=${encodeURIComponent(item.questiondescription)}&questionid=${encodeURIComponent(item.questionid)}`}
              >
                <hr />
                <div className="d-flex justify-content-between align-items-center ">
                  <div className="d-md-flex align-items-center gap-4">
                    <div className="d-flex flex-column align-items-center gap-3">
                      {/* user */}
                      <div>
                        <PiUserCircleDuotone size={90}/>
                      </div>
                      <div>{item.username}</div>
                    </div>
                    <div>
                      {/* question */}
                      <p>{item.question}</p>
                    </div>
                  </div>
                  <div>
                    {/* arrow */}
                    <FaAngleRight />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
        <Footer />
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