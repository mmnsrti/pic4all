import React ,{useState , useEffect} from 'react'
import { GoogleLogout } from 'react-google-login'
import { AiOutlineLogout } from 'react-icons/ai'
import { useParams , useNavigate } from 'react-router-dom'
import { client } from '../client'
import { userCreatedPinsQuery, userQuery , userSavedPinsQuery} from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const randomImage ='https://source.unsplash.com/1600x900/?nature,photography,technology'
const activeBtnStyles = 'bg-red-500 text-white p-2 rounded-full w-20 outline-none font-bold '
const notActiveBtnStyles =' bg-primary mr-3 text-black p-2 rounded-full w-20 outline-none font-bold'
const Userprofile = () => {
  const [user, setUser] = useState(null)
  const [pins, setPins] = useState(null)
  const [text, setText] = useState('Created')
  const [activeBtn, setActiveBtn] = useState('created')
  const navigate =useNavigate()
  const {userId} =useParams()

  useEffect(() => {
    const query =userQuery(userId)
    client.fetch(query).then((data)=>{setUser(data[0])})
  }, [userId])
  useEffect(() => {
    if (text === 'Created'){
      const createdPinsQuery = userCreatedPinsQuery (userId)
      client.fetch(createdPinsQuery)
      .then((data) =>{
        setPins(data)
      })
    } else {
      const SavedPinsQuery = userSavedPinsQuery (userId)
      client.fetch(SavedPinsQuery)
      .then((data) =>{
        setPins(data)
      })
  }}, [text,userId])
  
  
  if(!user)
  {
    return<Spinner message='Loading Profile'/>
  }
  const logout =()=>{
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className='relative pb-2 h-full justify-center items-center'>
    <div className='flex flex-col pb-5'>
      <div className='relative flex flex-col mb-7'>
        <div className='flex flex-col justify-center items-center'>
          <img 
          src={randomImage}  
          alt='banner-pic'
           className=' w-full h-370 2xl:h-510 shadow-lg object-cover' 
          />
          <img 
            className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
            alt='user-pic'
            src={user.image}
          />

        <h1 className='font-bold text-2xl test-center mt-3 '>{user.userName} </h1>
        <div className='absolute top-0 z-1 right-0 p-2'>
          {userId === user._id && (
            <GoogleLogout
             clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderprops)=> (
            <button type ='button ' 
            className='bg-white  items-center p-3 rounded-full cursor-pointer outline-none shadow-md'
            onClick={renderprops.onClick}
            disabled={renderprops.disabled}> 
           <AiOutlineLogout color='red' fontSize={21}/> 
            </button>)}
          
        onLogoutSuccess ={logout}  
        cookiePolicy="single_host_origin"
      />
          )}
        </div>
        </div>
        <div className='text-center mb-7'>
            <button
            type='button'
            onClick={(e) =>{
              setText(e.target.textContent)
              setActiveBtn('created')
            }}
            className={`${activeBtn==='created'? activeBtnStyles : notActiveBtnStyles}`}
            >
            Created  
            </button>
            <button
            type='button'
            onClick={(e) =>{
              setText(e.target.textContent)
              setActiveBtn('saved')
            }}
            className={`${activeBtn==='saved'? activeBtnStyles : notActiveBtnStyles}`}
            >
            saved  
            </button>
        </div>
        {pins?.length ? (<div className='px-2'>
            <MasonryLayout pins={pins}/>
        </div>):(
          <div className='flex justify-center font-bold items-center w-full mt-2 text-xl'>
            No Pins Found !
        </div>)}
        
      </div>
    </div>
    
    </div>
  )
}

export default Userprofile