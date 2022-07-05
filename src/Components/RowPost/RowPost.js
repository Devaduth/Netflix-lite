import React, { useEffect, useState } from 'react'
import Youtube from 'react-youtube'
import './RowPost.css'
import axios from '../../axios'
import { API_KEY, imageUrl } from '../../Constants/Constants'



function RowPost(props) {
  const [movies, setMovies] = useState([])
  const [urlId, setUrlId] = useState('')
  useEffect(() => {
    axios.get(props.url).then((response) => {
      setMovies(response.data.results)
    }).catch(err => {
      alert('Network error')
    })
  })


  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  const handleMovie = (id) => {
    // console.log(id);
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
      if (response.data.results.length !== 0) {
        console.log();
        setUrlId(response.data.results[0])
      } else {
        alert("Trailer unavailable")
      }
      //console.log("urlid", urlId);
    })
  }



  return (
    <div>
      <div className='row'>
        <h2>{props.title}</h2>
        <div className="posters">
          {movies.map((obj) =>
            <div>
              <img className={props.isSmall ? 'small-poster' : "poster"}
                src={`${imageUrl + obj.backdrop_path}`} alt="Poster" />
              <p className={props.isSmall ? 'small-poster' : "poster"} >{obj ? obj.title ? obj.title : obj.name : ''}</p>
              <p className={props.isSmall ? 'small-poster' : "poster"} >Rating : {obj ? obj.vote_average : ''}</p>
            </div>
          )}
        </div>
        {urlId && <Youtube opts={opts} videoId={urlId.key} />}
      </div>
    </div>
  )
}
//onClick={() => handleMovie(obj.id)} on line 51 img tag saved for later :)
export default RowPost