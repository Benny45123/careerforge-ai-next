

const Design2 = ({data,designRef}) => {
    return (
      
      <div ref={designRef} className="w-[794px] mx-auto  p-15 bg-white shadow-xl border border-gray-200 text-gray-800">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-1">{data.name}</h1>
          <p className="text-xl mb-4">{data.role}</p>
  
          <div className="border border-gray-800  mb-5"></div>
          <div className="flex justify-between items-start text-sm">
            <div className="space-y-1">
              <p>Email: {data.email}</p>
              <p>Phone: {data.phone}</p>
              <p>Linkedin: {data.linkedin}</p>
            </div>
  
          </div>
        </div>
  
        <div className="mt-12">
          
          <div className="whitespace-pre-line text-sm leading-relaxed">{data.generatedLetter}</div>
          </div>
  
        </div>
    );
  };
  
  export default Design2;