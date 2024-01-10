import React from 'react'
import Signup from './Pages/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
     <Route path='/' element={ <Signup/>}/>
     <Route path='/Login' element={ <Login/>}/>
      
    </Routes>
    </BrowserRouter>

    
    

   
    </>
  )
}

export default App