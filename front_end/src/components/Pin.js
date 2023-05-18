import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { v4 as uuidv4  } from 'uuid'
import { TbDownload } from "react-icons/tb";
import {client,urlFor} from '../client'
import { fetch } from '../utils/fetch';
import { BsArrowUpRightCircle } from "react-icons/bs";
import { RiDeleteBin7Line } from "react-icons/ri";
const Pin = ({pin:{postedBy,image,_id ,destination,save}}) => {
  const [PostedHovered, setPostedHovered] = useState(false)
  const [savingPost, setSavingPost] = useState(false)
  const navigate=useNavigate()
  const user = fetch()
  const alreadysaved= !!(save?.filter((item)=>item?.postedBy?._id===user?.googleId))?.length
  const savePin = (id) =>{
     if(!alreadysaved){
    setSavingPost(true)
    client
    .patch(id)
    .setIfMissing({save:[]})
    .insert('after','save[-1]',[{
      _key:uuidv4(),
      userId:user?.googleId,
      postedBy:{
        _type:'postedBy',
        _ref:user?.googleId
      }
     
      }]) 
      .commit()
      .then(()=>{
        window.location.reload()
        setSavingPost(false)}

  
  )}}
  const unsavepin = (id) =>{
    if(alreadysaved){
   setSavingPost(false)
   client
   .patch(id)
   .setIfMissing({save:[]})
   .delete('after','delete[-1]',[{
     _key:uuidv4(),
     userId:user?.googleId,
     postedBy:{
       _type:'postedBy',
       _ref:user?.googleId
     }
    
     }]) 
     .commit()
     .then(()=>{
       window.location.reload()
       setSavingPost(false)}

 
 )}}
 

 

  const deletePin =(id) =>{
    client
    .delete(id)
    .then(()=>{window.location.reload()})
  } 
  return (
  
    <div className='m-5'>
      <div onMouseEnter={()=>setPostedHovered(true)}
      onMouseLeave={()=>setPostedHovered(false)}
      onClick={()=>navigate(`/pin-detail/${_id}`)}
       className='relative curser-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
      >
        <img className='rounded-lg w-full' alt='user-post' src={urlFor(image).width(500).url()}/>
        {PostedHovered && (
          <div
          className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pt-2 pr-2 pb-2 z-50'
          style={{height :'100%'}}
        >
        <div className='flex items-center justify-between'>
        <div className='flex gap-2'>
          <a 
            className='bg-white w-10 h-10 flex justify-center items-center rounded-full text-dark text-xl opacity-60 hover:opacity-100 hover:shadow-md outlined-none'
            href={`${image?.asset?.url}?dl=`}
            download
            onClick={(e)=> e.stopPropagation()}
           >
          <TbDownload/>
        </a>

        </div>
        {alreadysaved ?(
          <button type='button' className='bg-red-500 opacity-60 hover:opacity-100 text-white font-bold px-5 py-1 text-bbase rounded-2xl hover:shadow-lg outlined-none'
          onClick=
        {(e)=>{ e.stopPropagation()
          unsavepin(save)}}>
            {save?.length} saved
          </button>
        ):
        (<button type='button' className='bg-red-500 opacity-60 hover:opacity-100 text-white font-bold px-5 py-1 text-bbase rounded-2xl hover:shadow-lg outlined-none'  
        onClick=
        {(e)=>{ e.stopPropagation()
         savePin(_id)}} >
          save
        </button>)}
        </div>
          <div className='flex justify-between items-center gap-2 w-full'>
            {destination && (
              <a 
              href={destination}
              target='_blank'
              rel='noreferrer'
              className='bg-white flex items-center gap-1 tex-black font-bold p-0 pl-3 pr-4 rounded-full opacity-60 hover:opacity-100 hover:shadow-md '
              >
              <BsArrowUpRightCircle />
                {destination.length>20 ? destination.slice(12,16):destination.slice(8)}
              </a>
            )
            }
            {postedBy?._id === user?.googleId && (
              <button
              onClick=
                 {(e)=>{ e.stopPropagation()
                deletePin(_id)}}
                className='bg-white w-10 h-10 flex justify-center items-center rounded-full text-dark text-xl opacity-60 hover:opacity-100 hover:shadow-md outlined-none'
              >
              <RiDeleteBin7Line/>
            </button>)}
          </div>

        </div> )}
        
      </div>
      <Link to={`user/profile/${postedBy?._id}` } className='flex gap-2 mt-2 items-center'>
         <img 
          className='w-8 h-8 rounded-full obj-cover'
          src={postedBy?.image }
          alt='user-profile'
         />
         <p className='fomt-semibold capitalize'>{postedBy?.userName}</p>   
      </Link>
    </div>
  )
}

export default Pin

