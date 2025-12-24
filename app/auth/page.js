"use client"
import {  useRef, useState } from "react";
import { Register,Login } from "@/app/services/BackendHandler";

const Auth=({}) =>{
    const email=useRef();
    const password=useRef();
    const name=useRef();
    const [isSignUpMode,setIsSignUpMode] = useState(false);
    const ChangeClasses = ` p-8 rounded-xl shadow-md  w-full bg-auto bg-gradient-to-r from-violet-600 to-purple-800 flex  justify-center flex-col ${
        isSignUpMode ? "transition-transform duration-800 ease-in-out -translate-x-full opacity-100" : "transition-transform duration-800 ease-in-out  opacity-100"
      }`;
      const ChangeClasses1 = ` bg-white  p-8 rounded-xl shadow-md w-full max-w-md ${
        isSignUpMode ? "transition-transform duration-800 ease-in-out translate-x-full opacity-100" : "transition-transform duration-800 ease-in-out  opacity-100"
      }`;
      const handleSubmit = (e) => {
        e.preventDefault();
        const user = name.current.value;
        const emailVal = email.current.value;
        const passwordVal = password.current.value;
        Register({name:user,email:emailVal,password:passwordVal});
    } 
    const handleLoginSubmit =async (e) => {
        e.preventDefault();
        const emailVal = email.current.value;
        const passwordVal = password.current.value;
        const result=await Login({email:emailVal,password:passwordVal});
        if(result){
            window.location.reload();
        }   
    }
    return (
        <>
        
        <div className=" bg-gradient-to-r from-purple-700 via-violet-600 to-violet-800 flex items-center justify-center min-h-screen p-4">
        <div className="flex flex-row items-stretch shadow-2xl rounded-2xl bg-transparent overflow-hidden  ">
        <div className={ChangeClasses1}>
        {!isSignUpMode ? <>
        <h1 className="text-3xl text-center mb-10 font-extrabold bg-gradient-to-r from-violet-600 to-purple-800  text-transparent bg-clip-text ">Sign Up</h1>
        <form onSubmit={(e) => {handleSubmit(e)}}>
            <div className="border border-gray-300 rounded px-2 py-1 flex items-center gap-2 m-2 has-focus-visible:shadow-md shadow-violet-400">
            <input className='focus:outline-0 w-full ' placeholder="Name" type="text" name="name" ref={name} required/></div><br/><br/>
            <div className="border border-gray-300 rounded px-2 py-1 flex items-center gap-2 m-2 has-focus-visible:shadow-md shadow-violet-400">
            <input className='focus:outline-0 w-full ' placeholder="Email" type="email" name="email" ref={email} required/></div><br/><br/>
            <div className="border  border-gray-300 rounded px-2 py-1 flex items-center gap-2 m-2 has-focus-visible:shadow-md shadow-violet-400">
            <input className="focus:outline-none w-full " placeholder="Password" type="password" name="password" ref={password} required/></div><br/>
            <div className="flex justify-center">
            <button className='rounded-2xl  bg-gradient-to-r from-violet-600 to-purple-800 text-white p-3 pl-7 pr-7 font-medium hover:bg-bright-color hover:shadow-md shadow-violet-400 focus:ring-primary-300' type="submit">Sign Up</button></div>
        </form>
        </> : <>
        <h1 className="text-3xl text-center mb-10 font-extrabold bg-gradient-to-r from-violet-600 to-purple-800  text-transparent bg-clip-text ">Sign In</h1><br/>
        <form onSubmit={(e) => {handleLoginSubmit(e)}}>
            <div className="border border-gray-300 rounded px-2 py-1 flex items-center gap-2 m-2 has-focus-visible:shadow-md shadow-violet-400">
            <input className='focus:outline-0 w-full ' placeholder="Email" type="email" name="email" ref={email} required/></div><br/><br/>
            <div className="border  border-gray-300 rounded px-2 py-1 flex items-center gap-2 m-2 has-focus-visible:shadow-md shadow-violet-400">
            <input className="focus:outline-none w-full " placeholder="Password" type="password" name="password" ref={password} required/></div><br/><br/>
            <label className="flex items-center gap-2 m-2 font-mono text-sm"><input type="checkbox" className="h-4 w-4"/>Remember Me</label><br/>
            <div className="flex justify-center">
            <button className='rounded-2xl  bg-gradient-to-r from-violet-600 to-purple-800 text-white p-3 pl-7 pr-7 font-medium hover:bg-bright-color hover:shadow-md shadow-violet-400 focus:ring-primary-300' type="submit" >Sign In</button></div>
        </form>
        </>}
        </div>
        <div className={ChangeClasses}> 
        {!isSignUpMode ? <>
        <h1 className="text-3xl text-center  mb-10 text-white font-extrabold ">Hello Friend!</h1>
        <p className=" text-center text-gray-200 font-mono text-sm ">Enter your personal data to start journey with us!!</p>
        <button className='mt-12 rounded-2xl  shadow-violet-600 font-mono text-gray-200 border border-gray-400 p-3 pl-2 pr-2 font-medium text-sm hover:bg-bright-color hover:shadow-md focus:ring-primary-300' onClick={() => {setIsSignUpMode(!isSignUpMode)}}>Sign In</button>
        </> : <>
        <h1 className="text-3xl text-center  mb-10 text-white font-extrabold ">Welcome Back!</h1>
        <p className=" text-center text-gray-200 font-mono text-sm "> please login with your personal info to stay connected!!</p>
        <button className='mt-12 rounded-2xl  shadow-violet-600 font-mono text-gray-200 border border-gray-400 p-3 pl-2 pr-2 font-medium text-sm hover:bg-bright-color hover:shadow-md focus:ring-primary-300' onClick={() => {setIsSignUpMode(!isSignUpMode)}}>Sign Up</button>
        </>}
        </div>
        </div>
        </div>  
        </>
    );
}
export default Auth;