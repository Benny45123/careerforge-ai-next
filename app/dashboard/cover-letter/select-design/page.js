"use client"
import previewImage from '@/public/cv-preview1.png';
import previewImage2 from '@/public/cv-preview2.jpg';
import previewImage3 from '@/public/cv-preview3.jpg';
import previewImage4 from '@/public/cv-preview4.jpg';
import previewImage5 from '@/public/cv-preview5.jpg';
import previewImage6 from '@/public/cv-preview6.png';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import Image from 'next/image';
import { useContext, useEffect,useRef,useState } from 'react';
import { AppContext } from '@/app/context/AppContext';
import { getCoverLetters } from '@/app/services/BackendHandler';
import Design1 from '@/app/design/Design1';
import Design2 from '@/app/design/Design2';
import Design3 from '@/app/design/Design3';
import Design4 from '@/app/design/Design4';
import Design5 from '@/app/design/Design5';
import Design6 from '@/app/design/Design6';
const handleDesignSelect = ({design,setSelectedDesign}) => {
  console.log("Selected design:", design);
  setSelectedDesign(design);
}
const handleConfirmDesign = ({selectedDesign,confirmDesign}) => {
  confirmDesign(selectedDesign);
}
const SelectDesign = () => {
  const {setSelectedDesign,selectedDesign,user}=useContext(AppContext); 
  const [coverLetterData,setCoverLetterData]=useState(null);
  const designRef =useRef(null);
  useEffect(()=>{
    getCoverLetters({setCoverLetterData})
  })
  const confirmDesign=async ()=>{
    if(!designRef.current){ return }
    const printContent=designRef.current;
    const imgData = await toPng(printContent, { quality: 1.0 ,pixelRatio: 3,cacheBust:true,fontEmbedCSS: `
    `,});
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${user.name}_Cover_Letter_${Date.now()}.pdf`);
  };

  return (
    <>
<div  className="transition-all duration-500 md:w-3/4 h-full bg-gray-200 p-4 ">
    <div className='bg-white p-6 rounded-2xl shadow-md'>
        <h1 className='font-bold text-center pb-5'>Select Your Design</h1>
        <br />
        <div className='grid md:grid-cols-3 gap-4 m-2'>
          <div className='border border-gray-300 rounded-lg p-4 hover:shadow-md shadow-cyan-400'onClick={() => handleDesignSelect({design:1,setSelectedDesign})}>
            <h2 className='font-semibold text-center mb-2'>Design 1</h2>
            <div className=' flex items-center justify-center'><Image src={previewImage}/></div>
          </div>
          <div className='border border-gray-300 rounded-lg p-4 hover:shadow-md shadow-fuchsia-400'onClick={() => handleDesignSelect({design:2,setSelectedDesign})}>
            <h2 className='font-semibold text-center mb-2'>Design 2</h2>
            <div className='flex items-center justify-center'><Image src={previewImage2}/></div>
          </div>
          <div className='border border-gray-300 rounded-lg p-4 hover:shadow-md shadow-purple-400'onClick={() => handleDesignSelect({design:3,setSelectedDesign})}>
            <h2 className='font-semibold text-center mb-2'>Design 3</h2>
            <div className=' flex items-center justify-center'><Image src={previewImage3}/></div>
          </div>
        </div>
    <div className='grid md:grid-cols-3 gap-4 m-2'>
        <div className='border border-gray-300 rounded-lg p-4 hover:shadow-md shadow-rose-400'onClick={() => handleDesignSelect({design:4,setSelectedDesign})}>
            <h2 className='font-semibold text-center mb-2'>Design 4</h2>
            <div className=' flex items-center justify-center'><Image src={previewImage4}/></div>
        </div>
        <div className='border border-gray-300 rounded-lg p-4 hover:shadow-md shadow-indigo-400'onClick={() => handleDesignSelect({design:5,setSelectedDesign})}>
            <h2 className='font-semibold text-center mb-2'>Design 5</h2>
            <div className=' flex items-center justify-center'><Image src={previewImage5}/></div>
        </div>
        <div className='border border-gray-300 rounded-lg p-4 hover:shadow-md shadow-emerald-400'onClick={() => handleDesignSelect({design:6,setSelectedDesign})}>
            <h2 className='font-semibold text-center mb-2'>Design 6</h2>
            <div className=' flex items-center justify-center'><Image src={previewImage6}/></div>
        </div>
    </div>
    <div className='flex justify-center pb-5'>
    <button onClick={()=>handleConfirmDesign({selectedDesign,confirmDesign})} className='mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md'>Confirm Design</button>
    </div>
</div>
</div>
{(selectedDesign&&coverLetterData)&&
    <div style={{ marginLeft: '75%' }}className="transition-all duration-300 md:w-1/4 h-20  p-4 top-100 fixed flex items-center justify-center ">
      <div className='bg-white p-6 rounded-2xl shadow-2xl w-80 h-auto border border-gray-300'>
        {selectedDesign ? <h1 className='font-bold text-center pb-5'>Selected Design Preview</h1> :  <h1 className='font-bold text-center pb-5'>No Design Selected</h1>}
        <br />
        
        {selectedDesign==1&&    <div className='overflow-auto  max-h-[450px] w-[250px] border border-gray-200 shadow-md z-0'><Design1 designRef={designRef} data={coverLetterData}/></div>}
        {selectedDesign==2&&    <div className='overflow-auto max-h-[450px] max-w-[250px] z-0'><Design2 designRef={designRef} data={coverLetterData}/></div>}
        {selectedDesign==3&&    <div className='overflow-auto max-h-[450px] max-w-[250px] z-0'><Design3 designRef={designRef} data={coverLetterData}/></div>}
        {selectedDesign==4&&    <div className='overflow-auto max-h-[450px] max-w-[250px] z-0'><Design4 designRef={designRef} data={coverLetterData}/></div>}
        {selectedDesign==5&&    <div className='overflow-auto max-h-[450px] max-w-[250px] z-0'><Design5 designRef={designRef} data={coverLetterData}/></div>}
        {selectedDesign==6&&    <div className='overflow-auto max-h-[450px] max-w-[300px] z-0'><Design6 designRef={designRef} data={coverLetterData}/></div>}
      </div> 
    </div>}
</>
  );
}
export default SelectDesign;