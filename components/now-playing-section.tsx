import MovieRowSlider from "./movie-row-slider"
import {MovieBase} from "../utils/types"

interface NowPlayingSectionProps {
  movies: MovieBase[]
  imageBaseUrl: string
}

export default function NowPlayingSection({movies, imageBaseUrl}: NowPlayingSectionProps) {
  return <MovieRowSlider title='현재 상영 중' movies={movies} imageBaseUrl={imageBaseUrl} pageSize={10} />
}
