"use client"
import { useRef, useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '@/app/context/AppContext';
const FillData = ({getFormData}) => {
  const {isOpen}=useContext(AppContext);
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
    getFormData(data);

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
    <div  className={`min-h-screen flex justify-center items-center p-4  bg-[url('/coverLetterPageDesign.png')] bg-cover bg-center ${isOpen ? 'ml-[25%]': ''} transition-all duration-500 `} >
<form onSubmit={handleClick} className={`transition-all duration-500 w-full  h-full bg-white/5  border border-white  shadow-2xl  rounded-3xl  p-10 `}>
    <div>
    <h1 className='font-bold text-center text-4xl font-serif pb-5'>Generate your Cover Letter </h1>
    <div className=' p-6 rounded-2xl shadow-md border-white border'>
      <br />
      <h1 className='text-2xl font-bold'>Content:</h1>
      <br/>
      <p>Paste the job description below *</p>
      <br/>
      <textarea ref={jobDescription} className='focus:outline-blue-500 w-full h-1/4 rounded-md p-2 border ' placeholder='Job Description...' required></textarea>
      <br/><br/>
      <p>Which skills should be the focus?</p>
      <br />
      <input ref={skills} type='text' className='focus:outline-blue-500 border  w-full h-10 rounded-md p-2 ' placeholder='Skills that should be highlihted' required/>
      <br />
      <h1 className='font-bold mt-4 text-2xl'>Upload your Resume *</h1>
      <br />
      <div onClick={handleDivClick} className="border rounded-lg p-6 mt-10 cursor-pointer border-dashed hover:cursor-pointer items-center justify-center flex flex-col">
                            <h1 className="text-xl font-semibold mb-4 text-center">Drop Your Resume Here</h1>
                            <p className="text-gray-500 text-center">PDF & DOCX only Max 2mb file size</p>
                            <input ref={resumeFileRef} onChange={handleChange} type="file" className="hidden" accept=".pdf,.docx" required/>
                            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-5 hover:cursor-pointer">Drop your Resume</button>
                            {file && <p className="text-green-600 font-medium mt-4">Selected File: {file.name}</p>}
                        </div>
      </div>
     <br/></div>
      <div className=' p-4 rounded-2xl shadow-md border border-white mb-10'>
      
        <label className="font-bold">To:</label>
        <br/><br/>
        <div className='grid  md:grid-cols-3 gap-4'>
        <label className=''>Recruiter Name *</label>
        <label className=''>Recruiter Designation *</label>
        <label className=''>Company Name *</label>
        <input ref={recruiterName} type='text' className='focus:outline-blue-500 border  h-10 rounded-md p-2 mr-1' placeholder='Recruiter Name'required/>
        <input ref={designation} type='text' className='focus:outline-blue-500 border  h-10 rounded-md p-2 mr-1' placeholder='Designation'required/>
        <input ref={companyName} type='text' className='focus:outline-blue-500 border  h-10 rounded-md p-2 ml-1' placeholder='Company Name'required/><br /><br/>
        <br/>
        </div></div>
        <div className='justify-center flex mb-10'>
        <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md'>Generate Cover Letter</button>
        </div>
      </form>
      </div>
        </>
    )
}
export default FillData;