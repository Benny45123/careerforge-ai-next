"use client"
import { useRef, useState } from 'react';
import { postData } from '@/app/services/BackendHandler';
import { redirect } from 'next/navigation';
import { Syne } from "next/font/google";
const syne=Syne({subsets:['latin'],weight:['400','700']});
const FillData = () => {

  const jobDescription=useRef('');
  const skills=useRef('');
  const resumeFileRef=useRef(null);
  const [file,setFile]=useState(null);
  const recruiterName=useRef('');
  const designation=useRef('');
  const companyName=useRef('');
  const handleClick=async(e)=>{
    e.preventDefault();
    const data={
      jobDescription:jobDescription.current.value,
      skills:skills.current.value,
      resume:file,
      recruiterName:recruiterName.current.value,
      designation:designation.current.value,
      companyName:companyName.current.value
    };
    const result=await postData({data});
    if(result && result.coverLetter){
      redirect('/dashboard/cover-letter/select-design');
    }

  }
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
    return (
    <>
    <div  className={` flex  justify-center items-center p-4    bg-center overflow-auto `} >
<form onSubmit={handleClick} className={` w-full  h-full bg-white/5    shadow-2xl  rounded-3xl  p-10 `}>
    <div className='relative '>
    <div className=" mb-8 relative">
      
            {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20  blur-3xl"></div> */}

            <h1 className={`relative text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 animate-gradient-move ${syne.className}`}>
              Generate Your Cover Letter
            </h1>
            <p className="relative text-white/60 text-lg">AI-powered professional cover letters in minutes</p>
          </div>
    <div className='relative group '>
        {/* <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-0 group-hover:opacity-100 '></div> */}
        
        <div className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-300 mb-6">
        <div className='flex  items-center gap-3 mb-4'>
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                    <path d="M4 4.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5"/>
                  </svg>
                </div>
                {/* <div className="absolute right-10 top-0 h-50 w-50 bg-gradient-to-r from-blue-700/30 via-purple-700/30 to-pink-700/30 blur-3xl animate-glow pointer-events-none"></div> */}
      <h1 className='text-2xl font-bold text-white'>Content Details </h1>
      </div>
      <br/>
      <label className="block text-white/80 font-medium mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
          Job Description *
      </label>
      <div className='relative group/input mb-6'>
      <div className='absolute inset-0  bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-0 group-hover/input:opacity-100 transition-all duration-300 pointer-events-none'></div>
      <div className="absolute inset-0 group-focus-within/input:bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 animate-glow blur-3xl pointer-events-none"></div>
      <textarea ref={jobDescription} rows={6} className='focus:outline-none focus:border-violet-500  bg-white/5 border-white/10 border focus:bg-white/10  w-full rounded-md p-2 placeholder:text-white/40 resize-none text-white' placeholder='Paste the job description here' required></textarea>
      </div>
      

      <label className="block text-white/80 font-medium mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
          Key Skills to highlight *
      </label>
      <div className='relative group/input mb-6'>
      <div className='absolute inset-0  bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 blur-3xl opacity-0 group-focus-within/input:opacity-100 group-hover/input:opacity-100 transition-all duration-300 pointer-events-none'></div>
      {/* <div className="absolute inset-0 group-focus-within/input:bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 animate-glow blur-3xl pointer-events-none"></div> */}
      <input ref={skills} className='focus:outline-none text-white focus:border-violet-500 focus:bg-white/10 bg-white/5 border-white/10 border  w-full rounded-md p-2 placeholder:text-white/40 ' placeholder='e.g., ReactJs,NextJs,Devops,etc...' required/>
      </div>
      
      {/* </div>
      </div> */}
      
      {/* <div className='relative group '>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-0 group-hover:opacity-100 pointer-events-none'></div>
        <div className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-300 mb-6"> */}
        <div className='flex mt-20 items-center gap-3 mb-4'>
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                  </svg>
        </div>
        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 blur-3xl animate-glow pointer-events-none"></div> */}
      <h1 className='text-2xl font-bold text-white'>Upload Resume </h1>
      </div>
      {/* <div onClick={handleDivClick} className="border rounded-lg p-6 mt-10 cursor-pointer border-dashed hover:cursor-pointer items-center justify-center flex flex-col">
                            <h1 className="text-xl font-semibold mb-4 text-center">Drop Your Resume Here</h1>
                            <p className="text-gray-500 text-center">PDF & DOCX only Max 2mb file size</p>
                            <input ref={resumeFileRef} onChange={handleChange} type="file" className="hidden" accept=".pdf,.docx" required/>
                            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-5 hover:cursor-pointer">Drop your Resume</button>
                            {file && <p className="text-green-600 font-medium mt-4">Selected File: {file.name}</p>}
                        </div> */}
      <div onClick={handleDivClick} className="relative group/upload cursor-pointer mt-15">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-3xl opacity-0 group-hover/upload:opacity-100 transition-opacity"></div>
                <div className="relative border-2 border-dashed border-white/20 rounded-2xl p-12 text-center hover:border-purple-500/50 transition-all bg-white/5 backdrop-blur-sm">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover/upload:scale-110 trasnsition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 16 16">
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                      <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Drop Your Resume Here</h3>
                  <p className="text-white/60 mb-4">PDF & DOCX only • Max 2MB file size</p>
                  <input ref={resumeFileRef}
                    onChange={handleChange}
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx"
                    required
                  />
                  <div className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
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
      {/* </div> */}
     {/* </div>
     </div> */}
     {/* <div className='relative group '>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-0 group-hover:opacity-100 pointer-events-none'></div>
        <div className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-300 mb-6"> */}
        <div className='flex mt-20 items-center gap-3 mb-20'>
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                  </svg>

        </div>
        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 blur-3xl animate-glow pointer-events-none"></div> */}
      <h1 className='text-2xl font-bold text-white'>Recruiter Details </h1>
      </div>
      <div className='grid md:grid-cols-3 gap-6'>
        <div>
      <label className="block text-white/80 font-medium mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
          Recruiter Name *
      </label>
        <div className='relative group/input mb-6'>
          {/* <div className='absolute inset-0  bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-0 group-hover/input:opacity-100 transition-all duration-300 pointer-events-none'></div> */}
          <div className='absolute inset-0  bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-pink-500/40 blur-3xl opacity-0 group-focus-within/input:opacity-100 group-hover/input:opacity-100 transition-all duration-300 pointer-events-none'></div>
            <input ref={recruiterName} className='text-white focus:outline-none focus:border-violet-500 focus:bg-white/10 bg-white/5 border-white/10 border  w-full rounded-md p-2 placeholder:text-white/40' placeholder='John Doe' required/>
          </div>
        </div>
        <div>
      <label className="block text-white/80 font-medium mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
          Designation *</label>
        <div className='relative group/input mb-6'>
          {/* <div className='absolute inset-0  bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-0 group-hover/input:opacity-100 transition-all duration-300 pointer-events-none'></div> */}
          <div className='absolute inset-0  bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-pink-500/40 blur-3xl opacity-0 group-focus-within/input:opacity-100 group-hover/input:opacity-100 transition-all duration-300 pointer-events-none'></div>
            <input ref={designation} className='text-white focus:outline-none focus:border-violet-500 focus:bg-white/10 bg-white/5 border-white/10 border  w-full rounded-md p-2 placeholder:text-white/40' placeholder='Hiring Manager (HR)' required/>
          </div>
        </div>
        <div>
      <label className="block text-white/80 font-medium mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
          Company Name *</label>
        <div className='relative group/input mb-6'>
          {/* <div className='absolute inset-0  bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-0 group-hover/input:opacity-100 transition-all duration-300 pointer-events-none'></div> */}
          <div className='absolute inset-0  bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-pink-500/40 blur-3xl opacity-0 group-focus-within/input:opacity-100 group-hover/input:opacity-100 transition-all duration-300 pointer-events-none'></div>
            <input ref={companyName} className='text-white focus:outline-none focus:border-violet-500 focus:bg-white/10 bg-white/5 border-white/10 border  w-full rounded-md p-2 placeholder:text-white/40' placeholder='Tech Solutions Inc.' required/>
          </div>
        </div>
        
      </div>


      </div>
      <div className="flex items-center justify-center"><button type="submit" className="bg-gradient-to-r from-purple-600 to-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-teal-700  transition-colors mt-5 cursor-pointer">Generate Cover Letter</button></div>

      </div>
      </div>
      </form>

      </div>
        </>
    )
}
export default FillData;