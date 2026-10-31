import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/inputs/Input'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/UserContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate()

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (!password) {
      setError('Please enter your password.')
      return
    }

    setError('')

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      })

      const { token, user } = response.data

      if (token) {
        localStorage.setItem('token', token)
        updateUser(user)
        navigate('/dashboard')
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError('Something went wrong. Please try again.')
      }
    }
  }

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <div className='bg-clay-surface rounded-clay shadow-clay p-8'>
          <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
          <p className='text-xs text-slate-700 mt-1.5 mb-6'>
            Please enter your details to log in
          </p>

          <form onSubmit={handleLogin}>
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label='Email Address'
              placeholder='john@example.com'
              type='text'
            />

            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label='Password'
              placeholder='Min 8 characters'
              type='password'
            />

            {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

            <button
              type='submit'
              className='w-full text-sm font-semibold text-white bg-primary rounded-clay-sm py-3 my-1 shadow-clay-primary hover:shadow-clay-sm active:shadow-clay-inset transition-shadow duration-150 cursor-pointer'
            >
              LOGIN
            </button>

            <p className='text-[13px] text-slate-800 mt-3'>
              Don't have an account?{' '}
              <Link className='font-medium text-primary underline' to='/signup'>
                SignUp
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Login