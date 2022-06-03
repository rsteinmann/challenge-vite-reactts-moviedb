import React from 'react'
import './AppHeader.css'
import { useNavigate } from 'react-router-dom'

export const AppHeader: React.FC = () => {
  const navigate = useNavigate()
  return (
    <header className='app-header'>
      <h1 onClick={() => navigate('/')}>Movies App</h1>
    </header>
  )
}

export default AppHeader
