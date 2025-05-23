import React from 'react'
import AdminNavBar from './AdminNavBar'
import '../Styles/AdminHeroSection.css'
import Footer from './Footer'



export default function AdminHero() {
  return (
    <div>
      <div className='AdminHeroSection'>
        <AdminNavBar/>
        <div className="AdminHeroSectionText">
        <h1>Admin <span style={{color:"#28B896"}}>Section</span></h1>
        </div>
      </div>

           
    </div>
  )
}
