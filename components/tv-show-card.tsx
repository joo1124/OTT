"use client"

import {TVShow} from "../utils/types"
import styles from "../styles/movie.module.css"
import Link from "next/link"

interface TVShowCardProps {
  show: TVShow
  imageBaseUrl: string
}

export default function TVShowCard({show, imageBaseUrl}: TVShowCardProps) {
  const posterUrl = show.poster_path ? `${imageBaseUrl}${show.poster_path}` : "/placeholder.png"

  return (
    <div className={styles.movie}>
      <Link href={`/tv/${show.id}`}>
        <img src={posterUrl} alt={show.name} />
      </Link>
    </div>
  )
}
