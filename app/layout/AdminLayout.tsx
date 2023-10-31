import React from 'react'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

function AdminLayout({ children}: {children: React.ReactNode}) {
  return (
    <>
        <Sidebar />
        <main className=" max-h-fit relative md:ml-64 bg-gray-200">
            <div className="px-10 md:px-16 py-10 md:py-10 mx-auto w-full h-full min-h-screen">
                {children}
            </div>
            <Footer/>
        </main>
        
    </>
  )
}

export default AdminLayout