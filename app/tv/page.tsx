import {getTMDBTV, getMultipleTVPages} from "../../utils/api"
import {TMDB_IMAGE_BASE_URL} from "../../utils/constants"
import TVRowSlider from "../../components/tv-row-slider"
import styles from "../../styles/tv.module.css"

export const metadata = {
  title: "TV 프로그램",
}

async function getTVSections() {
  const [popular, airingToday, onTheAir, topRated, actionTV, crimeTV, comedyTV, dramaTV, animationTV] = await Promise.all([
    getMultipleTVPages("/tv/popular", 2), // 인기 프로그램
    getMultipleTVPages("/tv/airing_today", 2), // 오늘 방영
    getMultipleTVPages("/tv/on_the_air", 2), // 방영 중
    getMultipleTVPages("/tv/top_rated", 2), // 높은 평점
    getTMDBTV("/discover/tv?with_genres=10759"), // 액션 & 어드벤처
    getTMDBTV("/discover/tv?with_genres=80"), // 범죄
    getTMDBTV("/discover/tv?with_genres=35"), // 코미디
    getTMDBTV("/discover/tv?with_genres=18"), // 드라마
    getTMDBTV("/discover/tv?with_genres=16"), // 애니메이션
  ])

  return {
    popular,
    airingToday,
    onTheAir,
    topRated,
    actionTV: actionTV.results,
    crimeTV: crimeTV.results,
    comedyTV: comedyTV.results,
    dramaTV: dramaTV.results,
    animationTV: animationTV.results,
  }
}

export default async function TVPage() {
  const {popular, airingToday, onTheAir, topRated, actionTV, crimeTV, comedyTV, dramaTV, animationTV} = await getTVSections()

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>TV 프로그램</h1>

        <div className={styles.section}>
          <TVRowSlider title='인기 프로그램' shows={popular} imageBaseUrl={TMDB_IMAGE_BASE_URL} pageSize={10} />
        </div>

        <div className={styles.section}>
          <TVRowSlider title='오늘 방영' shows={airingToday} imageBaseUrl={TMDB_IMAGE_BASE_URL} pageSize={10} />
        </div>

        <div className={styles.section}>
          <TVRowSlider title='방영 중' shows={onTheAir} imageBaseUrl={TMDB_IMAGE_BASE_URL} pageSize={10} />
        </div>

        <div className={styles.section}>
          <TVRowSlider title='높은 평점' shows={topRated} imageBaseUrl={TMDB_IMAGE_BASE_URL} pageSize={10} />
        </div>

        <div className={styles.section}>
          <TVRowSlider title='액션 & 어드벤처' shows={actionTV} imageBaseUrl={TMDB_IMAGE_BASE_URL} pageSize={10} />
        </div>

        <div className={styles.section}>
          <TVRowSlider title='범죄' shows={crimeTV} imageBaseUrl={TMDB_IMAGE_BASE_URL} pageSize={10} />
        </div>

        <div className={styles.section}>
          <TVRowSlider title='코미디' shows={comedyTV} imageBaseUrl={TMDB_IMAGE_BASE_URL} pageSize={10} />
        </div>

        <div className={styles.section}>
          <TVRowSlider title='드라마' shows={dramaTV} imageBaseUrl={TMDB_IMAGE_BASE_URL} pageSize={10} />
        </div>

        <div className={styles.section}>
          <TVRowSlider title='애니메이션' shows={animationTV} imageBaseUrl={TMDB_IMAGE_BASE_URL} pageSize={10} />
        </div>
      </div>
    </main>
  )
}
