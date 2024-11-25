import React, { useContext, useState, useEffect } from "react";
import Banner from "./Banner";
import Banner_services from "./Banner_services";
import Header from "./Header";
import Contact from "./Contact";
import Mheader from "./Mheader";
import contextAuth from "../ContextAPI/ContextAuth";
import axios from "axios";
import Blog from "./Blog";
import Contactus from "./Contactus";
// import Callme from "./Callme";

const MAINheader = () => {
  const { setLoading, setBlogs } = useContext(contextAuth);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_SERVER_PRO_URL}/api/blogs`)
      .then((response) => {
        // const blogs = response.blogs;
        setBlogs(response?.data?.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, []);

  return (
    <div>
      {/* <Callme/> */}
      <Banner />
      <Banner_services />
      <Header />
      <Contactus />
      <Mheader />
      <Blog />
    </div>
  );
};

export default MAINheader;
