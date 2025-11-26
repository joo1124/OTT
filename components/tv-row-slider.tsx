"use client"

import {useState} from "react"
import {TVShow} from "../utils/types"
import TVShowCard from "./tv-show-card"
import styles from "../styles/home.module.css"

interface TVRowSliderProps {
  title: string
  shows: TVShow[]
  imageBaseUrl: string
  pageSize?: number
}

export default function TVRowSlider({title, shows, imageBaseUrl, pageSize = 10}: TVRowSliderProps) {
  const [page, setPage] = useState(0)

  const maxPage = Math.max(Math.ceil(shows.length / pageSize) - 1, 0)
  const start = page * pageSize
  const end = start + pageSize
  const pageShows = shows.slice(start, end)

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
        {pageShows.map((show) => (
          <TVShowCard key={show.id} show={show} imageBaseUrl={imageBaseUrl} />
        ))}
      </div>
    </section>
  )
}
