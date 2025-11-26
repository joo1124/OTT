import {TMDB_API_BASE_URL, TMDB_API_KEY} from "./constants"
import {TMDBMovieResponse, TMDBTVResponse, Video} from "./types"

export async function getTMDBMovies(path: string): Promise<TMDBMovieResponse> {
  const url = `${TMDB_API_BASE_URL}${path}${path.includes("?") ? "&" : "?"}language=ko-KR`

  const res = await fetch(url, {
    next: {revalidate: 60},
    headers: {
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  })

  if (!res.ok) {
    throw new Error(`TMDB API 요청 실패: ${res.status}`)
  }

  return res.json()
}

export async function getTMDBTV(path: string): Promise<TMDBTVResponse> {
  const url = `${TMDB_API_BASE_URL}${path}${path.includes("?") ? "&" : "?"}language=ko-KR`

  const res = await fetch(url, {
    next: {revalidate: 60},
    headers: {
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  })

  if (!res.ok) {
    throw new Error(`TMDB API 요청 실패: ${res.status}`)
  }

  return res.json()
}

export async function getTrailerKey(movieId: number): Promise<string | undefined> {
  const url = `${TMDB_API_BASE_URL}/movie/${movieId}/videos?language=ko-KR`

  const res = await fetch(url, {
    next: {revalidate: 3600},
    headers: {
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  })

  if (!res.ok) return undefined

  const data = await res.json()
  const trailer = data.results.find((v: Video) => v.site === "YouTube" && v.type === "Trailer")

  return trailer?.key
}

export async function getMultiplePages(path: string, pageCount: number) {
  const pages = Array.from({length: pageCount}, (_, i) => i + 1)
  const results = await Promise.all(pages.map((page) => getTMDBMovies(`${path}${path.includes("?") ? "&" : "?"}page=${page}`)))

  return results.flatMap((r) => r.results)
}

export async function getMultipleTVPages(path: string, pageCount: number) {
  const pages = Array.from({length: pageCount}, (_, i) => i + 1)
  const results = await Promise.all(pages.map((page) => getTMDBTV(`${path}${path.includes("?") ? "&" : "?"}page=${page}`)))

  return results.flatMap((r) => r.results)
}
