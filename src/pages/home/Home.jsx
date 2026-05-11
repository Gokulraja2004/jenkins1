import React, { useState } from 'react'
import './home.css'
import Header from '../../components/header/Header'
import ExplorMenu from '../../components/ExplorMenu/ExplorMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/Appdownload/Appdownload'

const Home = () => {
  const [category, setCategory]=useState('All')
  return (
    <div>
        <Header />
        <ExplorMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category} />
        <AppDownload />
    </div>
  )
}

export default Home