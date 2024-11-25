import React, { useState, useEffect } from 'react';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Update the URL to match your API endpoint
    fetch(`${process.env.REACT_APP_SERVER_PRO_URL}/api/blogs`)
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data.data);
      })
      .catch((error) => 
      console.error('Error fetching blogs:', error));
  }, []);

  return (
    <div className='w-5/6 mx-auto pb-4'>
      <section className="pt-[16px]">
        <div className="container">
          <div className="flex flex-wrap justify-center -mx-4">
            <div className="w-full px-4">
              <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
                <h2 className="font-bold text-3xl sm:text-4xl md:text-[40px] text-dark mb-4">
                  Latest Blogs
                </h2>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-4">
            {blogs.map((blog) => (
              <div className="w-full md:w-1/2 lg:w-1/3 px-4" key={blog._id}>
                <div className="max-w-[370px] mx-auto mb-10 border-2 shadow-lg rounded-lg p-4">
                  <div className="rounded overflow-hidden mb-8">
                    <img src={blog.image} alt="image" className="w-full" />
                  </div>
                  <div>
                    <span className="bg-primary rounded inline-block text-center py-1 px-4 text-xs leading-loose font-semibold text-white mb-5">
                      {blog.date}
                    </span>
                    <h3>
                      <a href="javascript:void(0)" className="font-semibold text-xl sm:text-2xl lg:text-xl xl:text-2xl mb-4 inline-block text-dark hover:text-primary">
                        {blog.BlogTitle}
                      </a>
                    </h3>
                    <p className="text-base text-body-color">
                      {blog.Description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
