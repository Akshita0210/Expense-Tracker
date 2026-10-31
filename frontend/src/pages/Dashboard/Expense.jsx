import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import TransactionInfoCard from '../../components/Cards/TransactionInfoCard'
import CustomBarChart from '../../components/Charts/CustomBarChart'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { LuPlus, LuDownload } from 'react-icons/lu'
import moment from 'moment'

const Expense = () => {
  const [expenseData, setExpenseData] = useState([])
  const [loading, setLoading] = useState(false)

  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')

  const fetchExpenseDetails = async () => {
    if (loading) return
    setLoading(true)

    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE)
      if (response.data) {
        setExpenseData(response.data)
      }
    } catch (err) {
      console.error('Something went wrong fetching expense data', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddExpense = async (e) => {
    e.preventDefault()

    if (!category || !amount || !date) {
      setError('All fields are required.')
      return
    }

    setError('')

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
      })
      setCategory('')
      setAmount('')
      setDate('')
      fetchExpenseDetails()
    } catch (err) {
      console.error('Error adding expense', err)
      setError('Something went wrong. Please try again.')
    }
  }

  const handleDeleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))
      fetchExpenseDetails()
    } catch (err) {
      console.error('Error deleting expense', err)
    }
  }

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: 'blob',
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'expense_details.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err) {
      console.error('Error downloading expense details', err)
    }
  }

  const chartData = expenseData
    .slice()
    .reverse()
    .map((item) => ({
      month: moment(item.date).format('DD MMM'),
      amount: item.amount,
    }))

  useEffect(() => {
    fetchExpenseDetails()
  }, [])

  return (
    <DashboardLayout activeMenu='Expense'>
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-clay-surface rounded-clay shadow-clay p-6'>
            <h5 className='text-lg font-medium mb-4'>Add Expense</h5>

            <form onSubmit={handleAddExpense}>
              <input
                type='text'
                placeholder='Category (e.g. Food, Rent)'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='input-box'
              />
              <input
                type='number'
                placeholder='Amount'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className='input-box'
              />
              <input
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className='input-box'
              />

              {error && <p className='text-red-500 text-xs mb-3'>{error}</p>}

              <button
                type='submit'
                className='flex items-center gap-2 text-sm font-semibold text-white bg-primary rounded-clay-sm py-3 px-5 shadow-clay-primary hover:shadow-clay-sm active:shadow-clay-inset transition-shadow duration-150 cursor-pointer'
              >
                <LuPlus /> Add Expense
              </button>
            </form>
          </div>

          <div className='bg-clay-surface rounded-clay shadow-clay p-6'>
            <h5 className='text-lg font-medium mb-4'>Expense Overview</h5>
            {chartData.length > 0 ? (
              <CustomBarChart data={chartData} />
            ) : (
              <p className='text-sm text-slate-500'>No expense data yet.</p>
            )}
          </div>
        </div>

        <div className='mt-6 bg-clay-surface rounded-clay shadow-clay p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h5 className='text-lg font-medium'>Expenses</h5>
            <button
              onClick={handleDownloadExpenseDetails}
              className='flex items-center gap-2 text-sm font-medium text-primary bg-clay-surface rounded-clay-sm shadow-clay-sm px-4 py-2 hover:shadow-clay-inset transition-shadow duration-150 cursor-pointer'
            >
              <LuDownload /> Download
            </button>
          </div>

          {expenseData.length > 0 ? (
            expenseData.map((item) => (
              <TransactionInfoCard
                key={item._id}
                title={item.category}
                icon={item.icon}
                date={moment(item.date).format('DD MMM YYYY')}
                amount={item.amount}
                type='expense'
                onDelete={() => handleDeleteExpense(item._id)}
              />
            ))
          ) : (
            <p className='text-sm text-slate-500'>No expenses added yet.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Expense