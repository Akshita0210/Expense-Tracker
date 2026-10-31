import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import TransactionInfoCard from '../../components/Cards/TransactionInfoCard'
import CustomBarChart from '../../components/Charts/CustomBarChart'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { LuPlus, LuDownload } from 'react-icons/lu'
import moment from 'moment'

const Income = () => {
  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)

  const [source, setSource] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')

  const fetchIncomeDetails = async () => {
    if (loading) return
    setLoading(true)

    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME)
      if (response.data) {
        setIncomeData(response.data)
      }
    } catch (err) {
      console.error('Something went wrong fetching income data', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddIncome = async (e) => {
    e.preventDefault()

    if (!source || !amount || !date) {
      setError('All fields are required.')
      return
    }

    setError('')

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
      })
      setSource('')
      setAmount('')
      setDate('')
      fetchIncomeDetails()
    } catch (err) {
      console.error('Error adding income', err)
      setError('Something went wrong. Please try again.')
    }
  }

  const handleDeleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
      fetchIncomeDetails()
    } catch (err) {
      console.error('Error deleting income', err)
    }
  }

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: 'blob',
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'income_details.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err) {
      console.error('Error downloading income details', err)
    }
  }

  const chartData = incomeData
    .slice()
    .reverse()
    .map((item) => ({
      month: moment(item.date).format('DD MMM'),
      amount: item.amount,
    }))

  useEffect(() => {
    fetchIncomeDetails()
  }, [])

  return (
    <DashboardLayout activeMenu='Income'>
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-clay-surface rounded-clay shadow-clay p-6'>
            <h5 className='text-lg font-medium mb-4'>Add Income</h5>

            <form onSubmit={handleAddIncome}>
              <input
                type='text'
                placeholder='Income Source'
                value={source}
                onChange={(e) => setSource(e.target.value)}
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
                <LuPlus /> Add Income
              </button>
            </form>
          </div>

          <div className='bg-clay-surface rounded-clay shadow-clay p-6'>
            <h5 className='text-lg font-medium mb-4'>Income Overview</h5>
            {chartData.length > 0 ? (
              <CustomBarChart data={chartData} />
            ) : (
              <p className='text-sm text-slate-500'>No income data yet.</p>
            )}
          </div>
        </div>

        <div className='mt-6 bg-clay-surface rounded-clay shadow-clay p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h5 className='text-lg font-medium'>Income Sources</h5>
            <button
              onClick={handleDownloadIncomeDetails}
              className='flex items-center gap-2 text-sm font-medium text-primary bg-clay-surface rounded-clay-sm shadow-clay-sm px-4 py-2 hover:shadow-clay-inset transition-shadow duration-150 cursor-pointer'
            >
              <LuDownload /> Download
            </button>
          </div>

          {incomeData.length > 0 ? (
            incomeData.map((item) => (
              <TransactionInfoCard
                key={item._id}
                title={item.source}
                icon={item.icon}
                date={moment(item.date).format('DD MMM YYYY')}
                amount={item.amount}
                type='income'
                onDelete={() => handleDeleteIncome(item._id)}
              />
            ))
          ) : (
            <p className='text-sm text-slate-500'>No income added yet.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Income