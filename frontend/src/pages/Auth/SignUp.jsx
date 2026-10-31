import React, { useState, useContext } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/UserContext'

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(null)

  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate()

  // Handle Sign Up Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault()

    if (!fullName) {
      setError('Please enter your full name.')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setError('')

    try {
      let profileImageUrl = ''

      if (profilePic) {
        const formData = new FormData()
        formData.append('image', profilePic)

        const uploadRes = await axiosInstance.post(
          API_PATHS.IMAGE.UPLOAD_IMAGE,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        profileImageUrl = uploadRes.data.imageUrl || ''
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
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
      <div className='lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <div className='bg-clay-surface rounded-clay shadow-clay p-8'>
          <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
          <p className='text-xs text-slate-700 mt-1.5 mb-6'>
            Join us today by entering your details below
          </p>

          <form onSubmit={handleSignUp}>
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Input
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                label='Full Name'
                placeholder='John'
                type='text'
              />

              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label='Email Address'
                placeholder='john@example.com'
                type='text'
              />

              <div className='col-span-2'>
                <Input
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  label='Password'
                  placeholder='Min 8 characters'
                  type='password'
                />
              </div>
            </div>

            {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

            <button
              type='submit'
              className='w-full text-sm font-semibold text-white bg-primary rounded-clay-sm py-3 my-1 shadow-clay-primary hover:shadow-clay-sm active:shadow-clay-inset transition-shadow duration-150 cursor-pointer'
            >
              SIGN UP
            </button>

            <p className='text-[13px] text-slate-800 mt-3'>
              Already have an account?{' '}
              <Link className='font-medium text-primary underline' to='/login'>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignUp