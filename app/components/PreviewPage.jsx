"use client";

import Link from "next/link";
import Image from "next/image";

export default function PreviewPage() {
  return (
    <main className="bg-white text-gray-900">
      
      <section className="max-w-7xl mx-auto px-10 py-10 pb-20 grid md:grid-cols-2 gap-20 items-center">
        <div>
            <h1 className="text-5xl font-serif leading-relaxed ">Improve Your Resume and Cover Letters with
            <span className="text-teal-500"> CareerForge AI</span>
            </h1>
            <p className="mt-6 text-md leading-10 text-gray-600">Analyze, optimize, and enhance your resume and cover letters using AI.<br/>Beat ATS systems, get noticed, and land more interviews.

          </p>
          <div className="mt-10 flex gap-4">
            <Link href="/auth" className="transition-all duration-300">
            <button className="px-5 py-3 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition">Get Started</button>
            </Link>
            {/* <a href="#features" className="transition-all duration-300 scroll-mt-24"> */}
            <button onClick={() => {document.getElementById("features")?.scrollIntoView({ behavior: "smooth"});}} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">See How It Works</button>

            {/* </a> */}
          </div>
        </div>
        <Image src="/PreviewPageLogo.png" alt="Hero Logo" height='600' width='500'/>
      </section>
      <section id="features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-serif text-center">Everything You Need to Get Hired</h2>

          <div className="mt-12 grid md:grid-cols-2 gap-8">

            <Feature
              img="/PreviewPageCv.png"
              title="Cover Letter Generator"
              desc="Personalized cover letters that recruiters actually read."
            />

            <Feature
              img="/PreviewPageResume.png"
              title="ATS Optimization"
              desc="Ensure your resume passes Applicant Tracking Systems."
            />

          </div>
        </div>
      </section>
      <section className="py-20 text-center">
        <h2 className="text-5xl font-serif">Start Building Your Career Today</h2>
        <p className="mt-4 text-gray-600">Join thousands of job seekers using CareerForge AI</p>
        <Link href="/auth">
          <button className="mt-6 px-8 py-4 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition">Get Started for Free</button>
        </Link>
      </section>
    </main>
  );
}

function Feature({ img, title, desc }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:scale-105 transition">
      <Image src={img} alt={title} width={550} height={300} />
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600">{desc}</p>
    </div>
  );
}
