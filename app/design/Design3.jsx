const Design3=({data,designRef})=>{
    const PRIMARY_COLOR = 'bg-gray-800'; 
    const ACCENT_COLOR = 'bg-teal-500'; 
    return (
        <>
    <div ref={designRef} className="w-[794px]  mx-auto   bg-white shadow-xl border border-gray-200 relative overflow-hidden">
      

      <div className="grid grid-cols-[30%_70%] h-full">
        

        <div className={`text-white ${PRIMARY_COLOR} p-8 relative`}>
          

          <div className={`absolute top-0 right-0 h-10 w-10 ${ACCENT_COLOR}`}></div>
          <div className={`absolute top-10 right-0 h-10 w-8 ${ACCENT_COLOR} opacity-70`}></div>


          <div className="mt-12 mb-16">
            <h1 className="text-3xl font-bold mb-1">{data.name}</h1>
            <p className="text-lg">{data.role}</p>
          </div>

          <div className="space-y-3 text-xs">

            <p>📧 Email: {data.email}</p>
            <p>📞 Phone: {data.phone}</p>
            <p>🔗 LinkedIn: {data.linkedin}</p>
          </div>


          <div className={`absolute bottom-0 right-0 h-12 w-full ${ACCENT_COLOR} opacity-70`}></div>
          <div className={`absolute bottom-12 right-0 h-12 w-full ${ACCENT_COLOR}`}></div>

        </div>


        <div className="pt-20 p-10 text-gray-800">
            

            {/* <div className="text-right text-xs mb-10 space-y-1">
                <p>Date</p>
                <p>[Hiring Manager Name]</p>
                <p>Company Address</p>
            </div> */}

            <p className="whitespace-pre-line text-sm leading-relaxed">{data.generatedLetter}</p>
{/* 
            <div className="text-right text-sm mt-12">
                <p>Sincerely,</p>
                <p className="mt-2 font-semibold">Sophia Rodriguez</p>
            </div> */}
        </div>
        
      </div>
    </div>
        </>
    )
}
export default Design3;