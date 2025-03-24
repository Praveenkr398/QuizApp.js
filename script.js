const progressBar = document.querySelector(".progress-bar");
const progressText = document.querySelector(".progress-text");

const progress = (value, totalTime) => {
  const percentage = (value / totalTime) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerHTML = `${value}`;
};

let questions = [],
  time = 30,
  score = 0,
  currentQuestion = 0,
  timer;

const startBtn = document.querySelector(".start");
const numQuestions = document.querySelector("#numQuestion");
const category = document.querySelector("#category");
const difficulty = document.querySelector("#difficulty");
const timePerQuestion = document.querySelector("#time");
const quiz = document.querySelector(".quiz");
const startScreen = document.querySelector(".start-screen");

const startQuiz = () => {
  const num = numQuestions.value;
  const catg = category.value;
  const diff = difficulty.value;
  startBtn.innerHTML = "loading..";

  console.log(num, diff, catg);
  if (!num || !catg || !diff) {
    alert("Please fill out all fields.");
    return;
  }

  const url = `https://opentdb.com/api.php?amount=${num}&category=${catg}&difficulty=${diff}&type=multiple`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      if (data.results.length === 0) {
        alert("No questions found. Please try different settings.");
        return;
      }
      questions = data.results;
      startScreen.classList.add("hide");
      quiz.classList.remove("hide");
      console.log(questions[0].correct_answer);
      currentQuestion = 0;
      showQuestion(questions[currentQuestion]);
    })
    .catch((error) => {
      console.error("Error fetching questions:", error);
      alert("Failed to fetch questions. Please try again later.");
    });

};

startBtn.addEventListener("click", startQuiz);

const submitBtn = document.querySelector(".submit");
const nextBtn = document.querySelector(".next");

const showQuestion = (question) => {
  const questionText = document.querySelector(".question");
  const answersWrapper = document.querySelector(".answer-wrapper");
  const questionNumber = document.querySelector(".number");

  questionText.innerHTML = question.question;

  const answers = [...question.incorrect_answers, question.correct_answer];
  answers.sort(() => Math.random() - 0.5);
  answersWrapper.innerHTML = "";
  answers.forEach((answer) => {
    answersWrapper.innerHTML += `
      <div class="answer">
        <span class="text">${answer}</span>
        <span class="checkbox"><span class="icon">✔️</span></span>
      </div>
    `;
  });

  questionNumber.innerHTML = `
    <div class="number">
      Question :
      <span class="current">${currentQuestion + 1}</span>
      <span class="total">/${questions.length}</span>
    </div>
  `;

  const answerDiv = document.querySelectorAll(".answer");
  answerDiv.forEach((answer) => {
    answer.addEventListener("click", () => {
      if (!answer.classList.contains("checked")) {
        answerDiv.forEach((answer) => {
          answer.classList.remove("selected");
        });
        answer.classList.add("selected");
        submitBtn.disabled = false;
      }
    });
  });

  time = timePerQuestion.value;
  startTimer(time);
};

const startTimer = (time) => {
  timer = setInterval(() => {
    if (time >= 0) {
      progress(time, timePerQuestion.value);
      time--;
    } else {
      checkAnswer();
    }
  }, 1000);
};

submitBtn.addEventListener("click", () => {
  checkAnswer();
});

const checkAnswer = () => {
  clearInterval(timer);

  const selectedAnswer = document.querySelector(".answer.selected");
  if (selectedAnswer) {
    const answer = selectedAnswer.querySelector(".text");
    if (answer.innerHTML === questions[currentQuestion].correct_answer) {
      score++;
      selectedAnswer.classList.add("correct");
    } else {
      selectedAnswer.classList.add("wrong");
      document.querySelectorAll(".answer").forEach((answer) => {
        if (
          answer.querySelector(".text").innerHTML ===
          questions[currentQuestion].correct_answer
        ) {
          answer.classList.add("correct");
        }
      });
    }
  } else {
    document.querySelectorAll(".answer").forEach((answer) => {
      if (
        answer.querySelector(".text").innerHTML ===
        questions[currentQuestion].correct_answer
      ) {
        answer.classList.add("correct");
      }
    });
  }

  const answerDiv = document.querySelectorAll(".answer");
  answerDiv.forEach((answer) => {
    answer.classList.add("checked");
  });

  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
};

nextBtn.addEventListener("click", () => {
  nextQuestion();
  submitBtn.style.display = "block";
  nextBtn.style.display = "none";
});

const nextQuestion = () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    clearInterval(timer);
    showQuestion(questions[currentQuestion]);
  } else {
    showScore();
  }
};

const endScreen = document.querySelector(".end-screen");
const finalScore = document.querySelector(".final-score");
const totalScore = document.querySelector(".total-score");

const celebrationSound = new Audio("celebration.mp3");
const showScore = () => {
  endScreen.classList.remove("hide");
  quiz.classList.add("hide");

  // Display the score
  finalScore.innerHTML = score;
  totalScore.innerHTML = `/${questions.length}`;

  // Trigger confetti effect
  confetti({
    particleCount: 100, // Number of confetti particles
    spread: 70, // How far the particles spread
    origin: { y: 0.6 }, // Start from the bottom
  });

  // Play celebration sound
  celebrationSound.play();

  // Optional: Add multiple bursts of confetti
  setTimeout(() => confetti({ particleCount: 50, spread: 100 }), 500);
  setTimeout(() => confetti({ particleCount: 50, spread: 100 }), 1000);
};

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  questions = [];
  time = 30;
  score = 0;
  currentQuestion = 0;
  clearInterval(timer);
  startScreen.classList.remove("hide");
  quiz.classList.add("hide");
  endScreen.classList.add("hide");
  progressBar.style.width = "0%";
  progressText.innerHTML = "";
  startBtn.innerHTML = "";

});
