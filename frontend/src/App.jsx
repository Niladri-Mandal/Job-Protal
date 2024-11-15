
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Signup from './components/auth/Signup'
import Navbar from './components/shared/Navbar'
import { Button } from './components/ui/button'
import Layout from './layout/Layout'
import Login from './components/auth/Login'
import Home from './components/Home'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route path="" element={<Layout/>}>
          <Route path="home" element={<Home/>}/>
      </Route>
      <Route path='signup' element={<Signup />} />
      <Route path='login' element={<Login />} />
    </Route>
    
  ),
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
)



function App() {
 

  return (
    <div>
      
      <RouterProvider router={router} future={{
    v7_startTransition: true,
  }}/>
     {/* <Navbar/>
     <h1 className='text-red-500'>We start to create frontEnd</h1>
     <Signup/> */}
      
    </div>
  )
}

export default App
