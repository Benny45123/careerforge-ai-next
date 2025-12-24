"use client";
import { useContext } from "react";
import { AppContext } from "@/app/context/AppContext";
const DisplayCoverLetters = ({coverLetters}) => {
    // console.log("Cover letter data in DisplayCoverLetters.jsx:",coverLetters);
    // const coverLetters=coverLetterData.coverLetters;
    const {isOpen}=useContext(AppContext);
    return (
        <>
            <div  className={`transition-all duration-300 h-2 bg-gray-200 p-4 ${isOpen ? "md:w-3/4 ml-[25%]" : "md:w-full"} min-h-screen`}>
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