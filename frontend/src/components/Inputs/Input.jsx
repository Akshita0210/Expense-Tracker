import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

const Input = ({ value, onChange, placeholder, label, type = 'text' }) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div>
      <label className='text-[13px] text-slate-700 font-medium'>{label}</label>

      <div className='flex items-center gap-3 w-full bg-clay-surface rounded-clay-sm px-4 py-3 mt-2 mb-4 shadow-clay-inset focus-within:shadow-clay-primary transition-shadow duration-200'>
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className='w-full bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400'
          value={value}
          onChange={(e) => onChange(e)}
        />

        {type === 'password' && (
          <button
            type='button'
            onClick={toggleShowPassword}
            className='text-slate-400 hover:text-primary cursor-pointer transition-colors'
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
          </button>
        )}
      </div>
    </div>
  )
}

export default Input