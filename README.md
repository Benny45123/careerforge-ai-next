# 🚀 CareerForge AI — Next.js (v2)
### *Elevate your career hunt with AI-powered intelligence.*

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

---

## 🌐 Live Experience
**Production URL:** [https://careerforge-ai-next.vercel.app/](https://careerforge-ai-next.vercel.app/)

> **Legacy Note:** This version is a full architectural upgrade from the original [React + Express version](https://github.com/Benny45123/CareerForge-AI), now unified under the **Next.js App Router** for superior performance and SEO.

---

## ✨ Features

### 🧠 ATS Resume Score Predictor
Evaluate your resume against industry benchmarks. Our AI analyzes keywords, formatting, and impact to give you an "ATS-ready" score.

### 📝 AI Cover Letter Generator
Stop staring at a blank page. Generate professional, job-specific cover letters tailored to your target role instantly.

### 🎛️ Centralized Dashboard
A sleek, glassmorphic command center to track your application assets, history, and AI-generated documents in one place.

### 💎 Futuristic UI
Designed with a **Modern Glassmorphism** aesthetic using Tailwind CSS—offering a clean, distraction-free user experience.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 14/15 (App Router) |
| **Styling** | Tailwind CSS (Glassmorphism UI) |
| **AI Engine** | Google Gemini API |
| **Database** | MongoDB Atlas |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```text
├── app/              # Next.js App Router (Pages, API Routes)
├── models/           # MongoDB / Mongoose Schemas
├── components/       # Reusable UI Components
├── lib/              # Database Connection & AI Wrappers
├── public/           # Static Assets & Branding
└── styles/           # Global Glassmorphism CSS
```

## 🚀 Getting Started
### Prerequisites :
* Node.js: 18.x or later
* Valid Backend Api url if not there check https://github.com/Benny45123/career-forge-ai-backend

## 1. Installation
```bash
git clone [https://github.com/Benny45123/career-forge-ai-next.git](https://github.com/Benny45123/career-forge-ai-next.git)
cd career-forge-ai-next
npm install
```

## 2. Environment Setup
*Create a .env.local file in the root directory:*
```bash
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_key_here
# Optional: NEXTAUTH_SECRET=your_secret
```

## 3. Run Development
```bash
npm run dev
```
*Open http://localhost:3000 to view the application locally.*

## 🚢 Deployment
*This project is optimized for Vercel. Simply connect your GitHub repository and Vercel will handle the rest, including Serverless Function deployment for the Gemini API routes.

<p align="center"> Developed by <strong>Benny</strong></p>
<p align="center">Transforming the job search with Generative AI.</p>
