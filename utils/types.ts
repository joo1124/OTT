export interface MovieBase {
  id: number
  title: string
  overview?: string
  backdrop_path?: string
  poster_path?: string
  vote_average?: number
  release_date?: string
}

export interface MovieWithTrailer extends MovieBase {
  trailerKey?: string
}

export interface TVShow {
  id: number
  name: string
  overview?: string
  backdrop_path?: string
  poster_path?: string
  vote_average?: number
  first_air_date?: string
}

export interface TMDBMovieResponse {
  page: number
  results: MovieBase[]
  total_pages: number
  total_results: number
}

export interface TMDBTVResponse {
  page: number
  results: TVShow[]
  total_pages: number
  total_results: number
}

export type TMDBResponse = TMDBMovieResponse | TMDBTVResponse

export interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
}
