const postData=async ({data}) =>{
    const formData = new FormData();
    formData.append('jobDescription', data.jobDescription);
    formData.append('skillsFocus', data.skills);
    formData.append('resume', data.resume);
    formData.append('recruiterName', data.recruiterName);
    formData.append('recruiterDesignation', data.designation);
    formData.append('companyName', data.companyName);
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cover-letter/generate-cover-letter`, {
            method: 'POST',
            body: formData,
            credentials:'include'
        })
        const result = await response.json();
        return result;

    }
    catch (error) {
        console.error('Error:', error);
    }
}
const Register=async ({name,email,password}) =>{
    const data={name,email,password};
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
            method: 'POST',
            body: JSON.stringify(data),
            credentials:'include',
            headers:{
                "Content-Type":"application/json"
            },
        })
        const result = await response.json();
        if(response.ok){
          // console.log("Register result: ",result);
          // return true;
          return result;
        }
        return false;
    }
    catch (error) {
        console.error('Error:', error);
    }
}
const Login =async ({email,password})=>{
    const data={email,password};
    try {
        const response =await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`,{
            method:'POST',
            credentials:'include',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json",
            },
        })
        const result =await response.json();
        if(response.ok){
            // console.log('Success:', result.message);
            return true;
        }
        else{
          // console.log(result);
            throw new Error(result.message);
        }
    }
    catch(error){
        console.error('Error:',error);
    }
}
const checkLogin=async()=>{
    try{
      const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`,{
        method:'GET',
        credentials:'include',
      });
      if(response.ok){
        const data=await response.json();
        // console.log(data);
        return data.user;
      }
      else{
        return null
      }
    }
    catch(error){
      console.error('Error:',error);
      return null;
      
    }
  }

  const handleLogout=async ()=>{
    try{
      const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`,{
        method:'POST',
        credentials:'include',
      });
      if(response.ok){
        console.log("Logout confirmed");
        return true
      }
    }
    catch(error){
      console.error('Error:',error);
    }
  }
  const getCoverLetters=async ({setCoverLetterData})=>{
    try{
      const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cover-letter/user/cover-letters`,{
        method:'GET',
        credentials:'include',
      })
      if(response.ok){
        const data=await response.json();
        // console.log(data);
        if(data.coverLetters && data.coverLetters.length>0){
          setCoverLetterData(data.coverLetters[0]);
          // console.log('Cover letters fetched successfully');
          // return data;
        }
      }
    }
    catch(error){
      console.error('Error:',error);
    }
  }
  const getAllCoverLetters=async ()=>{
    try{
      const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cover-letter/user/cover-letters`,{
        method:'GET',
        credentials:'include',
      })
      if(response.ok){
        const data=await response.json();
        // console.log(data);
        if(data.coverLetters && data.coverLetters.length>0){
          // console.log('Cover letters fetched successfully');
          // return data;
          const coverLetters=data.coverLetters;
          // console.log(coverLetters);
          return coverLetters;
        }
      }
    }
    catch(error){
      console.error('Error:',error);
    }
  }
  const postResumeData=async ({data}) =>{
    const formData = new FormData();
    formData.append('jobDescription', data.jobDescription);
    formData.append('resume', data.resume);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/analyze-resume`, {
          method: 'POST',
          body: formData,
          credentials:'include'
      });
      const result = await response.json();
      // console.log(result);
      return result;
    }
    catch (error) {
        console.error('Error:', error);
    }
  }
  const getAllResumes=async ()=>{
    try{
      const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/user/resumes`,{
        method:'GET',
        credentials:'include',
      })
      if(response.ok){
        const data=await response.json();
        // console.log(data);
        return data;
    }
  }
    catch(error){
      console.error('Error:',error);
    }
  }
  const verifyOtp= async ({userId,otp})=>{
    const data = {userId,otp}
    // console.log(userId);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/verify-otp`,{
      method:'POST',
      credentials:'include',
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      },
    })
    const result=await response.json();
    if(result.verified==true){
      // console.log(result.message);
      return true;
    }

  }
  const resendOtp=async ({userId,email})=>{
    try{
    const data = {userId,email}
    // console.log(data)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resend-otp`,{
      method:'POST',
      credentials:'include',
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      },
    })
    const result=await response.json();
    if(result.status==="Pending.."){
      // console.log("Resend success",result);
      return {result,Message:"Resend Otp successful"}
    }
    return {result,Message:"Resend Unsuccessful"}
  }
  catch(err){
    console.error("Something went wrong",err);
  }

  }

export {postData,Register,Login,checkLogin,handleLogout,getCoverLetters,getAllCoverLetters,postResumeData,getAllResumes,verifyOtp,resendOtp};  