import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arror_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'


const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate()

  const [apiData,setApiDAta]=useState({
    name:"",
    key:"",
    published_at:"",
    typeof:""
  })

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTEyNGQxZjNjNTE4MmVhNDk1ZGIyZWFjNDc2MmY3MiIsIm5iZiI6MTc0OTk5ODA4Mi42NDMwMDAxLCJzdWIiOiI2ODRlZGEwMmIyYzRiMmEzY2EyOTRlZjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rhH1BpwoJPbZhD-kITT6zIfpXfBfPY11Hjuw1io0r_Q'
  }
};

useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiDAta(res.results[0]))
  .catch(err => console.error(err));
},[])

  return (
    <div className='player'>
      <img src={back_arror_icon} alt="" onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} frameborder="0" title='trailer' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player