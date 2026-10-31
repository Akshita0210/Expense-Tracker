import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import CustomTooltip from './CustomTooltip'

const CustomBarChart = ({ data }) => {
  const getBarColor = (index) => (index % 2 === 0 ? '#875cf5' : '#cfbefb')

  return (
    <ResponsiveContainer width='100%' height={320}>
      <BarChart data={data}>
        <CartesianGrid stroke='#e2e5ef' strokeDasharray='3 3' vertical={false} />
        <XAxis
          dataKey='month'
          tick={{ fontSize: 12, fill: '#64748b' }}
          stroke='none'
        />
        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} stroke='none' />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />

        <Bar dataKey='amount' radius={[12, 12, 0, 0]} barSize={28}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(index)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default CustomBarChart