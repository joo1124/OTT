import {TMDB_API_BASE_URL, TMDB_API_KEY, TMDB_IMAGE_BASE_URL} from "../utils/constants"
import styles from "../styles/movie-info.module.css"

export async function getMovie(id: string) {
  const url = `${TMDB_API_BASE_URL}/movie/${id}?language=ko-KR`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  })
  return res.json()
}

export default async function MovieInfo({id}: {id: string}) {
  const movie = await getMovie(id)
  return (
    <div className={styles.container}>
      <img className={styles.poster} src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`} />
      <div className={styles.info}>
        <h1 className={styles.title}>{movie.title}</h1>
        <h3>★{movie.vote_average.toFixed(1)}</h3>
        <p>{movie.overview}</p>
        <a href={movie.homepage} target={"_blank"}>
          Homepage &rarr;
        </a>
      </div>
    </div>
  )
}
