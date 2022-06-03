import React from 'react'
import './AppFooter.css'
import tmdbLogo from './tmdb.svg'

export const AppFooter: React.FC = () => {
  return (
    <footer className='app-footer'>
      <div className='tmdb-logo'>
        <a href='https://www.themoviedb.org/' target='_blank'>
          <img src={tmdbLogo} alt='The Movie Database Logo' />
        </a>
      </div>
      <p>
        This App is powered by <i>The Movie Database</i>
      </p>
    </footer>
  )
}

export default AppFooter
