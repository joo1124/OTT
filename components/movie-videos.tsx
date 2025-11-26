import {TMDB_API_BASE_URL, TMDB_API_KEY} from "../utils/constants"
import styles from "../styles/movie-videos.module.css"

async function getVideos(id: string) {
  const url = `${TMDB_API_BASE_URL}/movie/${id}/videos?language=ko-KR`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  })
  const data = await res.json()
  return data.results
}

export default async function MovieVideos({id}: {id: string}) {
  const videos = await getVideos(id)
  return (
    <div className={styles.container}>
      {videos.map((video: any) => (
        <iframe
          key={video.id}
          src={`https://youtube.com/embed/${video.key}`}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          title={video.name}
        />
      ))}
    </div>
  )
}
