import React from 'react'
import { IoIosAdd,IoMdSearch } from 'react-icons/io'
import { Link,useNavigate } from 'react-router-dom'


const Navbar = ({searchTerm,search ,user ,setSearchTerm}) => {
    const navigate= useNavigate();
 if (!user) return(null)
    return (

    <div className='flex gap-2 md:gap-10 w-full md:w-50 mt-5 pb-2'>
        <div className='flex justify-start items-center  w-full md:w-50 px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm  '>
            <IoMdSearch fontSize={21} className='ml-1'/>
             <input
                type='text'
                onChange ={e=>setSearchTerm(e.target.value)}
                placeholder='Search'
                value={searchTerm}
                onFocus={()=> navigate('/search')}
                className='p-1 md:w-50 w-full bg-white outline-none'
                
             /> 
        </div>
        <div className='flex gap-3'>
          <Link to={`user-profile/${user?._id}`} className='hidden md:block' >
            <img src={user?.image} alt='user' className='w-14 rounded-lg'/>
          </Link>
          <Link to='create-pin'  className='bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center object-right-bottom '>
            <IoIosAdd />
          </Link>

        </div>
    </div>
  )
}

export default Navbar