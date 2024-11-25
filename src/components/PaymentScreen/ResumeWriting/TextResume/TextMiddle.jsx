import { Box, useTheme, Grid } from '@mui/material';
import coverImage from '../../../../images/textbannerimg.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
// Ensure this path is correct
import { styled } from '@mui/material/styles';
import { Stepper, Typography } from '@mui/material';
import { Card, CardContent } from '@mui/material';
import DoledgeBenefits from './DoledgeBenefits';
import Blog from '../../../Blog';
import Footer from '../../../Footer';
import { useNavigate } from 'react-router-dom';
import icon1 from '../../../../images/resumeStep1.svg'
import icon2 from '../../../../images/resumeStep2.svg'
import icon3 from '../../../../images/resumeStep3.svg'
import icon4 from '../../../../images/resumeStep4.svg'
import image1 from '../../../../images/image22.png'
import { useContext, useEffect, useState } from 'react';
import contextAuth from '../../../../ContextAPI/ContextAuth';
import axios from 'axios';


const TextMiddle = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const Item = styled('div')(({ theme }) => ({
    backgroundColor: '#f0f0f0',
    padding: theme.spacing(1),
    textAlign: 'center',
    height: '80px', // Set the desired height here
    '@media (min-width: 640px)': { // Small screens and up
      padding: theme.spacing(1), // Responsive padding for small screens and up
      height: '80px', // Responsive height for small screens and up
    },
    '@media (min-width: 768px)': { // Medium screens and up
      padding: theme.spacing(1.4), // Responsive padding for medium screens and up
      height: '80px', // Responsive height for medium screens and up
    },
    '@media (min-width: 1024px)': { // Large screens and up
      padding: theme.spacing(1), // Responsive padding for large screens and up
      height: '80px', // Responsive height for large screens and up
    },
    '@media (min-width: 1280px)': { // Large screens and up
      padding: theme.spacing(1), // Responsive padding for large screens and up
      height: '80px', // Responsive height for large screens and up
    },
  }));

  const {setLoading}=useContext(contextAuth);
  const [middleLevelPlan, setmiddleLevelPlan] = useState();

  useEffect(()=>{
    const fetchData=async()=>{
      setLoading(true);
      try {
        const response=await axios.get(`${process.env.REACT_APP_SERVER_PRO_URL}/api/buytextresumeservice/plans`);
        const { status, plans } = response.data;
        if (status === "success" && Array.isArray(plans) && plans.length > 0){
          setmiddleLevelPlan(plans[1]);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message || "Unknown error");
      }
      setLoading(false);
    }
    fetchData()
  },[])

  const cardContents = [
    {

      steps: 'Step 1',
      title: 'Information Gathering',
      content: 'Our team reviews your information to understand your career goals, strengths, and unique selling points',
      icon: icon1
    },
    {
      steps: 'Step 2',
      title: 'Content Optimization',

      content: 'The text resume is formatted for maximum readability on various devices, ensuring it maintains a professional appearance.',
      icon: icon2

    },
    {
      steps: 'Step 3',
      title: 'Application Process',
      content: 'We deliver the text-optimized resume. Use it for online applications where text submission is accepted',
      icon: icon3
    },
    {
      steps: 'Step 4',
      title: 'Results and Opportunities',
      content: 'Our text resume is designed to make an instant impression, helping you stand out in the competitive job market',
      icon: icon4
    },
  ];

  return (


    <div className='w-[100%] mx-auto'>
      {/* <Slide left cascade> */}
      <div className='flex flex-col lg:flex-row max-w-[1700px] mx-auto'>
        <Box
          sx={{
            backgroundImage: `url(${image1})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            // height: '60vh',
            width: '45%',
            [theme.breakpoints.down(1024)]: {
              width: '100%',
              height: '50vh',
            },
            [theme.breakpoints.down(500)]: {
              width: '100%',
              height: '35vh',
            },
          }}
        />

        <Box
          className='flex items-center'
          sx={{
            // backgroundImage: `url(${bckimg})`,
            backgroundColor: '#13274F',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            paddingTop: '40px',
            // height: '60vh',
            width: '55%',
            [theme.breakpoints.down(1024)]: {
              width: '100%',
              height: '',
            },
            [theme.breakpoints.down('sm')]: {
              paddingBottom: '20px'
            }
          }}
        >
          <div className="flex flex-col justify-between h-full px-7 w-[100%]">
            <div className="pb-4">
              <div className="text-white text-3xl md:text-[36px] lg:text-[32px] xl:text-[36px] font-medium sm:text-center md:text-left leading-[45px] max-md:max-w-full max-sm:text-2xl max-lg:mt-4" style={{fontFamily:'inter'}}>
                Text Resumes: Your Express <br className='hidden lg:block'/> Route to Employment
              </div>
              <div className="text-orange-400 text-lg md:text-xl lg:text-lg xl:text-xl sm:text-center md:text-left max-w-full mt-4" style={{fontFamily:'inter'}}>
                Embrace the simplicity, speed, and impact of text <br className='hidden lg:block'/> to boost your career.
              </div><br />
            </div>
             <Grid container rowSpacing={3} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
              <Grid item xs={6} sm={3}>
                <Item className=' cursor-pointer rounded-md sm:rounded-t-md sm:rounded-b-none' onClick={()=>navigate("/Text-Resume-Entry-Level")}>
                  <b className='text-base md:text-lg lg:text-base xl:text-lg'>Entry-Level </b><br />
                  <p className='text-sm lg:text-[12px] xl:text-[13px]'>(0-3) Years</p>
                </Item>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Item className='scale-y-110 -translate-y-1 cursor-pointer rounded-md sm:rounded-t-md sm:rounded-b-none' onClick={()=>navigate("/Text-Resume-Middle-Level")}>
                  <b className='text-base md:text-lg lg:text-base xl:text-lg'>Middle-Level </b><br />
                  <p className='text-sm lg:text-[12px] xl:text-[13px]'>(3-8) Years</p>
                </Item>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Item className='cursor-pointer rounded-md sm:rounded-t-md sm:rounded-b-none' onClick={()=>navigate("/Text-Resume-Senior-Level")}>
                  <b className='text-base md:text-lg lg:text-base xl:text-lg'>Senior-Level</b><br />
                  <p className='text-sm lg:text-[12px] xl:text-[13px]'>(8-15) Years</p>
                </Item>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Item className='cursor-pointer rounded-md sm:rounded-t-md sm:rounded-b-none' onClick={()=>navigate("/Text-Resume-Executive-Level")}>
                  <b className='text-base md:text-lg lg:text-base xl:text-lg'>Executive-Level </b> <br />
                  <p className='text-sm lg:text-[12px] xl:text-[13px]'>(15 Years & Above)</p>
                </Item>
              </Grid>
            </Grid>
          </div>
        </Box>
      </div>
      {/* </Slide> */}


      <div className="flex justify-center bg-orange-400 w-[100%] mt-4" style={{
        fontSize: 18,
        fontWeight: '500',
        padding: '15px 8px 8px',
        fontFamily: 'Poppins'
      }}>
        <div className="text-white text-center self-center w-[100%] xl:w-[70%] max-md:max-w-full max-w-[1500px] mx-auto text-sm sm:text-xl md:text-2xl lg:text-2xl font-medium flex justify-center items-center">
          Doledge's Text Resume Services are the key to <br className='block'/> unlocking a more efficient and effective job search
        </div>


      </div>

      {/* Doledge Benefits Sections */}

      {middleLevelPlan && <DoledgeBenefits plans={middleLevelPlan} />}



      {/* Filtering Points*/}

      <div className="bg-[#8fc87a] w-full mt-5 text-white">
        <div className="w-[90%] lg:w-[70%] max-w-[1500px] mx-auto flex flex-col gap-y-5 font-medium">

          {/* 1 */}
          <div className='text-justify pl-4 pt-12' style={{ wordWrap: 'break-word' }}>
            <FontAwesomeIcon icon={faCircle} style={{ color: "#ffff" }} />

            <span className='ml-4 text-sm md:text-lg lg:text-xl' style={{ fontFamily: 'Poppins', }}>
              Expertly tailored to beat ATS filters


            </span>
          </div>


          {/* 2 */}
          <div className='text-left pl-4' >
            <FontAwesomeIcon icon={faCircle} style={{ color: "#ffff" }} />

            <span className='ml-4 text-sm md:text-lg lg:text-xl' style={{ fontFamily: 'Poppins', }}>

              Strategically incorporate industry-specific keywords to make your resume stand out


            </span>


          </div>


          {/* 3 */}
          <div className='text-left pl-4' >
            <FontAwesomeIcon icon={faCircle} style={{ color: "#ffff" }} />

            <span className='ml-4 text-sm md:text-lg lg:text-xl' style={{ fontFamily: 'Poppins', }}>
              Our designers create professional, aesthetically pleasing text resumes

            </span>
          </div>
          {/* 4 */}
          <div className='text-left pl-4' >
            <FontAwesomeIcon icon={faCircle} style={{ color: "#ffff" }} />

            <span className='ml-4 text-sm md:text-lg lg:text-xl' style={{ fontFamily: 'Poppins', }}>
              We valuing your input and preferences to produce a resume that truly represents you

            </span>
          </div>
          {/* 5 */}
          <div className='text-left pl-4' >
            <FontAwesomeIcon icon={faCircle} style={{ color: "#ffff" }} />

            <span className='ml-4 text-sm md:text-lg lg:text-xl' style={{ fontFamily: 'Poppins', }}>
              Making your resume usable for all individuals

            </span>
          </div>
          {/* 6 */}
          <div className='text-left pl-4 pb-12' >
            <FontAwesomeIcon icon={faCircle} style={{ color: "#ffff" }} />

            <span className='ml-4 text-sm md:text-lg lg:text-xl' style={{ fontFamily: 'Poppins', }}>
              Crafting text resumes that lead to real-world job opportunities

            </span>
          </div>




        </div>

      </div>


      {/* How it Works */}
      <div className="text-orange-400 font-medium mt-16 mb-8" style=
        {{
          fontSize: 26,
          fontFamily: 'Poppins',
          fontWeight: 500,
          wordWrap: 'break-word',
        }}>
        How it works?
      </div>

      <div className="flex justify-center w-[70%] max-w-[1500px] mx-auto">

        <Stepper sx={{ width: '100%', }} className='mx-auto'>


          <Grid container justifyContent={'center'} alignItems={'center'} spacing={{ lg: 3 }} rowSpacing={3} className='mx-auto'>
            {cardContents.map((card, index) => (
              <Grid item sm={9} md={6} lg={3} key={index} className='mx-auto'>

                <div style={{ fontSize: '15px', fontFamily: 'Poppins', fontWeight: 700, marginBottom: '10px', color: '#5E5E5E' }}>
                  {card.steps}
                </div>
                <div style={{ fontSize: '15px', fontFamily: 'Poppins', fontWeight: 700, marginBottom: '10px' }}>
                  {card.title}
                </div>
                <Card style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '5%' }} className='!bg-[#FCE3D1] mx-auto flex flex-col justify-center items-center p-2 py-3 w-[90%] md:max-lg:w-[70%]'>
                  <img src={card.icon} alt="" className='mx-auto' />
                  <CardContent className='text-center' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px', }}>
                    <Typography variant="h6" component="h2" style={{ fontSize: '13px', fontFamily: 'Poppins', fontWeight: 300, }}>
                      {card.content}
                    </Typography>


                  </CardContent>
                </Card>


              </Grid>
            ))}
          </Grid>

        </Stepper>
      </div>


      {/* </div> */}

      {/* Resume Delivery Time */}
      <div className='mx-auto mt-8 sm:mt-16 md:w-[70%] max-w-[1500px] text-[25px]'>
        <h1 className='text-[22px] leading-[42px] font-semibold'>Resume Delivery Time</h1>
        <div className='mt-3'>
          <table className='mx-auto w-[70%] md:w-[80%]'>
            <thead>
              <tr className='border-2 border-black text-base md:text-lg lg:text-xl h-10 md:h-12'>
                <th>Resume Variant</th>
                <th className='border-l-2 border-r-2'>First Version</th>
                <th>Final Delivery</th>
              </tr>
            </thead>
            <tbody className='text-sm md:text-[15px] lg:text-[20px]'>
              <tr className='border-2 border-black h-10'>
                <td>Regular</td>
                <td className='border-l-2 border-r-2'>8 Working Days</td>
                <td>14 Working Days</td>
              </tr>
              <tr className='border-2 border-black h-10'>
                <td>Express</td>
                <td className='border-l-2 border-r-2'>4 Working Days</td>
                <td>10 Working Days</td>
              </tr>
              <tr className='border-2 border-black h-10'>
                <td>Super Express</td>
                <td className='border-l-2 border-r-2'>2 Working Days</td>
                <td>6 Working Days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


      {/* Blog */}
      <Blog />

      {/* Footer */}
      {/* <Footer/> */}

    </div>
  );
};

export default TextMiddle;