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
import { Syne } from "next/font/google";
const syne=Syne({subsets:['latin'],weight:['400','700']});
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

  const designs = [
    { id: 1, name: 'Design 1', image: previewImage, gradient: 'from-cyan-500/20 to-blue-500/20' },
    { id: 2, name: 'Design 2', image: previewImage2, gradient: 'from-fuchsia-500/20 to-pink-500/20' },
    { id: 3, name: 'Design 3', image: previewImage3, gradient: 'from-purple-500/20 to-indigo-500/20' },
    { id: 4, name: 'Design 4', image: previewImage4, gradient: 'from-rose-500/20 to-red-500/20' },
    { id: 5, name: 'Design 5', image: previewImage5, gradient: 'from-indigo-500/20 to-violet-500/20' },
    { id: 6, name: 'Design 6', image: previewImage6, gradient: 'from-emerald-500/20 to-teal-500/20' },
  ];

  return (
    <>
<div  className="transition-all duration-500 md:w-3/4 h-full bg-white/10 p-4 rounded-2xl shadow-2xl border border-gray-300">
    <div className=' p-6 rounded-3xl shadow-md '>
        <h1 className={`font-bold text-center pb-5 text-5xl text-transparent bg-clip-text bg-gradient-to-r from-violet-700 via-pink-700 to-purple-700 animate-gradient-move ${syne.className}`}>Select Your Design</h1>
        <br />
        <div className='grid md:grid-cols-3 gap-6 mb-6'>
          {designs.map((design)=>(
            <div key={design.id} className={`border-2 bg-gradient-to-br ${design.gradient} rounded-lg p-4 cursor-pointer hover:scale-105 transform transition-all duration-500 ${selectedDesign===design.id ? 'border-blue-500 shadow-lg' : 'border-transparent hover:border-gray-300'}`} onClick={()=>handleDesignSelect({design:design.id,setSelectedDesign})}>
              <div className={` p-3 rounded-lg`}>
                <Image src={design.image} alt={design.name} className="w-full h-auto rounded-lg shadow-md" />
              </div>
              <h2 className="text-center mt-2 text-white font-semibold">{design.name}</h2>
            </div>
          )
            
          )}
    </div>
    <div className='flex justify-center pb-5'>
    <button onClick={()=>handleConfirmDesign({selectedDesign,confirmDesign})} className='mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md'>Confirm Design</button>
    </div>
</div>
</div>
{(selectedDesign&&coverLetterData)&&
    <div style={{ marginLeft: '75%' }}className="transition-all duration-300 md:w-1/4 h-20  p-4 top-100 fixed flex items-center justify-center ">
      <div className='bg-white/10 p-6 rounded-2xl shadow-2xl w-80 h-auto border border-gray-300'>
        {selectedDesign ? <h1 className={`font-bold text-center pb-5 text-white ${syne.className}`}>Selected Design Preview</h1> :  <h1 className='font-bold text-center pb-5'>No Design Selected</h1>}
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