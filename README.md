# CareerForge AI – Next.js (v2)

Upgraded version of CareerForge AI built using Next.js.

## Previous Version
React + Express version:
https://github.com/Benny45123/CareerForge-AI

## ✨ Features

-   **ATS Resume Score Predictor:** Evaluate your resume against industry benchmarks using AI.
-   **AI Cover Letter Generator:** Generate professional, job-specific cover letters instantly.
-   **Centralized Dashboard:** Track your application assets and history in one place.
-   **Modern Glassmorphism UI:** Built with a clean, futuristic aesthetic using Tailwind CSS.

## 🛠️ Tech Stack

-   **Framework:** [Next.js 14/15](https://nextjs.org/) (App Router)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **AI Engine:** [Google Gemini API](https://ai.google.dev/)
-   **Database:** [MongoDB](https://www.mongodb.com/) (Atlas)
-   **Authentication:** NextAuth.js / Clerk (if applicable)

## 🚀 Getting Started

### Prerequisites

-   Node.js 18.x or later
-   A Google AI Studio (Gemini) API Key
-   A MongoDB Atlas Connection String

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Benny45123/careerforge-ai-next.git](https://github.com/Benny45123/careerforge-ai-next.git)
    cd careerforge-ai-next
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    GEMINI_API_KEY=your_gemini_key_here
    # Add any other vars like NEXTAUTH_SECRET or CLERK_KEYS if used
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

```text
├── app/              # Next.js App Router (Pages, API Routes)
├── models/           # MongoDB / Mongoose Schemas
├── components/       # UI Components (React + Tailwind)
├── lib/              # MongoDB connection & Gemini API wrappers
├── public/           # Static assets & Icons
└── styles/           # Global CSS
```
## 🚀 Live Deployment

🔴 **Production URL:**  
https://careerforge-ai-next.vercel.app/

Hosted on **Vercel** using Next.js App Router for optimal performance and scalability.


## Developed by Benny
