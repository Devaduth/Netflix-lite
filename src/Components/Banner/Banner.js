import React, { useEffect, useState } from 'react'
import { API_KEY, imageUrl } from '../../Constants/Constants'
import axios from '../../axios'
import './Banner.css'
function Banner() {
  const [movie, setMovie] = useState()
  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response) => {
      console.log(response.data.results);
      console.log("The movie : ", response.data.results[Math.floor(Math.random() * response.data.results.length)]);
      setMovie(response.data.results[Math.floor(Math.random() * response.data.results.length)])
    })
  }, [])
  return (
    <div
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0,0.3), rgba(0, 0, 0, 0.3)), url(${movie ? imageUrl + movie.backdrop_path : ""})` }}
      className="banner" >

      <div className="content">
        <h1 className='title'>  {movie ? movie.title ? movie.title : movie.name : ''} </h1>
        <h4 className="mediaType" style={{ color: "Yellow" }}> &nbsp; {movie ? movie.media_type : ''}</h4>
        <h4 className="rating" style={{ color: "Yellow" }}> &nbsp;  Rating : {movie ? movie.vote_average : ''}</h4><br />
        <div className="banner_buttons">
        </div>
        <h1 className="description">{movie ? movie.overview : ''}</h1>

      </div>
    </div>
  )
}

export default Banner