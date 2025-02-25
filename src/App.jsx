import { useState, useEffect } from 'react'
import authservice from './appwrite/auth'
import { useDispatch } from 'react-redux'
import './App.css'
import { login } from './store/authSlice'
import { Footer, Header } from './Components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(true)
  const dispatch = useDispatch();
  useEffect(() => {
    authservice.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (

    <>
      <div className='bg-gray-900'>
        <h1 className='font-bold text-6xl text-white'>when content exist or loaded</h1>
      </div>
      <Header />
      <main>
        {/* <Outlet /> */}
      </main>
      <Footer />
    </>


  ) : (
    <div>
      Loading
    </div>
  )
}

export default App
