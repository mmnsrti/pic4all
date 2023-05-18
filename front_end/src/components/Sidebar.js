import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import Logo from '../assets/Logo.png'
import { categories } from '../utils/data'
const Sidebar = ({user,closeToggle}) => {
  const handleCloseSidebar =()=>{
    if (closeToggle ) closeToggle(false)
  }
  const isNotActiveStyle = 'flex items-center px5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
 
  const isActiveStyle = 'flex items-center px5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize'  
  return (
    <div className=' flex flex-col justify-between h-full overflow-y-scroll min-w-210  hide-scrollbar'>
      <div className='flex flex-col'>
        <Link to ='/'
          className='flex px-5 gap-2 my-6 pt-2 w-190 item-center' 
          onClick={handleCloseSidebar}>
            <img src={Logo} alt='logo' className='w-20'/>
        </Link>
        <div className='flex flex-col gap-5' >
          <NavLink
          to="/"
          className={({isActive})=> isActive ? isActiveStyle : isNotActiveStyle }
          onClick={handleCloseSidebar}
          >
            <AiFillHome />
            Home  
          </NavLink>
          <h3 className='mt-2 px-5 text-base 2xl:text-xl '>
            Discover categories
          </h3>
          {categories.slice(0,categories.length-1).map((category)=>(
            <NavLink
            to={`/category/${category.name}`}
            className={({isActive})=> isActive ? isActiveStyle : isNotActiveStyle }
            onClick={handleCloseSidebar}
            key={category.name}
            >
            <img src={category.image} className='w-8 h-8 rounded-full shadow-sm' alt='category'/>
              {category.name}
            </NavLink>)
            
          )}
        </div>
      </div>
      {user&&(
        <Link
        to={`user-profile/${user?._id}`}
        className='flex my-5 mb-3 gap-7 p-5 items-center rounded-lg shadow-lg mx-5'
        onClick={handleCloseSidebar}
        >
          <img src={user.image} className='w-10 h-10 rounded-full' alt='user-profile'/>
          <p>{user.userName}</p>
        </Link>
      )}
    </div>
  )
}

export default Sidebar