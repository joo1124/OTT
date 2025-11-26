"use client"

import {useState, useEffect, useRef} from "react"
import styles from "../styles/navigation.module.css"
import Link from "next/link"
import {usePathname, useRouter} from "next/navigation"
import Image from "next/image"
import {FaSearch} from "react-icons/fa"

export default function Navigation() {
  const path = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const searchFormRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchFormRef.current && !searchFormRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
        setSearchQuery("")
      }
    }

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isSearchOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isSearchOpen) {
      setSearchQuery("")
    }
  }

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.navScrolled : ""}`}>
      <div className={styles.navContent}>
        <div className={styles.navLeft}>
          <Link href='/' className={styles.logo}>
            <Image src='/logo1.png' alt='NextMovies Logo' width={120} height={40} priority />
          </Link>
          <ul className={styles.navMenu}>
            <li>
              <Link href='/' className={path === "/" ? styles.active : ""}>
                홈
              </Link>
            </li>
            <li>
              <Link href='/movies' className={path.startsWith("/movies") ? styles.active : ""}>
                영화
              </Link>
            </li>
            <li>
              <Link href='/tv' className={path.startsWith("/tv") ? styles.active : ""}>
                TV 프로그램
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.navRight}>
          <form ref={searchFormRef} onSubmit={handleSearch} className={`${styles.searchForm} ${isSearchOpen ? styles.searchFormOpen : ""}`}>
            <input type='text' placeholder='제목, 배우, 장르' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={styles.searchInput} />
            <button type='button' onClick={toggleSearch} className={styles.searchButton}>
              <FaSearch color='white' />
            </button>
          </form>
          <div className={styles.navLogin}>
            <Link href='/login' className={path.startsWith("/login") ? styles.active : ""}>
              로그인
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
