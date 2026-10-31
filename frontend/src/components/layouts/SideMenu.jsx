import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { LuLayoutDashboard, LuWalletMinimal, LuLogOut } from 'react-icons/lu'
import { TbReceipt2 } from 'react-icons/tb'

const SIDE_MENU_DATA = [
  { id: '01', label: 'Dashboard', icon: LuLayoutDashboard, path: '/dashboard' },
  { id: '02', label: 'Income', icon: LuWalletMinimal, path: '/income' },
  { id: '03', label: 'Expense', icon: TbReceipt2, path: '/expense' },
  { id: '04', label: 'Logout', icon: LuLogOut, path: 'logout' },
]

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleClick = (item) => {
    if (item.path === 'logout') {
      handleLogout()
      return
    }
    navigate(item.path)
  }

  const handleLogout = () => {
    localStorage.clear()
    clearUser()
    navigate('/login')
  }

  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-clay-surface shadow-clay-sm p-5 sticky top-15.25 z-20'>
      <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
        <div className='w-20 h-20 flex items-center justify-center bg-clay-bg rounded-full shadow-clay overflow-hidden'>
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt='Profile'
              className='w-full h-full object-cover'
            />
          ) : (
            <div className='w-10 h-10 rounded-full bg-primary' />
          )}
        </div>

        {user?.fullName && (
          <h5 className='text-gray-900 font-medium leading-6'>{user.fullName}</h5>
        )}
      </div>

      {SIDE_MENU_DATA.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item)}
          className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-clay-sm mb-3 cursor-pointer transition-shadow duration-150 ${
            activeMenu === item.label
              ? 'text-white bg-primary shadow-clay-primary'
              : 'text-slate-700 bg-clay-surface shadow-clay-sm hover:shadow-clay-inset'
          }`}
        >
          <item.icon className='text-xl' />
          {item.label}
        </button>
      ))}
    </div>
  )
}

export default SideMenu