"use client"

import FillData from '../dashboard/cover-letter/fillin/page';
import Image from 'next/image';
import { useContext } from 'react';
import { AppContext } from '@/app/context/AppContext';
import { useState } from 'react';
import { redirect } from 'next/navigation';
import { handleLogout } from '@/app/services/BackendHandler';
import { usePathname } from 'next/navigation';
import Link from "next/link";


export default function HomeDesign({children}) {
  const pathname=usePathname();
  const isActive=(path) => pathname===path;
  const {user,isOpen,setIsOpen,setUser}=useContext(AppContext);
  const [hovered,setHovered]=useState(false);
  const slideMenu=()=>{
    setIsOpen(!isOpen);
  }
  const displayCoverLetters=()=>{
    redirect('/dashboard/cover-letter/display');
  }
  const displayResumes=()=>{
    redirect('/dashboard/resume/display');
  }
  const Logout = async()=>{
    const result=await handleLogout()
    if(result){
      setUser(null);
      window.location.reload();
    }
  }
  return (
    <div className='overflow-hidden bg-gradient-to-br from-slate-950  to-slate-950 min-h-screen w-full  '>
      {/* <button onClick={slideMenu} className="fixed mt-0.5 h-1/14 p-5 hover:bg-gray-300  rounded-md   "><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-list" viewBox="0 0 15 15">
  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg></button> */}
      <div  className=" p-6 bg-slate-950 pt-11 fixed  flex justify-center space-x-10 min-w-full " >
        <div className='flex flex-row fixed left-10 top-8 '>
        <Image src='/CareerForgeAiLogo.png' className='h-13 w-13 rounded-full -translate-y-1' width='100' height='100'/>
        <span className=' text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-300 to-slate-700 font-serif text-center ml-2 mt-3'>CareerForge AI</span>
        </div>
      {/* <div className='flex flex-row m-10'>
          <Image src='/CareerForge-Ai.png' className='h-65 w-65 -translate-y-[105px]' width='100' height='100'/>
      </div>
        <div className=" bg-gray-200 ml-20 border border-gray-300 p-2 rounded w-35 h-8 align-middle  flex right-20 space-x-2 translate-x-130 ">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>
          <input type="text" placeholder='Search..' className='focus:outline-none w-full'/>
        </div> */}
        <div className=' flex flex-row items-center space-x-20'>
          <Link href='/dashboard/cover-letter/fillin' className={`  ${isActive('/dashboard/cover-letter/fillin')? 'text-white': 'bg-clip-text bg-gradient-to-b from-slate-950 via-slate-400 to-white text-transparent opacity-80 hover:opacity-100'}`}>Cover letter</Link>
          <Link href='/dashboard/resume' className={`${isActive('/dashboard/resume')? 'text-white': 'bg-clip-text bg-gradient-to-b from-slate-950 via-slate-400 to-white text-transparent opacity-80 hover:opacity-100'}`}>Resume</Link>
          <Link href='/dashboard/job' className={`${isActive('/dashboard/job')? 'text-white': 'bg-clip-text bg-gradient-to-b from-slate-950 via-slate-400 to-white text-transparent opacity-80 hover:opacity-100'}`}>Jobs</Link>

        </div>
        {/* <div className="absolute    right-2   cursor-pointer" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}> */}
          {/* <Image src='/user.png' className="rounded-full  h-12 w-12" width='100' height='100' /> */}
          <div className="fixed w-11 h-11 rounded-full -translate-y-4 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold right-3 cursor-pointer" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                {user.name.charAt(0).toUpperCase()}
              </div>
          {/* <div className='flex flex-col text-left'>
          <span className=''>{user.name}</span>
          <span className='text-gray-500'>{user.email}</span>
          </div> */}
        {/* </div> */}
      </div>
      {/* <div className={`absolute   rounded-3xl right-1/80  flex flex-col p-2 bg-slate-900/95 backdrop-blur-2xl hover:shadow-2xl transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}   z-1 `} onMouseEnter={() => {hovered&&setHovered(true)}} onMouseLeave={() => setHovered(false)}>
          <div className='flex flex-col items-center justify-center p-3 space-y-3'> */}
          {/* <Image src='/user.png' className="rounded-full  h-12 w-12" width='100' height='100' /> */}
          {/* <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>
          <span className='text-white '>{user.name}</span>
          <span className='text-gray-500'>{user.email}</span>
          </div>
          <div className='p-1 pb-2 border-b border-gray-300'></div>
          <button className=' text-white pr-30 pt-2 cursor-pointer' onClick={()=>displayCoverLetters()}>Cover-Letters</button>
          <button className=' text-white pr-39 pt-2 cursor-pointer' onClick={()=>displayResumes()}>Resumes</button>
          <button className=' text-white pr-48 pt-2 cursor-pointer'>Jobs</button>
          <button onClick={()=>Logout({setUser})} className='hover:text-gray-400  p-3 cursor-pointer'>Logout</button>
      </div> */}
      <div 
              className={`z-10 absolute right-0 mt-20 w-64 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-white/5 shadow-2xl transition-all duration-500 ${
                hovered ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'
              }`}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <div className="p-6 flex flex-col items-center border-b border-white/10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl mb-3">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-white font-semibold text-lg">{user.name}</span>
                <span className="text-white/50 text-sm">{user.email}</span>
              </div>
              
              <div className="p-2">
                <button onClick={displayCoverLetters} className="w-full text-left px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200">
                  Cover Letters
                </button>
                <button onClick={displayResumes} className="w-full text-left px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200">
                  Resumes
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200">
                  Jobs
                </button>
              </div>
              
              <div className="p-2 border-t border-white/10">
                <button onClick={Logout} className="w-full text-left px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200">
                  Logout
                </button>
              </div>
            </div>
      <div className='overflow-hidden  min-h-screen flex flex-col pt-24  '>
     {children}
     </div>
    </div>
  );

}
