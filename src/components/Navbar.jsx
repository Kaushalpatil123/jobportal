import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Dropdown from './Dropdown';
import '../css/Navbar.css';
import styles from '../css/SideBar.module.css';
import "@fontsource/poppins"

import SideBar from '../UI/SideBar/SideBar.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCartArrowDown, faCartFlatbed, faCartShopping, faPhone } from '@fortawesome/free-solid-svg-icons';
import contextAuth from '../ContextAPI/ContextAuth.js';
import recruiterLogo from '../images/employer-login.png'
import toast from "react-hot-toast";
import Callme from './Callme.jsx';

const Navbar = () => {
  const navigate = useNavigate();
  const Auth = useContext(contextAuth);
  const { cart, user } = useContext(contextAuth);
  let [active, setActive] = useState(false);

  const sideBarHandler = (type) => {
    if (type == 'close') {
      setActive(false);
      // console.log(active)

    }
    else if (type == 'toggle') {
      let reverse = !active;
      setActive(reverse);
    }
  }

  return (
    <>
    <Callme/>
      <Container fluid className="px-0 top-0 sticky bg-white z-50">
        {/* TopNav */}
        <div className='flex flex-row justify-end items-center py-2 md:px-8 text-[18px] bg-[#fafafa]'>
          <div className='mr-4 flex flex-row px-2 border-2 rounded-[10px]'>
            <div><FontAwesomeIcon icon={faPhone} /></div>
            {/* <div className='ml-2'>Call Us</div> */}
          </div>

          <div className='mr-4 flex flex-row px-2 border-2 rounded-[10px] cursor-pointer' onClick={()=>navigate('/cart')}>
            <div className='relative'>
              <FontAwesomeIcon icon={faCartShopping} />
              {
                cart > 0 &&
                <span className='absolute -top-2 -right-2 bg-orange-500 text-xs w-4 h-4 font-medium flex justify-center items-center rounded-full text-white'>{cart}</span>
              }
            </div>
            {/* <div className='ml-2'>Cart</div> */}
          </div>

          <div className='mr-4 flex flex-row px-2 border-2 rounded-[10px]'>
            <div><FontAwesomeIcon icon={faBell} /></div>
            {/* <div className='ml-2'>Notifications</div> */}
          </div>
        </div>

        {/* NavBar */}
        <nav className="navbar navbar-expand-lg navbar-light" style={{ border: '0px solid black' }}>
          {/* Logo */}
          <Link to='/' className="navbar-brand">
            <img className='brand translate-y-[-20%]'
              src={require('../images/logo-removed.png')}
              alt="Logo"
            />
          </Link>

          {/* SideBar */}
          <button className="navbar-toggler" type="button" onClick={() => sideBarHandler('toggle')}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>
          <div className='sideBar-hider absolute'>
            <SideBar active={active} onClick={sideBarHandler} />
          </div>

          {/* Nav Links */}
          <div className="navbar-links">
            <ul className="navbar-nav" style={{ border: '0px solid black' }}>
              <li className="nav-item">
                <Link className="nav-link" to='/'>
                  Home
                </Link>
              </li>
              <Dropdown />
            </ul>
          </div>

          {/* Register buttons */}
          <div className='navbar-links'>
            <ul className="navbar-nav navigation-btn flex items-center" style={{ border: '0px solid black' }}>
              {!Auth.token ? (
                <>
                  <li className="nav-item">
                    <Link className="btn login-button" to='/login'>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn register-button" to='/register'>
                      Register
                    </Link>
                  </li>
                  <li className="nav-item border-l-[1.5px] border-[#c1c1c1]">
                    <Link className="flex flex-col justify-center items-center pl-3" to='/register'>
                      <img src={recruiterLogo} alt="" className='w-12' />
                      <p className='text-[15px] leading-[18px]'>
                        RECRUITER LOGIN
                      </p>
                    </Link>
                  </li>
                </>) : (
                <>
                  {/* <li className="nav-item">
                      <Link className="btn register-button" onClick={() => Auth.logout()}>
                        Logout
                      </Link>
                    </li> */}
                  <li className="user-info flex flex-row justify-center items-center rounded-[25px]" style={{ position: 'relative', border: '1px solid #ccc' }}>
                    {Auth?.user?.picture ? <div className='w-[51px] h-[50px] overflow-hidden m-0'>
                      <img src={Auth.user.picture} style={{ objectFit: 'contain' }} className='rounded-full' />
                    </div>
                      : <svg xmlns="http://www.w3.org/2000/svg" width="51" height="50" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16" >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" className='' />
                      </svg>
                    }
                    <div className="btn employer-login1" style={{
                      margin: 0,
                      fontSize: 15,
                      fontFamily: 'Poppins',
                      fontWeight: '400',
                      wordWrap: 'break-word'
                    }}>
                      {Auth.user.name}
                    </div>
                    <div className='w-full h-full pt-3' style={{ position: 'absolute', backgroundColor: 'unset', bottom: '-47px' }}>
                      <div className='user-list'>
                        <Link to='/dashboard' className={['w-full p-2 px-3', styles.viewProfile].join(' ')}>View Profile</Link>
                        <Link className={['w-full', styles.viewProfile].join(' ')} onClick={() => Auth.logout()}>
                          Logout
                        </Link>
                      </div>
                    </div>
                  </li>
                </>
              )
              }
            </ul>
          </div>
        </nav>
      </Container>
    </>
  );
};

export default Navbar;