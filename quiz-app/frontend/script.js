const apiBase = "http://localhost:4000";

// App state
let username = "";
let subject = "";
let questions = [];
let currentIndex = 0;
let selectedAnswers = {}; // questionId -> selected option
let statusMap = {}; // questionId -> 'unanswered'|'answered'|'review'

// DOM
const qs = (id) => document.getElementById(id);
const welcomeScreen = qs("welcome-screen");
const subjectScreen = qs("subject-screen");
const quizScreen = qs("quiz-screen");
const resultScreen = qs("result-screen");

function show(element) {
  [welcomeScreen, subjectScreen, quizScreen, resultScreen].forEach((s) =>
    s.classList.remove("active"),
  );
  element.classList.add("active");
}

function showWelcomeScreen() {
  show(welcomeScreen);
}

function showSubjectScreen() {
  qs("greet-name").textContent = `Hello, ${username}`;
  show(subjectScreen);
}

function showQuizScreen() {
  qs("quiz-title").textContent = `${subject} Quiz`;
  qs("user-info").textContent = `User: ${username}`;
  qs("question-count").textContent = `Total Questions: ${questions.length}`;
  show(quizScreen);
  renderQuestion();
  buildPalette();
}

function showResultScreen(data) {
  qs("score-summary").textContent =
    `Score: ${data.score} / ${data.total} (${data.percentage}%)`;
  const reviewList = qs("review-list");
  reviewList.innerHTML = "";
  data.review.forEach((r) => {
    const div = document.createElement("div");
    div.className = "review-item";
    div.innerHTML = `<strong>${r.question}</strong><div>Selected: ${r.selectedAnswer || "None"}</div><div>Correct: ${r.correctAnswer}</div><div>Correct?: ${r.isCorrect ? "Yes" : "No"}</div>`;
    reviewList.appendChild(div);
  });
  show(resultScreen);
}

// Load questions from backend
async function loadQuestionsFor(subjectName) {
  try {
    const res = await fetch(
      `${apiBase}/questions/${encodeURIComponent(subjectName)}`,
    );
    if (!res.ok) throw new Error("Failed to load questions");
    const data = await res.json();
    questions = data;
    // init state
    questions.forEach((q) => {
      statusMap[q.id] = "unanswered";
      selectedAnswers[q.id] = null;
    });
  } catch (err) {
    alert("Could not load questions. Make sure backend is running.");
    console.error(err);
  }
}

function renderQuestion() {
  const q = questions[currentIndex];
  if (!q) return;
  qs("question-text").textContent = `${currentIndex + 1}. ${q.question}`;
  const optionsList = qs("options-list");
  optionsList.innerHTML = "";
  q.options.forEach((opt) => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.addEventListener("click", () => {
      selectOption(q.id, opt, li);
    });
    if (selectedAnswers[q.id] === opt) li.classList.add("selected");
    optionsList.appendChild(li);
  });
}

function selectOption(qid, opt, li) {
  selectedAnswers[qid] = opt;
  // update classes
  const items = qs("options-list").querySelectorAll("li");
  items.forEach((i) => i.classList.remove("selected"));
  li.classList.add("selected");
}

function buildPalette() {
  const palette = qs("palette");
  palette.innerHTML = "";
  questions.forEach((q, idx) => {
    const btn = document.createElement("button");
    btn.textContent = idx + 1;
    btn.className = statusMap[q.id] || "unanswered";
    btn.addEventListener("click", () => {
      currentIndex = idx;
      renderQuestion();
      updatePalette();
    });
    palette.appendChild(btn);
  });
}

function updatePalette() {
  const palette = qs("palette");
  const buttons = palette.querySelectorAll("button");
  buttons.forEach((btn, idx) => {
    const qid = questions[idx].id;
    btn.className = statusMap[qid] || "unanswered";
  });
}

function nextQuestion() {
  if (currentIndex < questions.length - 1) currentIndex += 1;
  renderQuestion();
  updatePalette();
}

function saveAndNext() {
  const qid = questions[currentIndex].id;
  if (selectedAnswers[qid]) statusMap[qid] = "answered";
  else statusMap[qid] = "unanswered";
  updatePalette();
  nextQuestion();
}

function markForReview() {
  const qid = questions[currentIndex].id;
  statusMap[qid] = "review";
  updatePalette();
  nextQuestion();
}

function clearAnswer() {
  const qid = questions[currentIndex].id;
  selectedAnswers[qid] = null;
  statusMap[qid] = "unanswered";
  renderQuestion();
  updatePalette();
}

async function submitQuiz() {
  // prepare payload
  const payload = {
    subject,
    answers: questions.map((q) => ({
      questionId: q.id,
      selectedAnswer: selectedAnswers[q.id],
    })),
  };

  try {
    const res = await fetch(`${apiBase}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
      showResultScreen(data);
    } else {
      alert(data.error || "Submission failed");
    }
  } catch (err) {
    alert("Submission error");
    console.error(err);
  }
}

// Event wiring
qs("continue-btn").addEventListener("click", () => {
  const val = qs("username").value.trim();
  if (!val) {
    alert("Please enter your name");
    return;
  }
  username = val;
  showSubjectScreen();
});

document.querySelectorAll(".subject-btn").forEach((b) => {
  b.addEventListener("click", (e) => {
    document
      .querySelectorAll(".subject-btn")
      .forEach((x) => x.classList.remove("active"));
    e.target.classList.add("active");
    subject = e.target.dataset.subject;
  });
});

qs("start-quiz-btn").addEventListener("click", async () => {
  if (!subject) {
    alert("Please select a subject");
    return;
  }
  await loadQuestionsFor(subject);
  currentIndex = 0;
  showQuizScreen();
});

qs("save-next").addEventListener("click", saveAndNext);
qs("mark-review").addEventListener("click", markForReview);
qs("clear-answer").addEventListener("click", clearAnswer);
qs("submit-quiz").addEventListener("click", () => {
  if (confirm("Submit quiz now?")) submitQuiz();
});
qs("restart-btn").addEventListener("click", () => location.reload());

// initial
showWelcomeScreen();
