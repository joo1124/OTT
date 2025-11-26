import MovieRowSlider from "./movie-row-slider"
import {MovieBase} from "../utils/types"

interface TopRatedSectionProps {
  movies: MovieBase[]
  imageBaseUrl: string
}

export default function TopRatedSection({movies, imageBaseUrl}: TopRatedSectionProps) {
  return <MovieRowSlider title='역대 최고 평점' movies={movies} imageBaseUrl={imageBaseUrl} pageSize={10} />
}
