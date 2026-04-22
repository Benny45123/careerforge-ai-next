"use client";
import { useState, useRef } from "react";

// ─── Helpers ───────────────────────────────────────────────────────────────
const SCORE_META = (score) => {
  if (score >= 75) return { label: "Great Match", bg: "bg-emerald-500/10", text: "text-emerald-300", bar: "bg-emerald-500", ring: "ring-emerald-500/30", glow: "shadow-emerald-900/40" };
  if (score >= 50) return { label: "Good Match",  bg: "bg-sky-500/10",     text: "text-sky-300",     bar: "bg-sky-500",     ring: "ring-sky-500/30",     glow: "shadow-sky-900/40" };
  if (score >= 30) return { label: "Fair Match",  bg: "bg-amber-500/10",   text: "text-amber-300",   bar: "bg-amber-500",   ring: "ring-amber-500/30",   glow: "shadow-amber-900/40" };
  return             { label: "Low Match",   bg: "bg-red-500/10",     text: "text-red-300",     bar: "bg-red-500",     ring: "ring-red-500/30",     glow: "shadow-red-900/40" };
};

const ScoreArc = ({ score }) => {
  const meta = SCORE_META(score);
  const colors = { "Great Match": "#10b981", "Good Match": "#38bdf8", "Fair Match": "#f59e0b", "Low Match": "#ef4444" };
  const color = colors[meta.label];
  const r = 24;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div className="relative flex items-center justify-center w-16 h-16 shrink-0">
      <svg width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
        <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform="rotate(-90 32 32)"
          style={{ transition: "stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1)" }}
        />
      </svg>
      <span className="absolute text-xs font-bold" style={{ color }}>{score}%</span>
    </div>
  );
};

// ─── Job Card ───────────────────────────────────────────────────────────────
const JobCard = ({ job, index }) => {
  const meta = SCORE_META(job.matchScore);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer
        ${hovered ? `border-white/25 bg-white/[0.05] shadow-xl ${meta.glow}` : "border-white/10 bg-white/[0.02]"}`}
    >
      {/* Rank badge */}
      <span className="absolute top-4 left-4 w-6 h-6 flex items-center justify-center rounded-full bg-white/8 text-white/30 text-xs font-bold ring-1 ring-white/10">
        {index + 1}
      </span>

      <div className="flex items-start gap-4 px-5 pt-4 pb-4 pl-12">
        {/* Score arc */}
        <ScoreArc score={job.matchScore} />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <h3 className="text-white font-semibold text-sm leading-snug truncate pr-2">{job.title}</h3>
              {job.company && job.company !== "Unknown Company" && (
                <p className="text-white/40 text-xs mt-0.5">{job.company}</p>
              )}
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ring-1 ${meta.bg} ${meta.text} ${meta.ring}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${meta.bar}`} />
                  {meta.label}
                </span>
                {job.source && (
                  <span className="text-xs text-white/30 bg-white/5 ring-1 ring-white/10 px-2 py-0.5 rounded-full">
                    {job.source}
                  </span>
                )}
                {job.location && (
                  <span className="text-xs text-white/30 bg-white/5 ring-1 ring-white/10 px-2 py-0.5 rounded-full">
                    {job.location}
                  </span>
                )}
                {job.postedAt && (
                  <span className="text-xs text-white/30 bg-white/5 ring-1 ring-white/10 px-2 py-0.5 rounded-full">
                    {job.postedAt}
                  </span>
                )}
              </div>
            </div>
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="shrink-0 px-3 py-1.5 rounded-lg bg-white/8 hover:bg-white/15 border border-white/10 hover:border-white/25
                text-white/70 hover:text-white text-xs font-medium transition-all duration-200 flex items-center gap-1"
            >
              Apply <span className="text-white/30">↗</span>
            </a>
          </div>

          {/* Snippet */}
          {job.snippet && (
            <p className="mt-2 text-white/40 text-xs leading-relaxed line-clamp-2">{job.snippet}</p>
          )}

          {/* Skills tags */}
          {job.skills && job.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {job.skills.map((skill, i) => (
                <span key={i} className="text-xs px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-400 ring-1 ring-teal-500/20">
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Match bar */}
          <div className="mt-3">
            <div className="h-1 w-full rounded-full bg-white/8 overflow-hidden">
              <div
                className={`h-full rounded-full ${meta.bar} transition-all duration-700`}
                style={{ width: `${job.matchScore}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Upload Zone ─────────────────────────────────────────────────────────────
const UploadZone = ({ file, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full rounded-xl border-2 border-dashed px-6 py-7 text-center transition-all duration-200
      ${file
        ? "border-teal-500/40 bg-teal-500/5 hover:bg-teal-500/8"
        : "border-white/12 bg-white/[0.02] hover:border-white/25 hover:bg-white/4"}`}
  >
    <div className="flex flex-col items-center gap-2">
      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl transition-all
        ${file ? "bg-teal-500/15 ring-1 ring-teal-500/30" : "bg-white/8 ring-1 ring-white/10"}`}>
        {file ? "📄" : "⬆"}
      </div>
      {file ? (
        <>
          <p className="text-white font-medium text-sm">{file.name}</p>
          <p className="text-white/35 text-xs">{(file.size / 1024).toFixed(1)} KB · Click to replace</p>
        </>
      ) : (
        <>
          <p className="text-white/65 font-medium text-sm">Upload your resume</p>
          <p className="text-white/25 text-xs">PDF supported · Click to browse</p>
        </>
      )}
    </div>
  </button>
);

// ─── Stat Chip ────────────────────────────────────────────────────────────────
const StatChip = ({ label, value, color }) => (
  <div className="flex flex-col items-center px-5 py-3 rounded-xl bg-white/[0.03] ring-1 ring-white/10">
    <span className={`text-xl font-bold ${color}`}>{value}</span>
    <span className="text-white/35 text-xs mt-0.5">{label}</span>
  </div>
);

// ─── Skeleton Card ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-4 flex gap-4 animate-pulse">
    <div className="w-16 h-16 rounded-full bg-white/8 shrink-0" />
    <div className="flex-1 space-y-2 pt-1">
      <div className="h-3.5 bg-white/10 rounded-full w-2/3" />
      <div className="h-2.5 bg-white/6 rounded-full w-1/3" />
      <div className="h-2 bg-white/5 rounded-full w-full mt-3" />
      <div className="h-1 bg-white/8 rounded-full w-full mt-2" />
    </div>
  </div>
);

// ─── Helper: safely extract jobs array from any response shape ───────────────
// Handles both:
//   { jobs: [...] }           — correct backend shape
//   { jobs: { jobs: [...] } } — double-wrapped bug from jobService returning { jobs }
const extractJobs = (data) => {
  if (!data) return [];
  // Double-wrapped: { jobs: { jobs: [...] } }
  if (data.jobs && Array.isArray(data.jobs.jobs)) return data.jobs.jobs;
  // Normal: { jobs: [...] }
  if (Array.isArray(data.jobs)) return data.jobs;
  // Fallback: data itself is the array
  if (Array.isArray(data)) return data;
  return [];
};

// ─── Main Component ──────────────────────────────────────────────────────────
const JobRecommendationsPage = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) {
      // Validate it's a PDF
      if (f.type !== "application/pdf" && !f.name.endsWith(".pdf")) {
        setError("Please upload a PDF file.");
        return;
      }
      setError(null);
      setFile(f);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !targetRole.trim()) return;

    setLoading(true);
    setError(null);
    setJobs(null);

    try {
      const formData = new FormData();
      // Key must match multer field name: upload.single('resume')
      formData.append("resume", file);
      formData.append("targetRole", targetRole.trim());

      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${baseUrl}/api/jobs/recommend-jobs`, {
        method: "POST",
        body: formData,
        // Do NOT set Content-Type header — browser sets it with boundary automatically for FormData
        credentials: "include", // Sends cookies for authenticateToken middleware
      });

      // Handle auth errors
      if (res.status === 401) {
        setError("Your session has expired. Please log in again.");
        return;
      }

      if (res.status === 429) {
        setError("Too many requests. Please wait a moment and try again.");
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server error (${res.status})`);
      }

      const data = await res.json();

      // Safely unwrap regardless of whether jobService double-wraps the array
      const jobList = extractJobs(data);

      setJobs(jobList);
    } catch (err) {
      console.error("Job fetch error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setTargetRole("");
    setJobs(null);
    setError(null);
    // Clear the file input so the same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Stats derived from job list
  const topMatch = jobs && jobs.length > 0 ? Math.max(...jobs.map(j => j.matchScore)) : 0;
  const avgMatch = jobs && jobs.length > 0 ? Math.round(jobs.reduce((s, j) => s + j.matchScore, 0) / jobs.length) : 0;
  const strongCount = jobs && jobs.length > 0 ? jobs.filter(j => j.matchScore >= 75).length : 0;

  return (
    <div className="min-h-screen bg-[#07090f] text-white" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-teal-600/8 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-indigo-700/8 blur-[120px]" />
        <div className="absolute top-[40%] left-[40%] w-[30vw] h-[30vw] rounded-full bg-sky-600/5 blur-[100px]" />
      </div>

      {/* Subtle dot grid */}
      <div className="fixed inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="relative max-w-2xl mx-auto px-4 py-12">

        {/* ── Header ── */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 ring-1 ring-teal-500/25 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-teal-400 text-xs font-semibold uppercase tracking-widest">AI Job Matcher</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight leading-tight">
            Find Jobs That<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-sky-400">
              Fit Your Resume
            </span>
          </h1>
          <p className="text-white/35 mt-2 text-sm leading-relaxed max-w-md">
            Upload your resume and choose a target role. Our AI ranks live job listings by how well they match your profile.
          </p>
        </div>

        {/* ── Setup Form ── */}
        {!jobs && !loading && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">
                Resume <span className="text-teal-500">*</span>
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              <UploadZone file={file} onClick={() => fileInputRef.current?.click()} />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">
                Target Role <span className="text-teal-500">*</span>
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={e => setTargetRole(e.target.value)}
                placeholder="e.g. React Developer, Data Scientist, Product Manager…"
                className="w-full rounded-xl bg-white/[0.03] border border-white/12 hover:border-white/22 focus:border-teal-500/50
                  focus:ring-2 focus:ring-teal-500/20 outline-none px-4 py-3 text-sm text-white/80
                  placeholder-white/20 transition-all duration-200"
              />
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex items-center gap-2">
                <span>⚠</span> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!file || !targetRole.trim()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-500 hover:to-sky-500
                disabled:opacity-35 disabled:cursor-not-allowed font-semibold text-sm tracking-wide
                transition-all duration-200 active:scale-[0.99] shadow-lg shadow-teal-900/25"
            >
              Find Matching Jobs →
            </button>
          </form>
        )}

        {/* ── Loading Skeletons ── */}
        {loading && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-5 rounded-full border-2 border-teal-500/40 border-t-teal-400 animate-spin shrink-0" />
              <p className="text-white/40 text-sm animate-pulse">Scanning job boards and ranking matches…</p>
            </div>
            {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* ── Results ── */}
        {jobs && !loading && (
          <div className="space-y-5">
            {/* Stats row */}
            {jobs.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-2">
                <StatChip label="Top Match" value={`${topMatch}%`} color="text-teal-400" />
                <StatChip label="Avg. Match" value={`${avgMatch}%`} color="text-sky-400" />
                <StatChip label="Strong Fits" value={strongCount} color="text-emerald-400" />
              </div>
            )}

            {/* Results header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">
                  {jobs.length > 0 ? `${jobs.length} Jobs Found` : "No Jobs Found"}
                </p>
                <p className="text-white/30 text-xs mt-0.5">
                  {jobs.length > 0
                    ? `Ranked by resume match · "${targetRole}"`
                    : "Try a different role or resume"}
                </p>
              </div>
            </div>

            {/* Job cards */}
            {jobs.length > 0 ? (
              <div className="space-y-3">
                {jobs.map((job, i) => (
                  <JobCard key={i} job={job} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 rounded-2xl border border-white/8 bg-white/[0.02]">
                <div className="w-14 h-14 rounded-2xl bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-2xl mx-auto mb-4">
                  🔍
                </div>
                <p className="text-white/50 font-medium">No listings found</p>
                <p className="text-white/25 text-sm mt-1">Try a broader role or check your resume</p>
              </div>
            )}

            {/* Reset */}
            <button
              onClick={handleReset}
              className="w-full py-2.5 rounded-xl border border-white/10 hover:border-white/22 hover:bg-white/4
                text-white/40 hover:text-white/70 text-sm transition-all duration-200"
            >
              ↩ Search Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobRecommendationsPage;