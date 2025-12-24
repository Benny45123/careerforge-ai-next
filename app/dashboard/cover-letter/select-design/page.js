"use client"
import previewImage from '@/public/cv-preview1.png';
import previewImage2 from '@/public/cv-preview2.jpg';
import previewImage3 from '@/public/cv-preview3.jpg';
import previewImage4 from '@/public/cv-preview4.jpg';
import previewImage5 from '@/public/cv-preview5.jpg';
import previewImage6 from '@/public/cv-preview6.png';
import Image from 'next/image';
const handleDesignSelect = ({design,setIsOpen,setSelectedDesign}) => {
  console.log("Selected design:", design);
  setIsOpen(false);
  setSelectedDesign(design);
}
const handleConfirmDesign = ({selectedDesign,confirmDesign}) => {
  confirmDesign(selectedDesign);
}
const SelectDesign = ({ isOpen,setIsOpen,setSelectedDesign,selectedDesign,confirmDesign}) => {
  return (
<div style={{marginLeft : isOpen ? '25%' : '0'}} className="transition-all duration-300 md:w-3/4 h-full bg-gray-200 p-4 ">
    <div className='bg-white p-6 rounded-2xl shadow-md'>
        <h1 className='font-bold text-center pb-5'>Select Your Design</h1>
        <br />
        <div className='grid md:grid-cols-3 gap-4 m-2'>
          <div className='border border-gray-300 rounded-lg p-4 hover:shadow-md shadow-cyan-400'onClick={() => handleDesignSelect({design:1,setIsOpen,setSelectedDesign})}>
            <h2 className='font-semibold text-center mb-2'>Design 1</h2>
            <div className=' flex items-center justify-center'><Image src={previewImage}/></div>
          </div>
          <div className='border border-gray-300 rounded-lg p-4 hover:shadow-md shadow-fuchsia-400'onClick={() => handleDesignSelect({design:2,setIsOpen,setSelectedDesign})}>
            <h2 className='font-semibold text-center mb-2'>Design 2</h2>
            <div className='flex items-center justify-center'><Image src={previewImage2}/></div>
          </div>
          <div className='border border-gray-300 rounded-lg p-4 hover:shadow-md shadow-purple-400'onClick={() => handleDesignSelect({design:3,setIsOpen,setSelectedDesign})}>
            <h2 className='font-semibold text-center mb-2'>Design 3</h2>
            <div className=' flex items-center justify-center'><Image src={previewImage3}/></div>
          </div>
        </div>
    <div className='grid md:grid-cols-3 gap-4 m-2'>
        <div className='border border-gray-300 rounded-lg p-4 hover:shadow-md shadow-rose-400'onClick={() => handleDesignSelect({design:4,setIsOpen,setSelectedDesign})}>
            <h2 className='font-semibold text-center mb-2'>Design 4</h2>
            <div className=' flex items-center justify-center'><Image src={previewImage4}/></div>
        </div>
        <div className='border border-gray-300 rounded-lg p-4 hover:shadow-md shadow-indigo-400'onClick={() => handleDesignSelect({design:5,setIsOpen,setSelectedDesign})}>
            <h2 className='font-semibold text-center mb-2'>Design 5</h2>
            <div className=' flex items-center justify-center'><Image src={previewImage5}/></div>
        </div>
        <div className='border border-gray-300 rounded-lg p-4 hover:shadow-md shadow-emerald-400'onClick={() => handleDesignSelect({design:6,setIsOpen,setSelectedDesign})}>
            <h2 className='font-semibold text-center mb-2'>Design 6</h2>
            <div className=' flex items-center justify-center'><Image src={previewImage6}/></div>
        </div>
    </div>
    <div className='flex justify-center pb-5'>
    <button onClick={()=>handleConfirmDesign({selectedDesign,confirmDesign})} className='mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md'>Confirm Design</button>
    </div>
</div>
</div>
  );
}
export default SelectDesign;