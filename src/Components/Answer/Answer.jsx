import React, { useRef, useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../API/axiosConfig.js";
import { AppState } from "../../App.jsx";
import Header from "../../pages/Header/Header.js";
import { PiUserCircleDuotone } from "react-icons/pi";

const Answer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const question = queryParams.get("question");
  const questiondescription = queryParams.get("questiondescription");

  const questionid = queryParams.get("questionid");

  const { user } = useContext(AppState);

  const [data, setData] = useState({});

  const token = localStorage.getItem("token");

  const answerDom = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const answerValue = answerDom.current.value;
    const userid = user.userid;

    if (!questionid || !userid || !answerValue) {
      alert("please provide all required fields");
      return;
    }

    try {
      await axios.post(
        "/answers/postanswers",
        {
          userid: userid,
          questionid: questionid,
          answer: answerValue,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      answerDom.current.value = "";

      alert("answer posted succesfully");
      window.location.reload();
    } catch (error) {
      alert(" something went wrong");
      console.log(error.response);
    }
  }
  console.log(token)
  async function getAnswer() {
    try {
      const response = await axios.get("/answers/all-answers", {
        headers: {
          Authorization: "Bearer " + token,
          questionid: questionid,
        },
      });
      
      setData(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error.response);
    }
  }
  useEffect(() => {
    getAnswer();
  }, []);

  return (
    <section>
      <Header />
      <div className="landing bg-body-tertiary  pt-3">
        <div className="container   pt-3">
          <div className="">
            <span className="fw-semibold fs-2 ">Question</span> <br />
            <span className="fw-semibold fs-5">{question}</span>
            <span>
              <p>{questiondescription} </p>
            </span>
          </div>

          <div>
            <hr />
            <span className="fw-semibold fs-3">Answer From The Community</span>
      
          </div>
          <div>
            {data.allanswer &&
              data.allanswer.map((item, index) => (
                <div
                  key={index}
                  className="text-decoration-none text-black"
                >
                  <hr />
                  <div className="d-flex justify-content-between">
                    <div className="d-md-flex align-items-center">
                      <div className="user">
                        {/* user */}
                        <div>
                          <PiUserCircleDuotone />
                        </div>
                        <div>{item.username}</div>
                      </div>
                      <div>
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="d-flex flex-column align-items-center container  shadow-sm p-2 mb-5 bg-body rounded">
          <div className="mt-5 pt-4">
            {/* Ask Q Part */}
            <div>
              <h3>Answer The Top Question </h3>
            </div>
            <div className="align-items-center mt-2">
              <p>Go to Question page</p>
            </div>
          </div>

          <div className="container">
            {/* form part */}
            <form action="" className="" onSubmit={handleSubmit}>
              <div>
                <textarea
                  className="form-control p-4"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Answer"
                  ref={answerDom}
                ></textarea>
              </div>

              <div className=" mt-2">
                <button
                  className="btn btn-primary fw-bold px-5 action_btn"
                  type="Submit"
                >
                  Post Your Answer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Answer;