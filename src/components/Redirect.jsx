import React from 'react'

const Redirect = () => {
    var url_string = window.location;
    var url = new URL(url_string);
    var vid = url.searchParams.get("Id");
    console.log(vid)
    document.cookie = `token=${vid} ; max-age=${60*60*24*30}`;
    window.location.href = '/register';
  return (
    <div className='text-white'>redirect</div>

  )
}

export default Redirect