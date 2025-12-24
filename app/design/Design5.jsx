const Design5 =({data,designRef})=>{

    const HEADER_BG = 'bg-gray-800'; // Dark Blue/Gray for the header
  const ACCENT_COLOR = 'bg-yellow-600'
    return (
        <>
        <div ref={designRef} className="w-[794px]  mx-auto  bg-white shadow-xl border border-gray-200 relative overflow-hidden">
      

      <div className={`text-white ${HEADER_BG} p-10`}>
        <div className="flex justify-between items-center">
          

          <div>
            <h1 className="text-3xl font-bold mb-1 text-yellow-600">{data.name}</h1>
            <p className="text-lg opacity-90">{data.role}</p>
          </div>

          <div className="flex space-x-6 text-sm">

            <p className="flex items-center">
              <span className="mr-1">📧</span>  {data.email}
            </p>
            <p className="flex items-center">
              <span className="mr-1">📞</span> {data.phone}
            </p>
            <p className="flex items-center max-w-xs ">
              <span className="mr-1">🔗</span>{data.linkedin}
            </p>
          </div>

        </div>
      </div>

      <div className={`h-1 ${ACCENT_COLOR} -mt-0.5`}></div>


      <div className="p-12 pt-10 text-gray-800">
        
        <p className="whitespace-pre-line text-sm leading-relaxed">{data.generatedLetter}</p>

      </div>
    </div>
        </>
    )
}
export default Design5;