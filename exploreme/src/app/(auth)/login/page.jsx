import React from 'react'
import Login from './components/sign-in'

const LoginPage = () => {
  return (
    <div className='flex flex-col space-y-5 items-center justify-center min-h-screen'>
      <h1 className='text-3xl font-semibold text-purple-800'>Login to Exploreme</h1>
        <Login />
    </div>
  )
}

export default LoginPage
