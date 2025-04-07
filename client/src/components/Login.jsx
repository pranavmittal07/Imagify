import React, { useEffect, useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Login = () => {
  const [state, setState] = useState('Login')
    const {setShowLogin} = useContext(AppContext)
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    },[])

  const toggleState = () => {
    setState((prev) => (prev === 'Login' ? 'Sign Up' : 'Login'))
  }

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <form className='relative bg-white p-10 rounded-xl text-slate-500 w-full max-w-md'>
        <h1 className='text-center text-2xl font-semibold text-neutral-700 mb-2'>{state}</h1>
        <p className='text-sm mb-4 text-center'>
            {state === 'Login'
                ? 'Welcome back! Please sign in to continue'
                : 'Join us! Please fill in the details to create your account'}
        </p>

        {state !== 'Login' && (
          <div className='border px-6 py-2 rounded-full flex items-center my-4'>
            <input
              className='ml-2 outline-none text-sm w-full'
              type='text'
              placeholder='Full Name'
              required
            />
          </div>
        )}

        <div className='border px-6 py-2 rounded-full flex items-center my-4'>
          <img src={assets.email_icon} alt="Email" />
          <input
            className='ml-2 outline-none text-sm w-full'
            type='email'
            placeholder='Email ID'
            required
          />
        </div>

        <div className='border px-6 py-2 rounded-full flex items-center my-4'>
          <img src={assets.lock_icon} alt="Password" />
          <input
            className='ml-2 outline-none text-sm w-full'
            type='password'
            placeholder='Password'
            required
          />
        </div>

        <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot Password?</p>

        <button
          className='bg-blue-600 w-full text-white py-2 rounded-full hover:bg-blue-700 transition'
          type='submit'
        >
          {state === 'Login' ? 'Login' : 'Create Account'}
        </button>

        <div className='mt-5 text-center text-sm'>
          {state === 'Login' ? (
            <>
              <p>Don't have an account?</p>
              <span className='text-blue-600 cursor-pointer' onClick={toggleState}>
                Sign Up
              </span>
            </>
          ) : (
            <>
              <p>Already have an account?</p>
              <span className='text-blue-600 cursor-pointer' onClick={toggleState}>
                Sign In
              </span>
            </>
          )}
        </div>
        
        <img onClick={()=>setShowLogin(false)}src={assets.cross_icon} className='absolute top-5 right-5 cursor-pointer' alt="" />

      </form>
    </div>
  )
}

export default Login
