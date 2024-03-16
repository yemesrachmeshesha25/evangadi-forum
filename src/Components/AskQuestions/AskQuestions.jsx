import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import Header from '../../pages/Header/Header';
import axios from '../../API/axiosConfig'
import { v4 as uuidv4 } from "uuid";
import { AppState } from "../../App";

const AskQuestion = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppState);
  const token = localStorage.getItem("token");

  const questionDom = useRef(null);
  const questiondescriptionDom = useRef(null);
  const tagsDom = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const questionValue = questionDom.current.value;
    const questiondescriptionValue = questiondescriptionDom.current.value;
    const tagsValue = tagsDom.current.value;
     const questionid = uuidv4();
     const userid = user;
    console.log(userid);

    if (
       !questionid ||
       !userid ||
      !questionValue ||
      !questiondescriptionValue|| 
       !tagsValue
    ) {
      alert("please provide all required fields");
      return;
    }

    try {
      const response = await axios.post(
        "/questions/questions",
        {
          question: questionValue,
          questiondescription: questiondescriptionValue,
         
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      questionDom.current.value = "";
      questiondescriptionDom.current.value = "";
       tagsDom.current.value = "";
      console.log(response, "response");
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    } catch (error) {
      alert("something went wrong");
      console.log(error.response);
    }
 }

  return (
    <section>
      <Header />
      <div className="container d-flex flex-column align-items-center mt-4 ">
        <div className="justify-content-around ">
          <h2>Steps to Write a good questions </h2>
        </div>

        <div>
          {/*step to write Q  */}
          <ul>
            <li> Summarize you problem in one-line title</li>
            <li> Describe your problem in more detail</li>
            <li>Describe what you tried and What you expected to happen </li>
            <li>Review your question and post it to the site </li>
          </ul>
        </div>
      </div>

      <div className="d-flex flex-column align-items-center container  shadow-sm p-3 mb-5 bg-body rounded">
        <div className="mt-5 pt-4">
          {/* Ask Q Part */}
          <div>
            <h3>Ask a Public question </h3>
          </div>
          <div className="align-items-center">
            <p>Go to Question page</p>
          </div>
        </div>

        <div className="container">
          {/* form part */}
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Title"
                className="form-control "
                ref={questionDom}
              />
            </div>
            <div>
              <textarea
                className="form-control p-4"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Question Description... "
                ref={questiondescriptionDom}
              ></textarea>
            </div>
            <div>
              <input
                type="text"
                placeholder="tag"
                className="form-control mt-2 "
                ref={tagsDom}
              />
            </div>
            <div className=" mt-2">
              <button
                className="btn btn-primary fw-bold px-5 action_btn"
                type="Submit"
              >
                Post Your Question
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AskQuestion;






// import React, { useContext,useState,useRef,useEffect } from 'react';
// import classes from './AskQuestions.module.css';
// import { Link, useNavigate } from 'react-router-dom';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import Footer from '../../pages/Footer/Footer';
// import Header from '../../pages/Header/Header';
// import axios from '../../API/axiosConfig'
// import LightbulbIcon from '@mui/icons-material/Lightbulb';
// import {AppState} from "../../App"


// function AskQuestions() {
//   const { setQuestions } = useContext(AppState);
//   const questionDom = useRef(null);
//   const questiondescriptionDom = useRef(null);
//   const [editorContent, setEditorContent] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   async function fetchQuestions() {
//     try {
//       const response = await axios.get('/questions/all-questions');
//       setQuestions(response.data.questions);
//       console.log("Questions:", response.data.questions);
//     } catch (error) {
//       console.error("Error fetching questions:", error);
//     }
//   }

//   async function postQuestionSubmit(e) {
//     e.preventDefault();

    
//     if (!questionDom.current) {
//         console.error('Question input ref is not initialized.');
//         return;
//     }

//     const questionValue = questionDom.current.value;

//     if (!questionValue) {
//         alert("Please provide your question");
//         return;
//     }

//     try {
//         const token = localStorage.getItem("token");
//         const response = await axios.post(
//             'questions/add-questions', 
//             {
//                 question: questionValue,
//                 questiondescription: editorContent, 
//             },
//             {
//                 headers: {
//                     Authorization: "Bearer " + token,
//                 },
//             }
//         );

//         console.log(response.config);
//         console.log("Response", response);

//         const responseData = response.config.data;

//         if (responseData) {
//             alert("Question posted successfully.");

//             navigate('/');
//         } else {
//             console.error("Response data is undefined", response);
//             alert("Failed to post question. Please try again later.");
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         alert("Failed to post question. Please try again later.");
//     }
// }

//   return (
//     <section>
//       <div>
//         <Header />
//       </div>
//       <hr className={classes.hr} />
      
//       <div className={classes.question_description}>
//         <h2> <span><LightbulbIcon /></span>Steps to write a good question <span><LightbulbIcon /></span></h2>
//         <div className={classes.dotted_lines}>
//           <li>Summarize your problem in a one-line title.</li>
//           <li>Describe your problem in more detail.</li>
//           <li>Describe what you tried and what you expected to happen.</li>
//           <li>Review your question and post it to the site.</li>
//         </div>
//       </div>
//       <div className={classes.publicQuestion_wrapper}>
//         <h2>Ask a public question</h2>
//         <p>Go to Question Page</p>
//         <input type="text" 
//                 placeholder='Question Title'
//         />

//         <div className={classes.reactQuill_wrapper}>
//             <ReactQuill 
//               value={editorContent} 
//               onChange={setEditorContent} 
//               placeholder="Question Description..."
              
//             />
//         </div>
//           <Link to="/">
//           <button className={classes.publicQuestion_button_wrapper}>Post Your Question</button>
//           </Link>
//       </div>
//       <Footer />
//     </section>
//   );
// }

// export default AskQuestions;