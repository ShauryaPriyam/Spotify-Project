import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <div className='h-[100vh]'>
      <div className='w-full h-[87%]'>
        <div className='w-full h-[10%]'>
          <Navbar/>
        </div>
        <div className='flex w-full h-[90%] gap-[1%]'>
           <Sidebar/>
           {children}
        </div>
      </div>
      {/* <div className='w-full h-[13%]'>
        <Player/>
      </div> */}
    </div>
  )
}

export default Layout
