import { Routes, Route } from 'react-router-dom'
import { AppProvider, AppHeader, AppFooter } from './components'
import { Genre, Movies, MovieDetails } from './views'

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className='app'>
        <AppHeader />
        <main>
          <Routes>
            <Route path='/' element={<Genre />} />
            <Route path='genre'>
              <Route path=':genreId' element={<Movies />} />
            </Route>
            <Route path='movie'>
              <Route path=':movieId' element={<MovieDetails />} />
            </Route>
          </Routes>
        </main>
        <AppFooter />
      </div>
    </AppProvider>
  )
}

export default App
