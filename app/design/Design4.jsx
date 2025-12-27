const Design4 = ({data,designRef}) => {

    const ACCENT_COLOR = 'teal-500';
    return (
        <>
        <div ref={designRef} className="w-[794px]  mx-auto  bg-white shadow-xl border border-gray-200 relative overflow-hidden">
        <div className="bg-gray-800 text-white p-6">
            <h1 className="text-3xl font-bold mb-1">{data.name}</h1>
            <p className="text-lg mb-4">{data.role}</p>


            <div className="flex flex-col items-center gap-2 text-sm">
  <p className="flex items-center gap-1 whitespace-nowrap">
    📧 <span className="font-semibold">Email:</span> {data.email}
  </p>
  <p className="flex items-center gap-1 whitespace-nowrap">
    🔗 <span className="font-semibold">LinkedIn:</span> {data.linkedin}
  </p>
  <p className="flex items-center gap-1 whitespace-nowrap">
    📞 <span className="font-semibold">Phone:</span> {data.phone}
  </p>
</div>



            {/* <div className={`h-1 bg-${ACCENT_COLOR} mb-1 -mx-6`}></div> */}
        </div>
        <div className={`h-1 bg-${ACCENT_COLOR} mb-1 -mx-6`}></div>

        <div className="p-12 text-gray-800">
            

            <p className="whitespace-pre-line text-sm leading-relaxed">{data.generatedLetter}</p>


        </div>



    </div>
        </>
    )
}
export default Design4;