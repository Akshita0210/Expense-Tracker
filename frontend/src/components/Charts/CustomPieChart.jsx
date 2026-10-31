import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import CustomTooltip from './CustomTooltip'

const CustomPieChart = ({ data, colors, totalAmount, label }) => {
  return (
    <ResponsiveContainer width='100%' height={320}>
      <PieChart>
        <Pie
          data={data}
          dataKey='amount'
          nameKey='name'
          cx='50%'
          cy='50%'
          innerRadius={80}
          outerRadius={110}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>

        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType='circle'
          wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
        />

        <text
          x='50%'
          y='47%'
          textAnchor='middle'
          dominantBaseline='middle'
          className='text-sm fill-slate-500'
        >
          {label}
        </text>
        <text
          x='50%'
          y='54%'
          textAnchor='middle'
          dominantBaseline='middle'
          className='text-lg font-semibold fill-slate-800'
        >
          ${totalAmount}
        </text>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart
