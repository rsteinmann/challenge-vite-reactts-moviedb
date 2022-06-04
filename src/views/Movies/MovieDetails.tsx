import React from 'react'
import { useParams } from 'react-router-dom'
import { useMovie } from '../../data'
import './MovieDetails.css'

export const MovieDetails: React.FC = () => {
  const { movieId } = useParams()
  const { loading, error, movie } = useMovie(parseInt(movieId || '0'))

  if (error) return <p className='error'>{error.message}</p>

  if (loading) return <>Loading</>
  if (!movie) return <p className='error'>{error}</p>

  return (
    <div className='movie'>
      <img
        src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
        title={movie.title}
      />
      <h2>{movie.title}</h2>
    </div>
  )
}

export default MovieDetails
