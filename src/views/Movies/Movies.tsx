import { useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useMovies } from '../../data/index'
import { useGenres } from '../../components'
import './Movies.css'

export const Movies: React.FC = () => {
  const { genreId } = useParams()
  const genreIdNumber = parseInt(genreId || '0')
  const navigate = useNavigate()
  const { getGenreName } = useGenres()
  const { loading, error, movies, fetchNext } = useMovies(genreIdNumber)

  const handleMovieClick = useCallback((movieId: number) => {
    navigate(`/movie/${movieId}`)
  }, [])

  if (error) return <p className='error'>{error.message}</p>

  return (
    <section className='movies'>
      <div className='container'>
        <header className='movies-header'>
          <h2>
            {movies.length} Movies for {getGenreName(genreIdNumber)}
          </h2>
        </header>
        <div className='movies-list'>
          <div className='inner'>
            {movies.map((movie) => (
              <div
                className='movie-item'
                key={movie.id}
                onClick={() => handleMovieClick(movie.id)}
              >
                <div className='movie-img'>
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                    title={movie.title}
                  />
                </div>
                <p>{movie.title}</p>
              </div>
            ))}
            {loading && <>LOADING</>}
          </div>
        </div>
        <footer>
          {!loading && <button onClick={fetchNext}>load more</button>}
        </footer>
      </div>
    </section>
  )
}

export default Movies
