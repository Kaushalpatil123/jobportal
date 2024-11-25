import React from 'react'
import { FaArrowRight, FaFileAlt, FaAddressBook } from "react-icons/fa";
import ReactSpeedometer from "react-d3-speedometer";
import { FaFileCirclePlus } from 'react-icons/fa6'
import bgImage from '../../../../images/QualityScoreBg.jpg';


const ResumeQualityReport = () => {
  let score = Math.floor((Math.random() * 50) + 20);
  return (
    <div>
      <div>
        {/* blue image div */}
        <div className={`mx-auto`}>
          <div className="bg-no-repeat w-full absolute left-[50%] translate-x-[-50%] h-[300px] max-w-[1900px]" style={{ backgroundImage: `url(${bgImage})` }}>
          </div>
          <div className=' mx-auto sm:w-[90%] xl:w-fit relative pt-4 mb-5'>
            {/* header */}
            <h1 className='text-lg lg:text-2xl xl:text-4xl font-medium text-white break-normal'> Hi User, Your resume scored  {score} Out of 100</h1>
            <p className='text-base xl:text-lg mt-3 text-white'>Your resume needs urgent attention ! Consult Our Doledge experts in order to improve your resume</p> 


            {/* box */}
            <div className=' w-[70%] xl:w-[80%] mx-auto flex flex-col items-center gap-3 2xl:gap-5 xl:flex-row text-start px-3 sm:p-10 py-3 sm:pt-14 mt-4 bg-white drop-shadow-xl'>
              {/* left section */}
              <div className='  h-auto text-xl font-medium '>

                <div className='flex p-3 mt-2 bg-[#f1f7ff] h-auto  flex-col items-center w-full mb-5'>
                  <div className='hidden sm:block'>
                    <ReactSpeedometer
                      maxValue={100}
                      needleColor="black"
                      value={score}
                      segments={4}
                      segmentColors={[
                        "limegreen"
                      ]}
                      width={250}
                      height={230}
                      needleTransitionDuration={2000}
                      needleHeightRatio={0.8}
                      currentValueText=' Needs Urgent Review '
                    />
                  </div>
                  <span className='text-2xl text-black text-center'>Your  Resume Score </span>
                  <span className='text-2xl text-black text-center'>{score}/100</span>
                </div>
                <h2 className=' text-xl md:text-2xl w-[90%] mx-auto mt-2'>
                  Summary of your resume
                </h2>
                <div className='p-1'>
                  <ul
                    role="list"
                    className="text-start list-disc pl-5 space-y-1 text-slate-700 xl:mb-6 "
                  >
                    <li className='pt-2 text-base font-light '> Font style and line spacing across your resume is not consistent.</li>
                    <li className='pt-2 text-base font-light mt-2 '> Your resume does not have the relevant action verbs to demonstrate professional impact.</li>
                    <li className='pt-2 text-base font-light mt-2'>You may need to quantify your achievements a bit more to add credibility.</li>
                  </ul>
                </div>
              </div>





              {/* mid section */}


              <div className='h-auto w-full  xl:w-[60%] 2xl:w-[45%] '>
                <h2 className='text-xl   md:text-2xl xl:text-3xl w-[90%] text-start font-medium mx-auto mt-3'>
                  Get comprehensive report from Doledge experts on
                </h2>
                <div>
                  <ul className='p-2 xl:mt-3'>

                    <li className='text-xl flex font-medium mt-4 gap-4 items-start'>
                      <div className=' rounded-full bg-[#9bc7f9] w-max-content p-2'><FaFileAlt color="white"
                      /></div>

                      <div>Visual Appeal
                        <p className='text-base font-normal mt-1'>An average recruiter spends less than 7 seconds on a resume. Does your resume make an instant impression to the recruiter?</p>
                      </div>
                    </li>


                    <li className='text-xl flex font-medium mt-4 gap-4 items-start'>
                      <div className=' rounded-full bg-[#9bc7f9] w-max-content p-2'><FaAddressBook color="white"
                      /></div>

                      <div>Resume Strategy
                        <p className='text-base font-normal mt-1'>Is your resume positioning you as a professional who will add value to the organization</p>
                      </div>
                    </li>


                    <li className='text-xl flex font-medium mt-4 gap-4 items-start'>
                      <div className=' rounded-full bg-[#9bc7f9] w-max-content p-2'><FaFileCirclePlus color="white"
                      /></div>

                      <div>Digital Readiness
                        <p className='text-base font-normal mt-1'>Over 85% of the recruiters use Softwares to filter out candidates. Learn how to make it past the online software Let us help you unlock the true potential of your resume</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>


              {/* right section */}
              <div className='w-[45%] p-3 mx-auto'>
                <h2 className='text-lg lg:text-xl font-medium  text-center '>
                  Next Steps To improve your Resume
                </h2>


                <div className='shadow-[0px_12px_28px_0px_rgba(0,0,0,0.2),_0px_2px_4px_0px_rgba(0,0,0,0.1),_0px_0px_0px_1px_rgba(255,255,255,0.05)] inset-1 mt-8 text-center justify-center  w-[90%] xl:w-[75%] py-3 mx-auto'>
                  <h2 className='text-lg  font-medium px-2'>
                    Get Personalized resume feedback
                  </h2>

                  <div className=' mt-4 '>
                    <button className='bg-[#ff8128] text-white text-xl xl:text-2xl font-semibold flex justify-center items-center px-3  md:px-7 py-2 rounded-lg  w-max-content  mx-auto outline-none ' style={{ fontFamily: 'inter' }}>
                      Know More

                      <span className='ml-3'> <FaArrowRight /></span>
                    </button>

                  </div>

                </div>
                <p className='text-[#414c5f] text-sm text-center mt-4 w-[90%]'>
                  OR
                </p>


                <div className='bg-[#f3f9ff] w-[90%] xl:w-[75%]  mt-4 justify-center text-center p-3 mx-auto'>
                  <p className=' w-[90%] font-light'>Take the next steps towards
                    improving your resume</p>
                  <p className='text-[#4a90e2] font-semibold text-base  mt-3'>Get a professionally written Resume</p>
                </div>



              </div>
            </div>


            {/* <Footer/> */}
          </div>
        </div>

      </div>

    </div>
  )
}

export default ResumeQualityReport;