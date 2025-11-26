"use client"

import {useState} from "react"
import Movie from "./movie"
import styles from "../styles/home.module.css"

interface MovieRowSliderProps {
  title: string
  movies: any[]
  imageBaseUrl: string
  pageSize?: number // 기본 10개
}

export default function MovieRowSlider({title, movies, imageBaseUrl, pageSize = 10}: MovieRowSliderProps) {
  const [page, setPage] = useState(0)

  const maxPage = Math.max(Math.ceil(movies.length / pageSize) - 1, 0)
  const start = page * pageSize
  const end = start + pageSize
  const pageMovies = movies.slice(start, end)

  const handlePrev = () => setPage((p) => Math.max(p - 1, 0))
  const handleNext = () => setPage((p) => Math.min(p + 1, maxPage))

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>{title}</h2>
        <div className={styles.sectionControls}>
          <button type='button' onClick={handlePrev} disabled={page === 0} className={styles.navButton}>
            {"<"}
          </button>
          <button type='button' onClick={handleNext} disabled={page === maxPage} className={styles.navButton}>
            {">"}
          </button>
        </div>
      </div>

      <div className={styles.rowSlider}>
        {pageMovies.map((movie: any) => (
          <Movie key={movie.id} id={movie.id} poster_path={`${imageBaseUrl}${movie.poster_path}`} title={movie.title} />
        ))}
      </div>
    </section>
  )
}
