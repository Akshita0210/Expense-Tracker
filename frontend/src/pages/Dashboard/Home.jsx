import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import InfoCard from '../../components/Cards/InfoCard'
import TransactionInfoCard from '../../components/Cards/TransactionInfoCard'
import CustomPieChart from '../../components/Charts/CustomPieChart'
import CustomBarChart from '../../components/Charts/CustomBarChart'
import CustomLineChart from '../../components/Charts/CustomLineChart'
import { LuWalletMinimal, LuTrendingUp, LuTrendingDown } from 'react-icons/lu'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import moment from 'moment'

const Home = () => {
  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchDashboardData = async () => {
    if (loading) return
    setLoading(true)

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA)
      if (response.data) {
        setDashboardData(response.data)
      }
    } catch (err) {
      console.error('Something went wrong fetching dashboard data', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  // Pie chart: Income vs Expense split
  const pieData = [
    { name: 'Total Income', amount: dashboardData?.totalIncome || 0 },
    { name: 'Total Expense', amount: dashboardData?.totalExpense || 0 },
  ]
  const pieColors = ['#875cf5', '#fa2c37']

  // Bar chart: last 30 days expense, grouped by day
  const expenseBarData = (dashboardData?.last30DaysExpenses?.transactions || [])
    .slice()
    .reverse()
    .map((txn) => ({
      month: moment(txn.date).format('DD MMM'),
      amount: txn.amount,
    }))

  // Line chart: last 60 days income, grouped by day
  const incomeLineData = (dashboardData?.last60DaysIncome?.transactions || [])
    .slice()
    .reverse()
    .map((txn) => ({
      date: moment(txn.date).format('DD MMM'),
      amount: txn.amount,
    }))

  return (
    <DashboardLayout activeMenu='Dashboard'>
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
            icon={<LuWalletMinimal />}
            label='Total Balance'
            value={dashboardData?.totalBalance || 0}
            color='bg-primary'
          />

          <InfoCard
            icon={<LuTrendingUp />}
            label='Total Income'
            value={dashboardData?.totalIncome || 0}
            color='bg-green-500'
          />

          <InfoCard
            icon={<LuTrendingDown />}
            label='Total Expense'
            value={dashboardData?.totalExpense || 0}
            color='bg-red-500'
          />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
          <div className='bg-clay-surface rounded-clay shadow-clay p-6'>
            <h5 className='text-lg font-medium mb-4'>Income vs Expense</h5>
            <CustomPieChart
              data={pieData}
              colors={pieColors}
              label='Balance'
              totalAmount={dashboardData?.totalBalance || 0}
            />
          </div>

          <div className='bg-clay-surface rounded-clay shadow-clay p-6'>
            <h5 className='text-lg font-medium mb-4'>Expenses (Last 30 Days)</h5>
            {expenseBarData.length > 0 ? (
              <CustomBarChart data={expenseBarData} />
            ) : (
              <p className='text-sm text-slate-500'>No expense data yet.</p>
            )}
          </div>

          <div className='bg-clay-surface rounded-clay shadow-clay p-6 lg:col-span-2'>
            <h5 className='text-lg font-medium mb-4'>Income (Last 60 Days)</h5>
            {incomeLineData.length > 0 ? (
              <CustomLineChart data={incomeLineData} />
            ) : (
              <p className='text-sm text-slate-500'>No income data yet.</p>
            )}
          </div>
        </div>

        <div className='mt-6 bg-clay-surface rounded-clay shadow-clay p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h5 className='text-lg font-medium'>Recent Transactions</h5>
            <button
              onClick={() => navigate('/income')}
              className='text-sm text-primary font-medium hover:underline'
            >
              See All
            </button>
          </div>

          {dashboardData?.recentTransactions?.length > 0 ? (
            dashboardData.recentTransactions.slice(0, 5).map((item) => (
              <TransactionInfoCard
                key={item._id}
                title={item.type === 'income' ? item.source : item.category}
                icon={item.icon}
                date={moment(item.date).format('DD MMM YYYY')}
                amount={item.amount}
                type={item.type}
                hideDeleteBtn
              />
            ))
          ) : (
            <p className='text-sm text-slate-500'>No transactions yet.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home