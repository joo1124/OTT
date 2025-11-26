"use client"

import {useEffect, useState, useRef} from "react"
import styles from "../styles/home.module.css"
import {MovieWithTrailer} from "../utils/types"

interface HomeHeroProps {
  movie: MovieWithTrailer | null
  imageBaseUrl: string
}

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export default function HomeHero({movie, imageBaseUrl}: HomeHeroProps) {
  const [showVideo, setShowVideo] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [apiReady, setApiReady] = useState(false)
  const playerRef = useRef<any>(null)

  if (!movie) return null

  const hasTrailer = !!movie.trailerKey
  const VOLUME_LEVEL = 10

  // YouTube IFrame API 로드
  useEffect(() => {
    if (window.YT) {
      setApiReady(true)
      return
    }

    const script = document.createElement("script")
    script.src = "https://www.youtube.com/iframe_api"
    document.getElementsByTagName("script")[0].parentNode?.insertBefore(script, document.getElementsByTagName("script")[0])

    window.onYouTubeIframeAPIReady = () => setApiReady(true)
  }, [])

  // 1) 처음 2초는 포스터
  useEffect(() => {
    if (!hasTrailer) return

    const timer = setTimeout(() => setShowVideo(true), 2000)
    return () => clearTimeout(timer)
  }, [hasTrailer])

  // 2) YouTube Player 초기화
  useEffect(() => {
    if (!showVideo || !hasTrailer || !apiReady || playerRef.current) return

    playerRef.current = new window.YT.Player("youtube-player", {
      videoId: movie.trailerKey,
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
      },
      events: {
        onReady: (event: any) => {
          event.target.setVolume(VOLUME_LEVEL)
          event.target.playVideo()
        },
        onStateChange: (event: any) => {
          if (event.data === 0) {
            playerRef.current?.destroy()
            playerRef.current = null
            setShowVideo(false)
            setIsMuted(true)
          }
        },
      },
    })

    return () => {
      playerRef.current?.destroy()
      playerRef.current = null
    }
  }, [showVideo, hasTrailer, apiReady, movie.trailerKey])

  // 3) 음소거 토글
  const toggleMute = () => {
    if (!playerRef.current) return

    if (isMuted) {
      playerRef.current.unMute()
      playerRef.current.setVolume(VOLUME_LEVEL)
      playerRef.current.playVideo()
    } else {
      playerRef.current.mute()
    }
    setIsMuted(!isMuted)
  }

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        {showVideo && hasTrailer ? (
          <div id='youtube-player' className={styles.heroBackdrop} />
        ) : (
          <img className={styles.heroBackdrop} src={`${imageBaseUrl}${movie.backdrop_path}`} alt={movie.title} />
        )}

        <div className={styles.heroOverlay}>
          <h1>{movie.title}</h1>
          <p>{movie.overview || "설명이 없습니다."}</p>
          {showVideo && hasTrailer && (
            <button className={styles.muteButton} onClick={toggleMute}>
              {isMuted ? "🔇 소리 켜기" : "🔊 소리 끄기"}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
