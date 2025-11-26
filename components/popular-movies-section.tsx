import MovieRowSlider from "./movie-row-slider"
import {MovieBase} from "../utils/types"

interface PopularMoviesSectionProps {
  movies: MovieBase[]
  imageBaseUrl: string
}

export default function PopularMoviesSection({movies, imageBaseUrl}: PopularMoviesSectionProps) {
  return <MovieRowSlider title='인기 영화' movies={movies} imageBaseUrl={imageBaseUrl} pageSize={10} />
}
