import { useCallback } from 'react'
import './Genre.css'
import { useGenres, useLoading, useError } from '../../components'
import { useNavigate } from 'react-router-dom'

export const Genre: React.FC = () => {
  const navigate = useNavigate()
  const { genres } = useGenres()
  const loading = useLoading()
  const error = useError()

  const handleCategoryClick = useCallback((genreId: number) => {
    navigate(`/genre/${genreId}`)
  }, [])

  if (error) return <p className='error'>{error}</p>

  return (
    <section className='genres'>
      <div className='container'>
        <header className='genres-header'>
          <h2>Select your genre</h2>
        </header>
        <div className='genres-list'>
          <div className='inner'>
            {loading ? (
              <>Loading...</>
            ) : (
              genres.map((genre) => (
                <div
                  className='genres-item'
                  key={genre.id}
                  onClick={() => handleCategoryClick(genre.id)}
                >
                  <p>{genre.name}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Genre
