import React ,{useEffect} from 'react'
import { Route,Routes,useNavigate } from 'react-router-dom'

import Home from './container/Home';
import Login from './components/Login';
import { fetch } from './utils/fetch';
const App = () => {
  const navigate = useNavigate()
  useEffect(() => {
  const user =fetch()
  if (!user) navigate ('/login')
  }, [])
  
  return (
   <Routes>
     <Route path="/*" element={<Home/>} />
     <Route path="login" element={<Login />}/>
   </Routes>
  )
}

export default App