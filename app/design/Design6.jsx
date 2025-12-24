const Design6 =({data,designRef})=>{

    return (
        <>
    <div ref={designRef} className="w-[794px] mx-auto   bg-white shadow-xl border border-gray-200 relative overflow-hidden">
      
      <div className="bg-gradient-to-r from-pink-600  to-orange-500 text-white p-8">
        
        <div className="text-right mb-10">
          <h1 className="text-3xl font-bold uppercase tracking-wider">{data.name}</h1>
          <p className="text-lg opacity-90 mt-1 ">{data.role}</p>
        </div>
        <div className="w-full  mx-auto mb-6 border-t border-white"></div>
        <div className="flex justify-between items-center text-sm mt-8 pb-4">
          <div className="text-center w-1/5">
            <p className="font-bold">Phone</p>
            <p className="text-sm">{data.phone}</p>
          </div>

          <div className="text-center w-2/5">
            <p className="font-bold">Email</p>
            <p className="text-sm">{data.email}</p>
          </div>
          <div className="text-center w-1/5">
            <p className="font-bold">Linkedin</p>
            <p className="text-sm">{data.linkedin}</p>
          </div>
        </div>
      </div>

      <div className="p-12 pt-8 text-gray-800">


        {/* <p className="mb-6 text-sm">Dear Riley Harris,</p>

        <p className="mb-4 leading-relaxed text-sm">
          As an experienced digital marketing manager with a track record of success, I'm excited to apply for the position of Digital Marketing Manager at Limitless. During my five years in the field, I have honed my skills in developing and implementing effective digital marketing strategies that drive business growth.
        </p>

        <p className="mb-4 leading-relaxed text-sm">
          In my previous role at MetroPlus, I achieved a **32% increase in website traffic** through a combination of SEO optimization, targeted social media advertising, and email marketing campaigns. Additionally, I oversaw the launch of a new mobile app that resulted in a **48% increase in downloads** within the first six months.
        </p>

        <p className="mb-12 leading-relaxed text-sm">
          I'm passionate about staying up-to-date with the latest trends and technologies in the digital marketing space, and Limitless' innovative approach to marketing is what inspired me to apply. I'm confident my experience managing teams and collaborating with cross-functional stakeholders to achieve business objectives makes me an ideal candidate for the role.
        </p>

        <p className="text-sm">Thank you for considering my application. I look forward to further discussing my qualifications and how I can help your business to continue to thrive in marketing is what inspired me to apply.</p>

        <div className="mt-10">
          <p className="text-sm">Sincerely,</p>
          <p className="text-lg font-bold uppercase mt-1">ANTHONY SANTORO</p>
        </div> */}
        <p className="whitespace-pre-line text-sm leading-relaxed">{data.generatedLetter}</p>
      </div>
    </div>
        </>
    )
}
export default Design6;