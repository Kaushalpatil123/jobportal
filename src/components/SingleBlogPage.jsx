import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams hook
import contextAuth from "../ContextAPI/ContextAuth"; // Import the context
import Image4 from "../images/JobSearch4.png";
import bgImage from "../images/bgJobSearch.png";

const SingleBlogPage = () => {
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const { blogId } = useParams();
  const { token } = useContext(contextAuth);

  useEffect(() => {
    // Fetch the blog data based on the blog ID
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_DEV_URL}/api/blogs/${blogId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("this is token ----->", token);

        console.log(response.data);
        setBlog(response.data);
        setDescription(response.data.blog.description);
        setTitle(response.data.blog.title);
        setImage(response.data.blog.image);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();

    // Clean up function
    return () => {
      // Any cleanup code (if needed)
    };
  }, [blogId, token]); // Add token to the dependency array

  // if (!blog) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="   text-black  ">
      <div
        className="firstbox  "
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="flex justify-around items-center mx-auto pt-3 max-w-[1500px]">
          <div className="hidden md:block max-w-[28%]">
            <img
              src={Image4}
              alt=""
              className="mix-blend-darken w-[85%] h-full object-contain"
            />
          </div>
        </div>
      </div>
      <div className=" pb-20   flex lg:flex-col flex-col lg:mx-auto w-full justify-center align-middle text-center ">
        <h2 className="text-3xl font-bold w-full font-sans  lg:mb-10 lg:mt-9 ">
          {title}
        </h2>

        <div className="mainblog w-[80%] m-auto pb-10 ">
          <img
            className=" mx-auto px-4 w-[90%]  mt-7 mb-4"
            src={image}
            alt="hello"
          />

          <div
            className=" description pl-20 pr-10 text-left text-black  mt-10 "
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;
