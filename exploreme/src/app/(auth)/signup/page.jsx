import React from 'react'
import SignUp from './components/sign-up'

const SignupPage = () => {
  return (
    <div className='flex flex-col space-y-5 items-center justify-center min-h-[calc(100vh-3rem)] relative'>
      <h1 className='text-3xl font-semibold text-purple-800'>Signup to Exploreme</h1>
      <SignUp />
    </div>
  )
}

export default SignupPage
