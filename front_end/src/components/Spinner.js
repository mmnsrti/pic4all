import React from 'react'
import {HashLoader} from "react-spinners";

const Spinner = ({message}) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full '>
        <HashLoader
            color="#36d7b7"
            size={50}
        />
        <p className='text-lg text-center px-2 '>{message}</p>
    </div>
  )
}

export default Spinner 