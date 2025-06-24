import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import { useSelector } from 'react-redux'
import { ENDPOINT, API_KEY } from './constants'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import VideoModal from './components/VideoModal'
import './app.scss'

const App = () => {
  const state = useSelector((state) => state)
  const [videoKey, setVideoKey] = useState()
  const [isOpen, setOpen] = useState(false)
  
  const closeModal = () => setOpen(false)

  const viewTrailer = (movie) => {
    getMovie(movie.id)
    if (!videoKey) setOpen(true)
    setOpen(true)
  }

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
    setVideoKey(null)
    const videoData = await fetch(URL)
      .then((response) => response.json())
    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer')
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="container">
        <VideoModal isOpen={isOpen} onClose={closeModal} videoKey={videoKey} />
        <Routes>
          <Route path="/" element={<Movies viewTrailer={viewTrailer} />} />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
