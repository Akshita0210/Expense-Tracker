import React from 'react'
import { LuTrendingUp, LuTrendingDown, LuTrash2 } from 'react-icons/lu'

const TransactionInfoCard = ({
  icon,
  title,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const getAmountStyles = () =>
    type === 'income' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'

  return (
    <div className='group relative flex items-center gap-4 bg-clay-surface rounded-clay-sm shadow-clay-sm p-4 mb-3 hover:shadow-clay transition-shadow duration-150'>
      <div className='w-12 h-12 flex items-center justify-center text-xl bg-clay-bg rounded-full shadow-clay-inset'>
        {icon ? (
          <img src={icon} alt={title} className='w-6 h-6' />
        ) : (
          <span className='text-sm text-slate-500'>{title?.[0]}</span>
        )}
      </div>

      <div className='flex-1 flex items-center justify-between'>
        <div>
          <p className='text-sm text-slate-800 font-medium'>{title}</p>
          <p className='text-xs text-slate-500 mt-1'>{date}</p>
        </div>

        <div className='flex items-center gap-3'>
          {!hideDeleteBtn && (
            <button
              onClick={onDelete}
              className='text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
            >
              <LuTrash2 size={18} />
            </button>
          )}

          <div
            className={`flex items-center gap-1 px-3 py-1.5 rounded-clay-sm text-sm font-medium ${getAmountStyles()}`}
          >
            <span>
              {type === 'income' ? '+' : '-'}${amount}
            </span>
            {type === 'income' ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionInfoCard