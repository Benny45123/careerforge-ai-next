"use client"
import {useRef, useState} from "react";
import ResumePageLogo from '@/public/ResumePageLogo.png';
import { postResumeData } from "@/app/services/BackendHandler";
import Image from "next/image";
import { Syne } from "next/font/google";
const syne=Syne({subsets:['latin'],weight:['400','700']});
const ResumePage=()=>{
    const resumeFileRef=useRef(null);
    const [file,setFile]=useState(null);
    const jobDescriptionRef=useRef(null);
    const [responseData,setResponseData]=useState(null);
    const handleDivClick=(e)=>{
        resumeFileRef.current.click();
    }
    const handleChange=(e)=>{
        const selectedFile=e.target.files[0];
        if(!selectedFile){
            return;
        }
        setFile(selectedFile);
    }
    const handleResumeData=async(e)=>{
        e.preventDefault();
        if(!file){
            alert('Please select a resume file.');
            return;
        }
        const jobDescription=jobDescriptionRef.current.value;
        const data={
            resume : file,
            jobDescription : jobDescription
        }
        const result = await postResumeData({data});
        setResponseData(result);
    }
    return (
        <>
            {/* <div  className={`transition-all duration-500 h-2 bg-gray-200 p-4  md:w-full ml-0 h-full`}>
                <div className="rounded-md bg-[#f2f1f1] p-7 shadow-md">
                <h1 className="text-7xl font-semibold text-center mb-4">Resume Score Checker</h1>
                    <div className="flex flex-row">
                        <form onSubmit={handleResumeData} className="flex flex-col">
                        <h1 className="text-5xl font-semibold mb-4 mt-20">Understand How Recruiters<br/>See Your Resume</h1>
                        <p className="text-gray-700 ">Designed to reflect real-world screening systems,<br/> our resume score checker analyzes keywords,<br/> formatting, and content alignment<br/>empowering you to optimize your resume for both ATS and human reviewers.</p>
                        <div onClick={handleDivClick} className="border border-blue-400 rounded-lg p-6 mt-10 cursor-pointer hover:shadow-md shadow-blue-400 border-dashed w-100 items-center justify-center flex flex-col">
                            <h1 className="text-2xl font-semibold mb-4 text-center">Drop Your Resume Here</h1>
                            <p className="text-gray-500 text-center">PDF & DOCX only Max 2mb file size</p>
                            <input ref={resumeFileRef} onChange={handleChange} type="file" className="hidden" accept=".pdf,.docx" required/>
                            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-5">Drop your Resume</button>
                            {file && <p className="text-green-600 font-medium mt-4">Selected File: {file.name}</p>}
                        </div>
                        <div >
                            <h1 className="text-xl font-medium mt-10">Enter your Job Description here ...</h1>
                            <textarea ref={jobDescriptionRef} className="w-90 h-40 border border-gray-300 rounded-lg p-4 mt-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Paste job description..." required ></textarea><br/>
                            {!responseData ? <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors mt-5">Get Resume Score</button> : 
                            <div className={`mt-10 p-6 border  rounded-lg w-140 ${responseData.overallScore >= 80 ? 'border-green-600' : responseData.overallScore >= 60 ? 'border-yellow-600' : 'border-red-600'} ${responseData.overallScore >= 80 ? 'bg-green-100' : responseData.overallScore >= 60 ? 'bg-yellow-100' : 'bg-red-100'}`}>
                                <h2 className="text-2xl font-semibold mb-4">Resume Analysis Result</h2>
                                <p className="text-lg"><strong>ATS Score : </strong> {responseData.overallScore}</p>
                                <p className="text-lg"><strong>Missing Keywords:</strong> {responseData.missing_keywords.join(', ')}</p>
                                <p className="text-lg"><strong>Response Confidence:</strong> {responseData.responseConfidence}</p>
                                <p className="text-sm text-gray-600 mt-2">* Note: A "low" confidence indicates that the job description provided was brief, which may affect the accuracy of keyword matching.</p>
                                <p className="text-sm text-gray-600 mt-2">**Score :<br/>0-59 Change resume immediately "Needs more key skills" <br/>60-80 Need some Modifications "Some skills need improvement”<br/> 80-100 proceed with the resume for given jd “Strong, ATS-friendly resume” </p>
                                </div>
                            }
                        </div>
                        </form>
                        <Image src={ResumePageLogo} alt="Resume Page Logo" className="mt-25 mx-auto w-1/2 h-200"/>
                    </div>
                    
                </div>
            </div> */}
                <form onSubmit={handleResumeData}  className={` relative min-h-screen p-5    bg-center overflow-auto shaodw-2xl  bg-white/5 rounded-2xl m-5 `} >
                <div className="flex flex-col items-center justify-center mb-7">
                <label className=" w-fit rounded-3xl text-sm items-center justify-center   bg-white/5  backdrop-blur-2xl shadow-2xl border border-white/10 p-1 px-5 gap-3 text-white/50 flex flex-row animate-pulse ">
                    <span className="h-2 w-2  rounded-full bg-teal-600 "></span>
                    AI-powered analysis

                </label>
                </div>
                <div className="relative   mt-15 m-5">
                <h1 className={` text-5xl font-bold bg-gradient-to-r from-sky-400  to-violet-400 bg-clip-text text-transparent mb-3 animate-gradient-move  ${syne.className}`}>Resume Score Checker</h1>
                <p className="relative text-white/60 text-lg">Advanced ATS analysis to optimize your resume for both automated systems and human recruiters</p>
                </div>
                <div className='relative group m-5'>
                <div className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-300 mb-6">
                <div>
                <div className='flex  items-center gap-3 mb-4'>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                        </svg>
                    </div>
        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 blur-3xl animate-glow pointer-events-none"></div> */}
                    <h1 className='text-2xl font-bold text-white'>Upload Resume </h1>
                    </div>
                <div onClick={handleDivClick} className="relative group/upload cursor-pointer mt-15">
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-purple-500/20 rounded-2xl blur-3xl opacity-0 group-hover/upload:opacity-100 transition-opacity "></div>
                        <div className="relative border-2 border-dashed border-white/20 rounded-2xl p-12 text-center hover:border-purple-500/50 transition-all bg-white/5 backdrop-blur-sm">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-sky-500/20 flex items-center justify-center group-hover/upload:scale-110 trasnsition-transform duration-300">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Drop Your Resume Here</h3>
                            <p className="text-white/60 mb-4">PDF & DOCX only • Max 2MB file size</p>
                            <input ref={resumeFileRef} onChange={handleChange} type="file" className="hidden" accept=".pdf,.docx" required/>
                                <div className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-sky-500 text-white font-semibold hover:shadow-lg  transition-all">
                                 Choose File
                                </div>
                                 {file && (
                                <div className="mt-4 flex items-center justify-center gap-2 text-green-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                 <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                                 </svg>
                                 <span className="font-medium">{file.name}</span>
                                </div>
                             )}
                        </div>
                    </div>
                </div>
                <div>
                <div className='flex  items-center gap-3 my-7 '>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-green-600 flex items-center justify-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                            <path d="M4 4.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5"/>
                    </svg>
                    </div>
        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 blur-3xl animate-glow pointer-events-none"></div> */}
                    <h1 className='text-2xl font-bold text-white'>Job Description</h1>
                    </div>
                    <div className='relative group/input mb-6'>
      <div className='absolute inset-0  bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-0 group-hover/input:opacity-100 transition-all duration-300 pointer-events-none'></div>
      <div className="absolute inset-0 group-focus-within/input:bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 animate-glow blur-3xl pointer-events-none"></div>
      <textarea ref={jobDescriptionRef} rows={6} className='focus:outline-none focus:border-violet-500  bg-white/5 border-white/10 border focus:bg-white/10  w-full rounded-md p-2 placeholder:text-white/40 resize-none text-white' placeholder='Paste the job description here' required></textarea>
      </div>
                    </div>
                            
                </div>
                {!responseData ? (
  <div className="flex items-center justify-center">
    <button
      type="submit"
      className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-colors mt-5 cursor-pointer"
    >
      Get Resume Score
    </button>
  </div>
) : (
  <div className="mt-10 w-full">
    {/* Score Header Card */}
    <div className={`relative overflow-hidden rounded-2xl p-6 mb-4 text-white
      ${responseData.atsScore >= 80 ? 'bg-gradient-to-br from-emerald-600 to-teal-700' :
        responseData.atsScore >= 60 ? 'bg-gradient-to-br from-amber-500 to-orange-600' :
        'bg-gradient-to-br from-red-500 to-rose-700'}`}>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 bg-white -translate-y-10 translate-x-10" />
      <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10 bg-white translate-y-8 -translate-x-8" />

      <div className="relative flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm font-medium opacity-80 uppercase tracking-widest mb-1">ATS Analysis</p>
          <h2 className="text-2xl font-bold">Resume Score</h2>
          <p className="text-sm mt-1 opacity-75">
            {responseData.atsScore >= 80 ? '🎉 Strong resume — ready to apply!' :
             responseData.atsScore >= 60 ? '⚠️ Almost there — a few tweaks needed' :
             '🚨 Needs significant improvement'}
          </p>
        </div>

        {/* Big Score Circle */}
        <div className={`flex items-center justify-center w-24 h-24 rounded-full bg-white/20 border-4 border-white/40 shadow-lg`}>
          <div className="text-center">
            <span className="text-3xl font-extrabold leading-none">{responseData.atsScore}</span>
            <span className="block text-xs opacity-75">/100</span>
          </div>
        </div>
      </div>
    </div>

    {/* Keywords Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      {/* Matched Keywords */}
      {responseData.matched_keywords?.length > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-emerald-600 text-lg">✅</span>
            <h3 className="font-semibold text-emerald-800 text-sm uppercase tracking-wide">Matched Keywords</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {responseData.matched_keywords.map((kw, i) => (
              <span key={i} className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full border border-emerald-300">
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Missing Keywords */}
      {responseData.missing_keywords?.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-red-500 text-lg">❌</span>
            <h3 className="font-semibold text-red-800 text-sm uppercase tracking-wide">Missing Keywords</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {responseData.missing_keywords.map((kw, i) => (
              <span key={i} className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full border border-red-300">
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Resume Sections + Confidence Row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      {/* Resume Sections */}
      {responseData.resume_sections?.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-blue-500 text-lg">📄</span>
            <h3 className="font-semibold text-blue-800 text-sm uppercase tracking-wide">Detected Sections</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {responseData.resume_sections.map((sec, i) => (
              <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full border border-blue-300">
                {sec}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Confidence */}
      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-purple-500 text-lg">🎯</span>
          <h3 className="font-semibold text-purple-800 text-sm uppercase tracking-wide">Response Confidence</h3>
        </div>
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold capitalize border
          ${responseData.responseConfidence === 'high' ? 'bg-emerald-100 text-emerald-700 border-emerald-300' :
            responseData.responseConfidence === 'medium' ? 'bg-amber-100 text-amber-700 border-amber-300' :
            'bg-red-100 text-red-700 border-red-300'}`}>
          {responseData.responseConfidence}
        </span>
        {responseData.responseConfidence === 'low' && (
          <p className="text-xs text-purple-600 mt-2 leading-relaxed">
            ⚠️ Brief job description detected — keyword matching may be less accurate.
          </p>
        )}
      </div>
    </div>

    {/* Score Legend */}
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-4">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Score Guide</h3>
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="bg-red-100 border border-red-200 rounded-xl p-2">
          <div className="font-bold text-red-600">0 – 59</div>
          <div className="text-red-500 mt-0.5">Needs Overhaul</div>
        </div>
        <div className="bg-amber-100 border border-amber-200 rounded-xl p-2">
          <div className="font-bold text-amber-600">60 – 79</div>
          <div className="text-amber-500 mt-0.5">Needs Tweaks</div>
        </div>
        <div className="bg-emerald-100 border border-emerald-200 rounded-xl p-2">
          <div className="font-bold text-emerald-600">80 – 100</div>
          <div className="text-emerald-500 mt-0.5">ATS-Ready ✓</div>
        </div>
      </div>
    </div>

    {/* Analyze Another Button */}
    <button
      onClick={() => setResponseData(null)}
      className="w-full px-6 py-3 rounded-2xl border-2 border-gray-300 text-gray-600 font-semibold text-sm hover:border-gray-400 hover:bg-gray-50 cursor-pointer transition-all hover:shadow-md"
    >
      ↩ Analyze Another Resume
    </button>
  </div>
)}
                </div>
                </form>

        </>
    )
}
export default ResumePage;