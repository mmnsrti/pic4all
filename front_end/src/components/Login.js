
import GoogleLogin from 'react-google-login'
import { useNavigate,useEffect } from 'react-router-dom'
import {FcGoogle} from 'react-icons/fc'
import React from 'react';
import { particlesCursor } from 'threejs-toys'
import logo from '../assets/Logo.png'
import Snow from '../assets/Snow.mp4';
import { client } from '../client';
import { gapi } from 'gapi-script';

function Login() { 
  
  
  const navigate = useNavigate();
  const responseGoogle=(response)=> {
   
    localStorage.setItem('user',JSON.stringify(response.profileObj))
    const { name , googleId,imageUrl} = response.profileObj;
    const doc ={
      _id: googleId,
      _type:'user',
      userName:name,
      image:imageUrl,

    }
  client.createIfNotExists(doc).then(()=> navigate('/',{replace:true}))
    
  }
  
  
 
  return (
  <div>
      <div className="flex justify-start item-center flex-col h-screen">
        <div className="relative w-full h-full">
          <video
          src={Snow}
          type='video/mp4'
          loop
          controls={false}
          autoPlay
          muted
          className='w-full h-full object-cover'/>

        </div>
      </div>
      <div className='absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 '>
        <div className='p-5 '>
          <img src={logo} width="130px" alt="logo"/> 
        </div>
   
     <div className=" shadow-2xl  ">
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
        render={(renderprops)=> (
         <button type ='button ' 
          className='bg-white flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none '
          onClick={renderprops.onClick}
          disabled={renderprops.disabled}> 
          <FcGoogle className='mr-6'/> sign in with Google
          </button>)}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
      />
      </div>
    </div>
 
    

  </div>
  )
}





export default Login