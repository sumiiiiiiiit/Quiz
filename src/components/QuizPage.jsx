
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';

const QuizPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  
  const questions = {
    football: [
      {
        question: "Who won the 2018 FIFA World Cup?",
        options: ["France", "Croatia", "Brazil", "Germany"],
        correctAnswer: "France",
      },
      {
        question: "Which player has won the most Ballon d'Or awards?",
        options: ["Lionel Messi", "Cristiano Ronaldo", "Neymar", "Kaka"],
        correctAnswer: "Lionel Messi",
      },
      {
        question: "Who holds the record for most goals in a single Premier League season?",
        options: ["Mohamed Salah", "Harry Kane", "Alan Shearer", "Sergio Agüero"],
        correctAnswer: "Mohamed Salah",
      },
      {
        question: "Which country hosted the 2014 FIFA World Cup?",
        options: ["Brazil", "Russia", "South Africa", "Germany"],
        correctAnswer: "Brazil",
      },
      {
        question: "Which player is known as 'The Egyptian King'?",
        options: ["Mohamed Salah", "Sadio Mane", "Ahmed Hegazi", "Trezeguet"],
        correctAnswer: "Mohamed Salah",
      },
      {
        question: "Which club won the Champions League in 2020?",
        options: ["Bayern Munich", "Barcelona", "Real Madrid", "Liverpool"],
        correctAnswer: "Bayern Munich",
      },
      {
        question: "What is the maximum number of players a football team can have on the field?",
        options: ["10", "11", "12", "9"],
        correctAnswer: "11",
      },
      {
        question: "Who is the all-time top scorer in the Premier League?",
        options: ["Wayne Rooney", "Cristiano Ronaldo", "Alan Shearer", "Sergio Agüero"],
        correctAnswer: "Alan Shearer",
      },
      {
        question: "Which country is known as 'The land of football'?",
        options: ["Brazil", "Argentina", "Italy", "Spain"],
        correctAnswer: "Brazil",
      },
      {
        question: "Who is the manager of Manchester United (2025)?",
        options: ["Ole Gunnar Solskjaer", "Erik ten Hag", "Jose Mourinho", "Sir Alex Ferguson"],
        correctAnswer: "Erik ten Hag",
      },
    ],
    basketball: [
      {
        question: "Who won the NBA Championship in 2020?",
        options: ["Miami Heat", "Los Angeles Lakers", "Golden State Warriors", "Toronto Raptors"],
        correctAnswer: "Los Angeles Lakers",
      },
      {
        question: "Who is known as 'King James'?",
        options: ["Stephen Curry", "Kobe Bryant", "LeBron James", "Michael Jordan"],
        correctAnswer: "LeBron James",
      },
      {
        question: "Which NBA team drafted Michael Jordan?",
        options: ["Chicago Bulls", "Los Angeles Lakers", "Detroit Pistons", "Cleveland Cavaliers"],
        correctAnswer: "Chicago Bulls",
      },
      {
        question: "Which NBA team does Giannis Antetokounmpo play for?",
        options: ["Boston Celtics", "Milwaukee Bucks", "Philadelphia 76ers", "Toronto Raptors"],
        correctAnswer: "Milwaukee Bucks",
      },
      {
        question: "Who is the NBA's all-time top scorer?",
        options: ["LeBron James", "Kareem Abdul-Jabbar", "Michael Jordan", "Karl Malone"],
        correctAnswer: "Kareem Abdul-Jabbar",
      },
      {
        question: "Which team won the 1996 NBA Championship?",
        options: ["Chicago Bulls", "Miami Heat", "Los Angeles Lakers", "San Antonio Spurs"],
        correctAnswer: "Chicago Bulls",
      },
      {
        question: "Who holds the record for most three-pointers made in a season?",
        options: ["Stephen Curry", "Klay Thompson", "James Harden", "Ray Allen"],
        correctAnswer: "Stephen Curry",
      },
      {
        question: "Which team has won the most NBA titles?",
        options: ["Los Angeles Lakers", "Boston Celtics", "Chicago Bulls", "Golden State Warriors"],
        correctAnswer: "Los Angeles Lakers",
      },
      {
        question: "Who was the first NBA player to sign a billion-dollar contract?",
        options: ["Michael Jordan", "LeBron James", "Kobe Bryant", "Stephen Curry"],
        correctAnswer: "LeBron James",
      },
      {
        question: "Which country is the origin of the NBA?",
        options: ["Canada", "USA", "Brazil", "Spain"],
        correctAnswer: "USA",
      },
    ],
    cricket: [
      {
        question: "Who is known as the 'Master Blaster'?",
        options: ["Sachin Tendulkar", "Virat Kohli", "Brian Lara", "Ricky Ponting"],
        correctAnswer: "Sachin Tendulkar",
      },
      {
        question: "Which country won the ICC Cricket World Cup in 2019?",
        options: ["India", "Australia", "England", "New Zealand"],
        correctAnswer: "England",
      },
      {
        question: "Who is the fastest to score 1000 runs in ODI cricket?",
        options: ["AB de Villiers", "Virat Kohli", "Shane Watson", "Chris Gayle"],
        correctAnswer: "AB de Villiers",
      },
      {
        question: "Who has the most wickets in World Cup history?",
        options: ["Muttiah Muralitharan", "Shane Warne", "Wasim Akram", "Glenn McGrath"],
        correctAnswer: "Muttiah Muralitharan",
      },
      {
        question: "Who is the captain of the Indian cricket team (2025)?",
        options: ["MS Dhoni", "Virat Kohli", "Rohit Sharma", "KL Rahul"],
        correctAnswer: "Rohit Sharma",
      },
      {
        question: "Which team has won the most ICC T20 World Cups?",
        options: ["India", "Sri Lanka", "West Indies", "Australia"],
        correctAnswer: "West Indies",
      },
      {
        question: "Who holds the record for most runs in a single ODI match?",
        options: ["Shikhar Dhawan", "David Warner", "Chris Gayle", "Rohit Sharma"],
        correctAnswer: "Rohit Sharma",
      },
      {
        question: "What is the maximum number of overs in a standard ODI match?",
        options: ["30", "40", "50", "60"],
        correctAnswer: "50",
      },
      {
        question: "Who holds the record for most centuries in Test cricket?",
        options: ["Sachin Tendulkar", "Ricky Ponting", "Steve Smith", "Jack Hobbs"],
        correctAnswer: "Sachin Tendulkar",
      },
      {
        question: "Who is known as the 'Wall' of Indian cricket?",
        options: ["Virat Kohli", "Rohit Sharma", "Sourav Ganguly", "Rahul Dravid"],
        correctAnswer: "Rahul Dravid",
      },
    ],
  };


  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // Timer starts at 10 seconds
  const [questionsList, setQuestionsList] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null); // Track the selected option

  useEffect(() => {
    if (questions[category]) {
      setQuestionsList(questions[category]); // Set the questions based on category
    } else {
      navigate('/'); // If no valid category, redirect to home or login page
    }
  }, [category, navigate]);

  useEffect(() => {
    let timer;

    if (timeLeft > 0 && selectedOption === null) {
      // Timer logic to decrease time every second
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    // Cleanup the timer
    if (timeLeft === 0 || selectedOption !== null) {
      clearInterval(timer);
    }

    // Move to next question when timer hits 0 or if option is selected
    if (timeLeft === 0 && selectedOption === null) {
      handleNextQuestion(false);
    }

    return () => clearInterval(timer); // Cleanup timer on unmount or dependencies change
  }, [timeLeft, selectedOption]);

  const handleAnswer = (answer) => {
    setSelectedOption(answer);
    if (answer === questionsList[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  
    // Move to next question after 1 second for feedback
    setTimeout(() => {
      handleNextQuestion();
    }, 300);
  };
  

  const handleNextQuestion = (answeredCorrectly = true) => {
    if (currentQuestion < questionsList.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(10); // Reset the timer for the next question
      setSelectedOption(null); // Reset the selected option
    } else {
      navigate('/result', { state: { score, total: questionsList.length } }); // Navigate to result page
    }
  };

  if (questionsList.length === 0) {
    return <div>Loading or Invalid Category...</div>;
  }

  return (
    <div style={styles.container}>
      <Header />
      {/* Timer Display */}
       
  
    <div style={styles.timer}>
      Time Left: {timeLeft}s
    </div>
      <div style={styles.questionContainer}>
        <p style={styles.questionText}>{questionsList[currentQuestion].question}</p>
        <div style={styles.optionContainer}>
          {questionsList[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              style={styles.optionButton}
              disabled={selectedOption !== null} // Disable buttons after selection
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
const styles = {
  container: {
    padding: '30px',
    textAlign: 'center',
    background: 'linear-gradient(to right, #00c6ff, #0072ff)',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Needed to position timer absolutely inside this container
  },
  title: {
    color: '#ffffff',
    marginBottom: '30px',
    fontSize: '36px',
    fontWeight: 'bold',
    letterSpacing: '2px',
  },
  questionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    maxWidth: '700px',
    background: 'linear-gradient(to right, #00c6ff, #0072ff)',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  },
  questionText: {
    fontSize: '28px',
    color: 'white',
    marginBottom: '25px',
    lineHeight: '1.5',
    fontWeight: '600',
  },
  optionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    background: 'transparent',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: 'none',
  },
  optionButton: {
    padding: '15px 25px',
    backgroundColor: 'Beige',
    color: 'black',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s, transform 0.3s ease',
  },
  optionButtonHover: {
    backgroundColor: '#45a049',
    transform: 'scale(1.05)',
  },
  optionButtonActive: {
    backgroundColor: '#388e3c',
  },
  timer: {
    position: 'absolute',
    top: '20px',
    right: '30px',
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 'bold',
    background: 'rgba(0, 0, 0, 0.2)',
    padding: '8px 15px',
    borderRadius: '8px',
  },
};
export default QuizPage;