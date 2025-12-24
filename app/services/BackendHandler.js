const postData=async ({data}) =>{
    const formData = new FormData();
    formData.append('jobDescription', data.jobDescription);
    formData.append('skillsFocus', data.skills);
    formData.append('resume', data.resume);
    formData.append('recruiterName', data.recruiterName);
    formData.append('recruiterDesignation', data.designation);
    formData.append('companyName', data.companyName);
    try {
        const response = await fetch('/api/cover-letter/generate-cover-letter', {
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
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials:'include',
            headers:{
                "Content-Type":"application/json"
            },
        })
        const result = await response.json();
        console.log('Success:', result.message);
    }
    catch (error) {
        console.error('Error:', error);
    }
}
const Login =async ({email,password})=>{
    const data={email,password};
    try {
        const response =await fetch('/api/login',{
            method:'POST',
            credentials:'include',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json",
            },
        })
        const result =await response.json();
        if(response.ok){
            console.log('Success:', result.message);
            return true;
        }
        else{
            throw new Error(result.message);
        }
    }
    catch(error){
        console.error('Error:',error);
    }
}
const checkLogin=async({setUser})=>{
    try{
      const response=await fetch('/api/user',{
        method:'GET',
        credentials:'include',
      });
      if(response.ok){
        const data=await response.json();
        // console.log(data);
        setUser(data.user);
        return data.user;;
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

  const handleLogout=async ({setUser})=>{
    try{
      const response=await fetch('/api/logout',{
        method:'POST',
        credentials:'include',
      });
      if(response.ok){
        setUser(null);
        window.location.reload();
      }
    }
    catch(error){
      console.error('Error:',error);
    }
  }
  const getCoverLetters=async ({setCoverLetterData})=>{
    try{
      const response=await fetch('/api/cover-letter/user/cover-letters',{
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
      const response=await fetch('/api/cover-letter/user/cover-letters',{
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
      const response = await fetch('/api/resume/analyze-resume', {
          method: 'POST',
          body: formData,
          credentials:'include'
      });
      const result = await response.json();
      console.log(result);
      return result;
    }
    catch (error) {
        console.error('Error:', error);
    }
  }
  const getAllResumes=async ()=>{
    try{
      const response=await fetch('/api/resume/user/resumes',{
        method:'GET',
        credentials:'include',
      })
      if(response.ok){
        const data=await response.json();
        console.log(data);
        return data;
    }
  }
    catch(error){
      console.error('Error:',error);
    }
  }

export {postData,Register,Login,checkLogin,handleLogout,getCoverLetters,getAllCoverLetters,postResumeData,getAllResumes};  