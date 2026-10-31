import React from 'react'

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className='flex gap-6 bg-clay-surface rounded-clay shadow-clay p-6'>
      <div
        className={`w-14 h-14 flex items-center justify-center text-[26px] text-white rounded-full shadow-clay-primary ${color}`}
      >
        {icon}
      </div>

      <div>
        <h6 className='text-sm text-gray-500 mb-1'>{label}</h6>
        <span className='text-[22px] font-semibold'>${value}</span>
      </div>
    </div>
  )
}

export default InfoCard