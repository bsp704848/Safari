import React from 'react'
import Footer from '../UI/Footer'
import Navbar from '../UI/Navbar'

export default function Mainlayout({ children, scrollToService }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onServiceClick={scrollToService} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}