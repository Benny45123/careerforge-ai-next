"use client"
import {useRef, useState} from "react";
import ResumePageLogo from '@/public/ResumePageLogo.png';
import { postResumeData } from "@/app/services/BackendHandler";
import Image from "next/image";
import { useContext } from "react";
import { AppContext } from "@/app/context/AppContext";

const ResumePage=()=>{
    const {isOpen}=useContext(AppContext);
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
            <div  className={`transition-all duration-500 h-2 bg-gray-200 p-4 ${isOpen ? "md:w-3/4 ml-[25%]" : "md:w-full ml-0"} h-full`}>
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
            </div>
        </>
    )
}
export default ResumePage;