import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import Logo from '../../assets/logo.png'
import Search_icon from '../../assets/search_icon.svg'
import Bell_icon from '../../assets/bell_icon.svg'
import profile_icon from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'
import { Navigate, useNavigate } from 'react-router-dom'

const Navbar = () => {
   const navRef =useRef()
   const navigate =useNavigate()

   useEffect(()=>{
    window.addEventListener('scroll',()=>{
      if(window.scrollY >=80){
        navRef.current.classList.add('nav-dark')
      }else{
           navRef.current.classList.remove('nav-dark')
      }
    })
   })

  return (
    <div ref={navRef} className='navbar'>
         <div className="navbar-left">
            <img src={Logo} alt="" />

            <ul>
              <li onClick={()=>navigate('/')}>Home</li>
              <li>TV Shows</li>
              <li>Movies</li>
              <li>New & Popular</li>
              <li onClick={()=>navigate('/my-list')}>My List</li>
              <li>Browse by Language</li>
            </ul>
         </div>
         <div className="navbar-right">
            <img src={Search_icon} alt="" className='icons'/>
            <p>Children</p>
             <img src={Bell_icon} alt="" className='icons'/>
             <div className="navbar-profile">
                 <img src={profile_icon} alt="" className='profile'/>
                <img src={caret_icon} alt="" className=''/>

                <div className="dropdown">
                  <p onClick={()=>{logout()}}>Sign out of Netflix</p>
                </div>
             </div>
         </div>
    </div>
  )
}

export default Navbar