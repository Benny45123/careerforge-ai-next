"use client";
import { generateQuiz } from "@/app/services/BackendHandler";
import { useState, useRef } from "react";
// ─── Fonts (using next/font pattern) ───────────────────────────────────────
// Replace with your actual font imports from next/font/google
// import { Syne } from "next/font/google";
// const syne = Syne({ subsets: ["latin"], weight: ["400", "700"] });

// ─── Helpers ───────────────────────────────────────────────────────────────
const VERDICT_META = {
  strong:     { label: "Strong",     bg: "bg-emerald-500/15", text: "text-emerald-300", bar: "bg-emerald-500", dot: "bg-emerald-400" },
  acceptable: { label: "Acceptable", bg: "bg-amber-500/15",   text: "text-amber-300",   bar: "bg-amber-500",   dot: "bg-amber-400"   },
  weak:       { label: "Weak",       bg: "bg-red-500/15",     text: "text-red-400",     bar: "bg-red-500",     dot: "bg-red-400"     },
};

const DIFFICULTY_META = {
  easy:   { label: "Easy",   cls: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30" },
  medium: { label: "Medium", cls: "bg-amber-500/10   text-amber-400   ring-1 ring-amber-500/30"   },
  hard:   { label: "Hard",   cls: "bg-red-500/10    text-red-400    ring-1 ring-red-500/30"    },
};

const TYPE_META = {
  technical:  { label: "Technical",  icon: "⚙" },
  project:    { label: "Project",    icon: "📁" },
  behavioral: { label: "Behavioral", icon: "🧠" },
};

const ScoreRing = ({ score }) => {
  const pct = (score / 10) * 100;
  const color = score >= 8 ? "#10b981" : score >= 5 ? "#f59e0b" : "#ef4444";
  const circumference = 2 * Math.PI * 22;
  const strokeDash = (pct / 100) * circumference;
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" className="shrink-0">
      <circle cx="30" cy="30" r="22" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5" />
      <circle
        cx="30" cy="30" r="22"
        fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={`${strokeDash} ${circumference}`}
        strokeLinecap="round"
        transform="rotate(-90 30 30)"
        style={{ transition: "stroke-dasharray 0.8s cubic-bezier(0.4,0,0.2,1)" }}
      />
      <text x="30" y="34" textAnchor="middle" fontSize="14" fontWeight="700" fill={color}>{score}</text>
    </svg>
  );
};

const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);

const ProgressBar = ({ value, max = 10, colorClass = "bg-blue-500" }) => (
  <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
    <div
      className={`h-full rounded-full ${colorClass} transition-all duration-700`}
      style={{ width: `${(value / max) * 100}%` }}
    />
  </div>
);

// ─── Evaluation Card ────────────────────────────────────────────────────────
const EvaluationCard = ({ evaluation }) => {
  const v = VERDICT_META[evaluation.verdict] ?? VERDICT_META.acceptable;
  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-[#0d1117] overflow-hidden">
      {/* Header row */}
      <div className="flex items-center gap-4 px-4 py-3 border-b border-white/10">
        <ScoreRing score={evaluation.score} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-white/50 text-xs font-medium uppercase tracking-widest">Score</span>
            <span className="text-white font-bold text-sm">{evaluation.score}/10</span>
            <Badge className={`ml-auto ${v.bg} ${v.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${v.dot}`} />
              {v.label}
            </Badge>
          </div>
          <ProgressBar value={evaluation.score} colorClass={v.bar} />
        </div>
      </div>

      {/* Feedback */}
      <div className="px-4 py-3 border-b border-white/10">
        <p className="text-white/70 text-sm leading-relaxed">{evaluation.feedback}</p>
      </div>

      {/* Strengths + Improvements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
        {evaluation.strengths?.length > 0 && (
          <div className="px-4 py-3">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-2">Strengths</p>
            <ul className="space-y-1.5">
              {evaluation.strengths.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-white/70">
                  <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {evaluation.improvements?.length > 0 && (
          <div className="px-4 py-3">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-2">Improve</p>
            <ul className="space-y-1.5">
              {evaluation.improvements.map((imp, i) => (
                <li key={i} className="flex gap-2 text-sm text-white/70">
                  <span className="text-amber-500 mt-0.5 shrink-0">→</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Question Card ──────────────────────────────────────────────────────────
const QuestionCard = ({ q, index, answer, evaluation, onAnswerChange, onSubmit }) => {
  const [showHint, setShowHint] = useState(false);
  const diff = DIFFICULTY_META[q.difficulty] ?? DIFFICULTY_META.medium;
  const type = TYPE_META[q.type] ?? { label: q.type, icon: "?" };
  const submitted = !!evaluation;

  return (
    <div className={`rounded-2xl border transition-all duration-300 overflow-hidden
      ${submitted
        ? "border-white/20 bg-gradient-to-br from-white/5 to-white/[0.02]"
        : "border-white/10 bg-white/[0.03] hover:border-white/20"}`}
    >
      {/* Top bar */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-white/10">
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white/60 text-xs font-bold shrink-0">
          {index + 1}
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className={diff.cls}>{diff.label}</Badge>
          <Badge className="bg-white/5 text-white/50 ring-1 ring-white/10">
            <span>{type.icon}</span>{type.label}
          </Badge>
        </div>
        {submitted && (
          <span className="ml-auto flex items-center gap-1 text-xs text-white/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Evaluated
          </span>
        )}
      </div>

      {/* Question body */}
      <div className="px-5 py-4">
        <p className="text-white font-semibold leading-snug mb-4">{q.question}</p>

        {/* Hint toggle */}
        {q.hint && (
          <button
            onClick={() => setShowHint(v => !v)}
            className="text-xs text-purple-400 hover:text-purple-300 transition-colors mb-3 flex items-center gap-1"
          >
            <span>{showHint ? "▾" : "▸"}</span> {showHint ? "Hide hint" : "Show hint"}
          </button>
        )}
        {showHint && q.hint && (
          <div className="mb-4 px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm">
            {q.hint}
          </div>
        )}

        {/* Textarea */}
        <textarea
          className={`w-full rounded-xl px-4 py-3 text-sm text-white/90 placeholder-white/20 resize-none
            border transition-all duration-200 outline-none
            focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50
            ${submitted
              ? "bg-white/5 border-white/10 cursor-default"
              : "bg-white/[0.04] border-white/15 hover:border-white/25"}`}
          rows={4}
          placeholder="Write your answer here…"
          value={answer || ""}
          disabled={submitted}
          onChange={e => onAnswerChange(e.target.value)}
        />

        {/* Submit button */}
        {!submitted && (
          <button
            onClick={onSubmit}
            disabled={!answer?.trim()}
            className="mt-3 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed
              text-white text-sm font-medium transition-all duration-200 active:scale-[0.98]"
          >
            Submit Answer
          </button>
        )}

        {/* Evaluation result */}
        {evaluation && <EvaluationCard evaluation={evaluation} />}
      </div>
    </div>
  );
};

// ─── Upload Zone ─────────────────────────────────────────────────────────────
const UploadZone = ({ file, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full rounded-xl border-2 border-dashed px-6 py-8 text-center transition-all duration-200
      ${file
        ? "border-blue-500/50 bg-blue-500/5 hover:bg-blue-500/10"
        : "border-white/15 bg-white/[0.02] hover:border-white/30 hover:bg-white/5"}`}
  >
    <div className="flex flex-col items-center gap-2">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl
        ${file ? "bg-blue-500/20" : "bg-white/10"}`}>
        {file ? "📄" : "⬆"}
      </div>
      {file ? (
        <>
          <p className="text-white font-medium text-sm">{file.name}</p>
          <p className="text-white/40 text-xs">{(file.size / 1024).toFixed(1)} KB · Click to replace</p>
        </>
      ) : (
        <>
          <p className="text-white/70 font-medium text-sm">Upload your resume</p>
          <p className="text-white/30 text-xs">PDF, DOCX · Click to browse</p>
        </>
      )}
    </div>
  </button>
);

// ─── Final Score Card ─────────────────────────────────────────────────────────
const FinalScoreCard = ({ score, total = 100 }) => {
  const pct = Math.round((score / total) * 100);
  const grade =
    pct >= 80 ? { label: "Excellent", color: "text-emerald-400", bg: "from-emerald-500/20 to-teal-500/10", ring: "ring-emerald-500/30" } :
    pct >= 60 ? { label: "Good",      color: "text-blue-400",    bg: "from-blue-500/20 to-indigo-500/10",  ring: "ring-blue-500/30" } :
    pct >= 40 ? { label: "Fair",      color: "text-amber-400",   bg: "from-amber-500/20 to-yellow-500/10", ring: "ring-amber-500/30" } :
                { label: "Needs Work",color: "text-red-400",     bg: "from-red-500/20 to-rose-500/10",     ring: "ring-red-500/30" };

  return (
    <div className={`rounded-2xl bg-gradient-to-br ${grade.bg} ring-1 ${grade.ring} p-6 text-center`}>
      <p className="text-white/50 text-sm uppercase tracking-widest font-medium mb-2">Final Result</p>
      <p className={`text-6xl font-bold ${grade.color} mb-1`}>{score}</p>
      <p className="text-white/40 text-sm mb-3">out of {total}</p>
      <Badge className={`${grade.bg} ${grade.color} ring-1 ${grade.ring} text-sm px-3 py-1`}>
        {grade.label} · {pct}%
      </Badge>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const QuizPage = () => {
  const resumeFileRef = useRef(null);
  const jobDescriptionRef = useRef(null);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [quizId, setQuizId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [evaluations, setEvaluations] = useState({});
  const [submittingId, setSubmittingId] = useState(null);
  const [finalScore, setFinalScore] = useState(null);
  const [finishing, setFinishing] = useState(false);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const handleResumeData = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload your resume.");
    setLoading(true);
    try {
      const result = await generateQuiz(file, jobDescriptionRef.current?.value ?? "");
      setQuizId(result.quizId);
      setQuizData(result.questions);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async (questionId) => {
    const userAnswer = answers[questionId];
    if (!userAnswer?.trim()) return alert("Please write your answer first.");
    setSubmittingId(questionId);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/quiz/submit-answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId, questionId, userAnswer }),
        credentials: "include",
      });
      const data = await res.json();
      setEvaluations(prev => ({ ...prev, [questionId]: data.evaluation }));
    } finally {
      setSubmittingId(null);
    }
  };

  const handleFinishQuiz = async () => {
    setFinishing(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/quiz/finish-quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId }),
        credentials: "include",
      });
      const data = await res.json();
      setFinalScore(data.finalScore);
    } finally {
      setFinishing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setQuizData(null);
    setQuizId(null);
    setAnswers({});
    setEvaluations({});
    setFinalScore(null);
  };

  const answeredCount = Object.keys(evaluations).length;
  const totalCount = quizData?.length ?? 0;
  const allAnswered = totalCount > 0 && answeredCount === totalCount;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#080b10] text-white">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-700/10 blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-purple-700/10 blur-[100px]" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-12">

        {/* ── Header ── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/30">AI Interview Prep</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Resume Quiz</h1>
          <p className="text-white/40 mt-1 text-sm">Upload your resume and get a personalised technical interview quiz</p>
        </div>

        {/* ── Setup form (shown until quiz is generated) ── */}
        {!quizData && (
          <form onSubmit={handleResumeData} className="space-y-5">
            {/* Upload */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Resume</label>
              <input
                ref={resumeFileRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />
              <UploadZone file={file} onClick={() => resumeFileRef.current.click()} />
            </div>

            {/* Job description */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Job Description <span className="text-white/30 font-normal">(optional)</span>
              </label>
              <textarea
                ref={jobDescriptionRef}
                rows={4}
                placeholder="Paste the job description here to get more relevant questions…"
                className="w-full rounded-xl bg-white/[0.04] border border-white/15 hover:border-white/25 focus:border-blue-500/50
                  focus:ring-2 focus:ring-blue-500/30 outline-none px-4 py-3 text-sm text-white/80
                  placeholder-white/20 resize-none transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={!file || loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500
                disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-sm tracking-wide
                transition-all duration-200 active:scale-[0.99] shadow-lg shadow-blue-900/30"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Generating quiz…
                </span>
              ) : "Generate Quiz →"}
            </button>
          </form>
        )}

        {/* ── Quiz section ── */}
        {quizData && (
          <div className="space-y-5">
            {/* Progress header */}
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-white font-semibold">{totalCount} Questions</p>
                <p className="text-white/40 text-xs mt-0.5">{answeredCount} of {totalCount} evaluated</p>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-xs mb-1">{Math.round((answeredCount / totalCount) * 100)}% complete</p>
                <div className="w-32 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${(answeredCount / totalCount) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Question cards */}
            {quizData.map((q, index) => (
              <QuestionCard
                key={q.id}
                q={q}
                index={index}
                answer={answers[q.id]}
                evaluation={submittingId === q.id ? null : evaluations[q.id]}
                onAnswerChange={val => setAnswers(prev => ({ ...prev, [q.id]: val }))}
                onSubmit={() => handleSubmitAnswer(q.id)}
              />
            ))}

            {/* Submitting overlay indicator */}
            {submittingId && (
              <p className="text-center text-white/40 text-sm animate-pulse">
                Evaluating your answer…
              </p>
            )}

            {/* Finish button */}
            {!finalScore && (
              <button
                onClick={handleFinishQuiz}
                disabled={finishing || !allAnswered}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500
                  disabled:opacity-30 disabled:cursor-not-allowed font-semibold text-sm tracking-wide
                  transition-all duration-200 active:scale-[0.99] shadow-lg shadow-purple-900/30"
              >
                {finishing ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Calculating final score…
                  </span>
                ) : !allAnswered
                  ? `Answer all questions to finish (${totalCount - answeredCount} remaining)`
                  : "Finish Quiz & Get Final Score"}
              </button>
            )}

            {/* Final score */}
            {finalScore !== null && (
              <FinalScoreCard score={finalScore} total={totalCount * 10} />
            )}

            {/* Reset */}
            <button
              onClick={handleReset}
              className="w-full py-2.5 rounded-xl border border-white/10 hover:border-white/25 hover:bg-white/5
                text-white/50 hover:text-white/80 text-sm transition-all duration-200"
            >
              ↩ Start New Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;