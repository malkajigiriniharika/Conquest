import { createContext, useState, useEffect } from "react";
// import QuizJson from "./quiz.json";
import { useMutation, useQuery } from "@apollo/client";

import { SCORE_MUTATION, LEADERBOARD_QUERY } from "../../../graphqlServices/AllServices";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  // Quiz state management
  const [allQuestions, setAllQuestions] = useState([]); // Store all 100 questions
  const [quizs, setQuizs] = useState([]);
  const [question, setQuestion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [marks, setMarks] = useState(0);

  // Display control states
  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Display Leaderboard
  const[leaderBoard, setLeaderBoard] = useState([]);

  // Display timer
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);

  const [updateScore, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(SCORE_MUTATION);
  const { data: queryData, loading: queryLoading, error: queryError, refetch: fetchLeaderBoard } = useQuery(LEADERBOARD_QUERY);


  //Displaying and Loading timer
  useEffect(() => {
    let timer;
    if (isRunning && time < 3600) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    if (time >= 3600) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  //format the time:
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };
  //Displaying Leaderboard
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const { data } = await fetchLeaderBoard();
        setLeaderBoard(data?.getLeaderboard || []);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      }
    };
  
    fetchData();
  },[showStart]);

  // ✅ Fisher-Yates shuffle function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // ✅ Load all 100 questions once
  useEffect(() => {
    fetch("/quiz.json")
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.length < 10) {
          console.error("Not enough questions in JSON!");
          return;
        }
        setAllQuestions(data); // Store all questions for future reference
      });
  }, []);

  // ✅ Function to get a new batch of 10 unique questions
  const getNewQuestions = () => {
    if (allQuestions.length < 10) {
      console.error("Not enough questions available!");
      return;
    }

    // ✅ Shuffle the entire set of 100 questions and pick the first 10 unique ones
    const selectedQuestions = shuffleArray([...allQuestions]).slice(0, 10);

    // ✅ Shuffle answer choices inside each question
    const formattedQuestions = selectedQuestions.map((q) => ({
      ...q,
      options: shuffleArray([...q.options]),
    }));

    setQuizs(formattedQuestions);
  };

  // ✅ Start Quiz with a new batch of 10 questions
  const startQuiz = () => {
    getNewQuestions(); // Get a fresh 10-question batch
    setQuestionIndex(0);
    setShowStart(false);
    setShowQuiz(true);
    setIsRunning(true);

  };

  // Set the current question
  useEffect(() => {
    if (quizs.length > questionIndex) {
      setQuestion(quizs[questionIndex]);
    }
  }, [quizs, questionIndex]);

  // Check Answer
  const checkAnswer = (event, selected) => {
    if (!selectedAnswer) {
      setCorrectAnswer(question.answer);
      setSelectedAnswer(selected);

      if (selected === question.answer) {
        event.target.classList.add("bg-success");
        setMarks(marks + 5);
      } else {
        event.target.classList.add("bg-danger");
      }
    }
  };

  // Next Question
  const nextQuestion = () => {
    setCorrectAnswer("");
    setSelectedAnswer("");

    document.querySelector("button.bg-danger")?.classList.remove("bg-danger");
    document.querySelector("button.bg-success")?.classList.remove("bg-success");

    setQuestionIndex(questionIndex + 1);
  };

  // Show Result
  const showTheResult = async () => {
    setShowResult(true);
    setShowStart(false);
    setShowQuiz(false);
    setIsRunning(false);
    try{
      const email= localStorage.getItem("email");
      console.log("Email got from local , marks, time "+ email+", "+marks+", "+time);
      const score =marks;
      const response = await updateScore({variables:{email,score,time}});
      console.log(response.data);
    }
    catch(err){
      console.log("Error from update : "+err);
    }
  };

  // Start Over (Resets and picks a new 10-question set)
  const startOver = () => {
    getNewQuestions(); // ✅ Get a new batch of 10 unique questions
    setShowStart(true);
    setShowResult(false);
    setShowQuiz(false);
    setCorrectAnswer("");
    setSelectedAnswer("");
    setQuestionIndex(0);
    setMarks(0);

    document.querySelector("button.bg-danger")?.classList.remove("bg-danger");
    document.querySelector("button.bg-success")?.classList.remove("bg-success");
  };


  return (
    <DataContext.Provider
      value={{
        startQuiz,
        showStart,
        showQuiz,
        question,
        quizs,
        checkAnswer,
        correctAnswer,
        selectedAnswer,
        questionIndex,
        nextQuestion,
        showTheResult,
        showResult,
        marks,
        startOver,
        time,
        formatTime,
        leaderBoard,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;




