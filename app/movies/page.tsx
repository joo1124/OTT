import {getTMDBMovies, getMultiplePages} from "../../utils/api"
import {TMDB_IMAGE_BASE_URL} from "../../utils/constants"
import MovieRowSlider from "../../components/movie-row-slider"
import styles from "../../styles/movies.module.css"

export const metadata = {
  title: "영화",
}

async function getMovieSections() {
  const [popular, nowPlaying, topRated, upcoming, actionMovies, comedyMovies] = await Promise.all([
    getMultiplePages("/movie/popular", 2),
    getMultiplePages("/movie/now_playing", 2),
    getMultiplePages("/movie/top_rated", 2),
    getTMDBMovies("/movie/upcoming"),
    getTMDBMovies("/discover/movie?with_genres=28"),
    getTMDBMovies("/discover/movie?with_genres=35"),
  ])

  return {
    popular,
    nowPlaying,
    topRated,
    upcoming: upcoming.results,
    actionMovies: actionMovies.results,
    comedyMovies: comedyMovies.results,
  }
}

export default async function MoviesPage() {
  const {popular, nowPlaying, topRated, upcoming, actionMovies, comedyMovies} = await getMovieSections()

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>영화</h1>

        <div className={styles.section}>
          <MovieRowSlider title='인기 영화' movies={popular} imageBaseUrl={TMDB_IMAGE_BASE_URL} pageSize={10} />
        </div>

        <div className={styles.section}>
          <MovieRowSlider title='현재 상영 중' movies={nowPlaying} imageBaseUrl={TMDB_IMAGE_BASE_URL} pageSize={10} />
        </div>

        <div className={styles.section}>
          <MovieRowSlider title='높은 평점' movies={topRated} imageBaseUrl={TMDB_IMAGE_BASE_URL} pageSize={10} />
        </div>

        <div className={styles.section}>
          <MovieRowSlider title='개봉 예정' movies={upcoming} imageBaseUrl={TMDB_IMAGE_BASE_URL} pageSize={10} />
        </div>

        <div className={styles.section}>
          <MovieRowSlider title='액션 영화' movies={actionMovies} imageBaseUrl={TMDB_IMAGE_BASE_URL} pageSize={10} />
        </div>

        <div className={styles.section}>
          <MovieRowSlider title='코미디 영화' movies={comedyMovies} imageBaseUrl={TMDB_IMAGE_BASE_URL} pageSize={10} />
        </div>
      </div>
    </main>
  )
}
