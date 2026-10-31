import React from 'react'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-clay-surface rounded-clay-sm shadow-clay p-3 border-0'>
        <p className='text-xs font-semibold text-slate-700 mb-1'>
          {payload[0].name}
        </p>
        <p className='text-sm text-primary'>
          Amount:{' '}
          <span className='text-sm font-medium text-slate-800'>
            ${payload[0].value}
          </span>
        </p>
      </div>
    )
  }
  return null
}

export default CustomTooltip