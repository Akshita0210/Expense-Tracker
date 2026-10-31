import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import CustomTooltip from './CustomTooltip'

const CustomLineChart = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={320}>
      <LineChart data={data}>
        <defs>
          <linearGradient id='lineFill' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#875cf5' stopOpacity={0.3} />
            <stop offset='95%' stopColor='#875cf5' stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid stroke='#e2e5ef' strokeDasharray='3 3' vertical={false} />
        <XAxis
          dataKey='date'
          tick={{ fontSize: 12, fill: '#64748b' }}
          stroke='none'
        />
        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} stroke='none' />
        <Tooltip content={<CustomTooltip />} />

        <Line
          type='monotone'
          dataKey='amount'
          stroke='#875cf5'
          strokeWidth={3}
          dot={{ r: 4, fill: '#875cf5', strokeWidth: 0 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default CustomLineChart