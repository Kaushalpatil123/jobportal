import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import contextAuth from "../ContextAPI/ContextAuth";
import { FaRegEye } from "react-icons/fa6";
import { PiShareFat } from "react-icons/pi";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const { setLoading, blogs, setBlogs, token } = useContext(contextAuth);
  const navigate = useNavigate();

  const likeBlog = async (blogId) => {
    if (!token) {
      toast.error("Please login");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_PRO_URL}/api/blogs/${blogId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedBlogs = blogs.map((blog) =>
        blog._id === blogId ? response.data.data : blog
      );
      setBlogs(updatedBlogs);
      
      
    } catch (error) {
      console.log("LIKE_BLOG API ERROR:", error);
      toast.error("Unable to like");
    }
  };

  const shareBlog = async (blogId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_PRO_URL}/api/blogs/${blogId}/share`
      );
      navigator.clipboard.writeText(
        `${window.location.toString()}blogs/${blogId}`
      );
      toast.success("Link Copied to Clipboard");
    } catch (error) {
      console.log("SHARE_BLOG API ERROR:", error);
      toast.error("Could not share blog");
    }
  };

  const openSingleBlogPage = (blogId) => {
    navigate(`/single-blog-page/${blogId}`);
  };

  const responsive = [
    {
      breakpoint: 1800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        arrows: false,
        dots: true,
        dotsClass: "slick-dots !m-0",
      },
    },
  ];

  const settings = {
    slidesToShow: 3,
    className:
      "!flex !justify-between !items-center !gap-x-3 !p-1 w-[95%] lg:w-[80%] xl:w-[70%] !max-w-[1500px] !mx-auto",
    responsive: responsive,
    infinite: true,
    autoplay: false,
    swipeToSlide: true,
    pauseOnHover: true,
  };

  return (
    <div
      className=" my-10 flex flex-col gap-y-10 blog-list-style-type w-full"
      style={{ fontFamily: "inter" }}
    >
      <h1 className="text-2xl font-semibold text-center">Latest Blogs</h1>

      {blogs !== false && (
        <Slider {...settings}>
          {Object.values(blogs)
            .slice(-3)
            .reverse()
            .map((blog) => (
              <div
                key={blog._id}
                className=" mainbox  relative w-full h-[400px] max-sm:h-[350px] border-2 border-[#00000033] rounded-xl "
              >
                <div
                  className=" imagebox h-full cursor-pointer relative"
                  onClick={() => openSingleBlogPage(blog._id)}
                >
                  <img
                    src={blog?.image}
                    alt="blog_image"
                    loading="lazy"
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
                <div className="descriptionbox text-white  absolute bottom-0 left-0 w-full p-3 flex flex-col justify-between">
                  <h2
                    className="text-base md:text-lg font-medium cursor-pointer"
                    onClick={() => openSingleBlogPage(blog._id)}
                  >
                    {blog?.title}
                  </h2>
                  {/* <div className="flex justify-between items-center gap-x-3 cursor-pointer border-2 py-1 px-2 rounded-xl w-[45%] min-w-[110px] ml-auto">
                    <div className="flex justify-center items-center gap-x-2">
                      <FaRegEye onClick={() => likeBlog(blog._id)} />
                      {blog?.likes}
                    </div>
                    <div className="flex justify-center items-center gap-x-2">
                      <PiShareFat />
                      {blog?.share}
                    </div>
                  </div> */}
                </div>
              </div>
            ))}
        </Slider>
      )}
    </div>
  );
};

export default Blog;
