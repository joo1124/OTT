import HomeHero from "../../components/home-hero"
import PopularMoviesSection from "../../components/popular-movies-section"
import NowPlayingSection from "../../components/now-playing-section"
import TopRatedSection from "../../components/top-rated-section"
import {getTMDBMovies, getTrailerKey} from "../../utils/api"
import {TMDB_IMAGE_BASE_URL} from "../../utils/constants"
import {MovieWithTrailer} from "../../utils/types"

export const metadata = {
  title: "Home",
}

async function getHomeSections() {
  const [popular, nowPlaying, topRated] = await Promise.all([getTMDBMovies("/movie/popular"), getTMDBMovies("/movie/now_playing"), getTMDBMovies("/movie/top_rated")])

  return {
    popular: popular.results,
    nowPlaying: nowPlaying.results,
    topRated: topRated.results,
  }
}

export default async function Page() {
  const {popular, nowPlaying, topRated} = await getHomeSections()

  const randomIndex = Math.floor(Math.random() * nowPlaying.length)
  const heroMovie = nowPlaying[randomIndex] ?? null

  let heroWithTrailer: MovieWithTrailer | null = heroMovie
  if (heroMovie) {
    const trailerKey = await getTrailerKey(heroMovie.id)
    heroWithTrailer = {...heroMovie, trailerKey}
  }

  return (
    <main>
      <HomeHero movie={heroWithTrailer} imageBaseUrl={TMDB_IMAGE_BASE_URL} />

      <PopularMoviesSection movies={popular} imageBaseUrl={TMDB_IMAGE_BASE_URL} />

      <NowPlayingSection movies={nowPlaying} imageBaseUrl={TMDB_IMAGE_BASE_URL} />

      <TopRatedSection movies={topRated} imageBaseUrl={TMDB_IMAGE_BASE_URL} />
    </main>
  )
}
