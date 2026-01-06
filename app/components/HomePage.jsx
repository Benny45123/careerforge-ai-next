"use client"

import NavBar from '@/app/components/NavBar'
import Image from 'next/image';
import { useContext } from 'react';
import { AppContext } from '@/app/context/AppContext';
import { useState } from 'react';
import { redirect } from 'next/navigation';
import { handleLogout } from '@/app/services/BackendHandler';


export default function HomeDesign({children}) {
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
    <div className='overflow-hidden'>
      <NavBar />
      <button onClick={slideMenu} className="fixed mt-0.5 h-1/14 p-5 hover:bg-gray-300 bg-white rounded-md   "><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-list" viewBox="0 0 15 15">
  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg></button>
      <div  className=" p-4 border-b border-gray-300 h-15 flex items-center space-x-10 min-w-full" >
      <div className='flex flex-row m-10'>
          <Image src='/CareerForge-Ai.png' className='h-65 w-65 -translate-y-[105px]' width='100' height='100'/>
      </div>
        <div className=" bg-gray-200 ml-20 border border-gray-300 p-2 rounded w-35 h-8 align-middle  flex right-20 space-x-2 translate-x-130 ">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>
          <input type="text" placeholder='Search..' className='focus:outline-none w-full'/>
        </div>
        <div className="absolute border border-gray-300  rounded-3xl right-1/80 p-2 flex items-center space-x-2 h-15 bg-white hover:shadow-lg cursor-pointer" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          <Image src='/user.png' className="rounded-full  h-12 w-12" width='100' height='100' />
          <div className='flex flex-col text-left'>
          <span className=''>{user.name}</span>
          <span className='text-gray-500'>{user.email}</span>
          </div>
        </div>
      </div>
      <div style={{opacity: hovered ? '1.0' : '0.0'}} className='absolute border border-gray-300  rounded-3xl right-1/80  flex flex-col p-2 bg-white hover:shadow-2xl transition-opacity duration-300  w-70 z-1 'onMouseEnter={() => {hovered&&setHovered(true)}} onMouseLeave={() => setHovered(false)}>
          <div className='flex flex-col items-center justify-center p-3 space-y-3'>
          <Image src='/user.png' className="rounded-full  h-12 w-12" width='100' height='100' />
          <span className='text-2xl font-extrabold'>{user.name}</span>
          <span className='text-gray-500'>{user.email}</span>
          </div>
          <button className='hover:text-gray-400 pr-30 pt-2 cursor-pointer' onClick={()=>displayCoverLetters()}>Cover-Letters</button>
          <button className='hover:text-gray-400 pr-39 pt-2 cursor-pointer' onClick={()=>displayResumes()}>Resumes</button>
          <button className='hover:text-gray-400 pr-48 pt-2 cursor-pointer'>Jobs</button>
          <span className='text-gray-400'>______________________________________</span>
          <button onClick={()=>Logout({setUser})} className='hover:text-gray-400  p-3 cursor-pointer'>Logout</button>
      </div>
      <div className=''>
     {children}
     </div>
    </div>
  );

}
