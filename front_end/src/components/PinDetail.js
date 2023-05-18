import React ,{useState,useEffect} from 'react'
import { TbDownload } from "react-icons/tb"
import {v4 as uuidv4} from 'uuid'
import {Link , useParams} from 'react-router-dom'
import { client,urlFor } from '../client'
import MasonryLayout from './MasonryLayout'
import { pinDetailMorePinQuery,pinDetailQuery } from '../utils/data'
import Spinner from './Spinner'


function PinDetail({user}) {
  const [pins, setPins] = useState(null)
  const [pindetail, setPindetail] = useState(null)
  const [comment, setComment] = useState('')
  const [addingcomment, setAddingcomment] = useState(false)
  const {pinId} = useParams()
 
  const addComment = () => {
    if (comment) {
      setAddingcomment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment('');
          setAddingcomment(false);
        });
    }
  };
  const fetchPinDetails=()=>{
    let query = pinDetailQuery(pinId)
    if(query){
      client.fetch(query).then((data)=>{
        setPindetail(data[0])
        if (data[0]){
          query=pinDetailMorePinQuery(data[0])
          client.fetch(query).then((res)=>setPins(res))
        }
      })
    }
  }
  useEffect(() => {
  
  fetchPinDetails()
  }, [pinId])
  
  if(!pindetail ) return <Spinner message='Loading pin ...'/>
  return (
    <>
    <div className='flex xl-flex-row flex-col m-auto bg-white 'style={{maxWidth:'1200px ' , borderRadius:'50px' }}>
      <div className='flex justify-center items-center md:items-start flex-initial'>
      <img
              className="rounded-t-3xl rounded-b-xl"
              src={pindetail?.image && urlFor(pindetail?.image).url()}
              alt="user-post"
            />
      </div>
      <div className='w-full p-5 flex-1 xl:min-w-620 '>
        <div className='flex items-center justify-between'>
          <div className='flex gap-2 items-center'>
          <a 
            className='bg-white w-10 h-10 flex justify-center items-center rounded-full text-dark text-xl opacity-60 hover:opacity-100 hover:shadow-md outlined-none'
            href={`${pindetail.image?.asset?.url}?dl=`}
            download
            onClick={(e)=> e.stopPropagation()}
           >
          <TbDownload/>
        </a>

          </div>
          <a href={pindetail.destination} target='_blank' rel='noreferrer' className='flex justify-center rounded-lg opacity-60 hover:opacity-100 hover:shadow-lg outlined-none p-2'>
          {pindetail.destination}

          </a>
        </div>
        <div>
          <h1 className='text-3xl font-bold break-words mt-3'>
            {pindetail.title}
          </h1>
          <p className='mt-3'>
            {pindetail.about}
          </p>
        </div>
        <Link to={`user/profile/${pindetail.postedBy?._id}` } className='flex gap-2 mt-5 bg-white rounded-lg items-center '>
         <img 
          className='w-8 h-8 rounded-full obj-cover'
          src={pindetail.postedBy?.image }
          alt='user-profile'
         />
         <p className='fomt-semibold capitalize'>{pindetail.postedBy?.userName}</p>   
      </Link>
      <h2 className='mt-5 text-2xl'>Comments</h2>
      <div className='max-h-370 overflow-y-auto'>
        {pindetail?.comments?.map((comment,i) =>(
          <div className='flex gap-2 mt-5 items-center rounded-lg bg-white' key={i}>
            <img 
              src={comment.postedBy.image}
              alt='user-profile'
              className='w-10 h-10 rounded-full cursor-pointer'
            />
            <div className='flex flex-col'>
              <p className='font-bold'>{comment.postedBy.userName}</p>
              <p > {comment.comment}</p>
            </div>
          </div>
        ))}

      </div>
      <div className='flex flex-wrap mt-6 gap-3'> 
      <Link to={`user/profile/${pindetail.postedBy?._id}` } >
         <img 
          className='w-10 h-10 rounded-full object-cover'
          src={pindetail.postedBy?.image }
          alt='user-profile'
         />
       
      </Link>
      <input  
        className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300' 
        type='text'
        placeholder='Add a comment'
        value={comment}
        onChange={(e)=>{setComment(e.target.value)}}
      />
      <button 
      className='bg-red-500 tex-white rounded-full px-6 py-2 font-semibold text-base outline-none'
      type='button' 
      onClick={addComment}
      >
        {addingcomment ? 'posting the comment ... ':'Post'}
      </button>
      </div>
      </div>
    
    </div>
    {pins?.length>0 ? (
      <>
        <h1 className='text-center  font-bold text-lg mt-10 mb-1'> More Like this</h1>
         <MasonryLayout pins={pins}/>
      </>
    ): (
      <Spinner message='Loading pins ...'/>
    )}
    </>
  )
}

export default PinDetail