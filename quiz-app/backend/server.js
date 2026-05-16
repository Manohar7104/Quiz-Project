const express = require("express");
const cors = require("cors");
const questions = require("./questions");

const app = express();
app.use(cors());
app.use(express.json());

// Helper to remove answers before sending
function stripAnswers(list) {
  return list.map((q) => ({
    id: q.id,
    question: q.question,
    options: q.options,
  }));
}

app.get("/questions/:subject", (req, res) => {
  const subject = req.params.subject;
  const subjectKey = subject && subject.toString();
  if (!questions[subjectKey]) {
    return res.status(404).json({ error: "Subject not found" });
  }
  res.json(stripAnswers(questions[subjectKey]));
});

app.post("/submit", (req, res) => {
  const { subject, answers } = req.body || {};
  if (!subject || !answers) {
    return res.status(400).json({ error: "Missing subject or answers" });
  }
  const subjectKey = subject.toString();
  const bank = questions[subjectKey];
  if (!bank) return res.status(400).json({ error: "Invalid subject" });

  let score = 0;
  const review = bank.map((q) => {
    const found = (answers || []).find(
      (a) => Number(a.questionId) === Number(q.id),
    );
    const selected = found ? found.selectedAnswer : null;
    const isCorrect = selected === q.answer;
    if (isCorrect) score += 1;
    return {
      question: q.question,
      selectedAnswer: selected,
      correctAnswer: q.answer,
      isCorrect,
    };
  });

  const total = bank.length;
  const percentage = Math.round((score / total) * 100);

  res.json({ score, total, percentage, review });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Quiz backend running on port ${PORT}`));
