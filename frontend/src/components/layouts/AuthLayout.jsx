import React from 'react'
import { LuTrendingUpDown } from 'react-icons/lu'
import CARD_2 from '../../assets/images/CARD_2.png' // adjust to your actual path

const AuthLayout = ({ children }) => {
  return (
    <div className='flex bg-clay-bg'>
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
        <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
        {children}
      </div>

      <div className='hidden md:flex md:items-center md:justify-center w-[40vw] h-screen bg-clay-bg overflow-hidden p-8 relative'>
        <div className='w-[90%] h-[85%] rounded-clay bg-clay-surface shadow-clay relative flex items-center justify-center overflow-hidden'>
          <div className='w-48 h-48 rounded-clay bg-purple-300/50 shadow-clay-sm absolute -top-7 -left-5' />
          <div className='w-48 h-56 rounded-clay bg-fuchsia-300/50 shadow-clay-sm absolute top-[30%] -right-8' />
          <div className='w-48 h-48 rounded-clay bg-violet-300/50 shadow-clay-sm absolute -bottom-7 -left-5' />

          <div className='grid grid-cols-1 z-20 relative'>
            <StatsInfoCard
              icon={<LuTrendingUpDown />}
              label='Track Your Income & Expenses'
              value='430,000'
              color='bg-primary'
            />
          </div>

          <img
            src={CARD_2}
            alt='Card preview'
            className='w-64 lg:w-[70%] absolute bottom-10 rounded-clay-sm shadow-clay'
          />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className='flex gap-6 bg-clay-surface p-4 rounded-clay-sm shadow-clay z-10'>
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full shadow-clay-primary`}
      >
        {icon}
      </div>
      <div>
        <h6 className='text-xs text-gray-500 mb-1'>{label}</h6>
        <span className='text-[20px]'>${value}</span>
      </div>
    </div>
  )
}