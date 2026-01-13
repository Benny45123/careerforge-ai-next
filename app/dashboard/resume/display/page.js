"use client";
import {  useEffect, useState } from "react";

import { getAllResumes } from "@/app/services/BackendHandler";
const DisplayResumes = () => {
    const [resumes,setResumes]=useState([]);
    useEffect(()=>{
        const fetchResumes = async () => {
        try{
        const resume=await getAllResumes();
        setResumes(resume);
        }
        catch(error){
            console.error('Error fetching resumes:',error);
        }
    }
    fetchResumes();
}, []);
    const resumeList=resumes?.resumes||[]
    return (
        <>
        <div  className={`transition-all duration-500 h-2 bg-gray-200 p-4 md:w-full min-h-screen overflow-auto`}>
        <div className="rounded-md bg-gray-200 p-6 shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Your Resumes</h1>
            { resumeList.length>0 ? 
            (<div className="grid md:grid-cols-3 gap-5">
                {
                    resumeList.map(resume =>(
                        <div key={resume._id} className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-500">
                        <h2 className="text-xl font-semibold mb-4">Resume at {resume.createdAt}</h2>
                        <p className="text-gray-700 whitespace-pre-wrap">{resume.resumeText}</p>
                        <p className="text-gray-500 text-sm mt-4">ATS Score : {resume.atsScore}</p>
                        <p className="text-gray-500 text-sm mt-4">Response Confidence : {resume.responseConfidence}</p>
                        </div>
                    ))
                }  
            </div>) : <div className="text-center text-gray-500">No Resumes found. Create one now!</div>}
            <div className="flex justify-center">
            <button onClick={() => window.history.back()} className='mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md '>Go Back</button>
            </div>
        </div>
    </div>
    </>
    )
}
export default DisplayResumes;