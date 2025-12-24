

const Design1 = ({data,designRef}) => {

    return (
          <div ref={designRef} className="w-[794px]  mx-auto m-10 p-10 bg-white">
            <div className="grid grid-cols-[1fr_2px_2.5fr] gap-x-6">
              <div className="pr-4">
                <h1 className="text-4xl font-bold mb-1">{data.name}</h1>
                <p className="text-xl mb-8">{data.role}</p>
      
                <div className="mt-10">
                  <h3 className="text-lg font-bold mb-2 tracking-wider">Contact Details</h3>
                  <p className="text-sm">{data.phone}</p>
                  <a href={data.email} className="text-sm font-medium text-black underline hover:text-blue-600 transition">
                    {data.email}
                  </a><br/>
                  <a href={data.linkedin} className="text-sm font-medium underline hover:text-blue-600 transition">{data.linkedin}</a>
                </div>
              </div>
              <div className="bg-black h-full w-full"></div>
              <div className="pl-6 text-gray-700">
                <p className="whitespace-pre-line text-sm leading-relaxed">{data.generatedLetter}</p>
              </div>
            </div>
          </div>
    );
  };
  
  export default Design1;
  