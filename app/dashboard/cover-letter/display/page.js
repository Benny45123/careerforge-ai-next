"use client";
import { useContext,useEffect,useState } from "react";
import { AppContext } from "@/app/context/AppContext";
import { getAllCoverLetters } from "@/app/services/BackendHandler";
const DisplayCoverLetters = () => {
    // console.log("Cover letter data in DisplayCoverLetters.jsx:",coverLetters);
    // const coverLetters=coverLetterData.coverLetters;
    const [coverLetters,setCoverLetters]=useState([]);
    useEffect(()=>{
        const fetchCoverLetters = async () => {
        try{
    const coverLetter=await getAllCoverLetters();
    setCoverLetters(coverLetter);
    // console.log("All Cover Letters:", coverLetter);
        }
        catch(error){
            console.error('Error fetching cover letters:',error);
        }
    }
    fetchCoverLetters();
}, []);

    return (
        <>
            <div  className={`transition-all duration-500 h-2 bg-gray-200 p-4 md:w-full min-h-screen overflow-auto `}>
            <div className="rounded-md bg-gray-200 p-6 shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Your Cover Letters</h1>
                {coverLetters && coverLetters.length>0 ? 
                (<div className="grid md:grid-cols-3 gap-5">
                    {
                        coverLetters.map(letter =>(
                            <div key={letter._id} className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                            <h2 className="text-xl font-semibold mb-4">Cover Letter for {letter.role}</h2>
                            <p className="text-gray-700 whitespace-pre-wrap">{letter.generatedLetter}</p>
                            <p className="text-gray-500 text-sm mt-4">Generated on: {letter.createdAt}</p>
                            </div>
                        ))
                    }  
                </div>) : <div className="text-center text-gray-500">No cover letters found. Create one now!</div>}
                <div className="flex justify-center">
                <button onClick={() => window.history.back()} className='mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md '>Go Back</button>
                </div>
            </div>
        </div>
        </>
    );
}
export default DisplayCoverLetters;