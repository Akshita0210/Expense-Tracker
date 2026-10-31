import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import SideMenu from './SideMenu'

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false)

  return (
    <div className='flex gap-5 bg-clay-surface shadow-clay-sm py-4 px-7 sticky top-0 z-30'>
      <button
        type='button'
        className='w-10 h-10 flex items-center justify-center rounded-clay-sm bg-clay-surface shadow-clay-sm text-black lg:hidden hover:shadow-clay-inset transition-shadow duration-150'
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className='text-2xl' />
        ) : (
          <HiOutlineMenu className='text-2xl' />
        )}
      </button>

      <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>

      {openSideMenu && (
        <div className='fixed top-15.25 -ml-4 bg-clay-bg'>
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  )
}

export default Navbar