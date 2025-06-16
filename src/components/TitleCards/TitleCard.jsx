import React ,{useEffect, useRef, useState}from 'react'
import './TitleCard.css'
import cards_data from '../../assets/cards/Cards_data'
import {Link} from 'react-router-dom'




const TitleCard = ({title,category}) => {

const [apiData,setApiData] =useState([])

const cardsRef =useRef()

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTEyNGQxZjNjNTE4MmVhNDk1ZGIyZWFjNDc2MmY3MiIsIm5iZiI6MTc0OTk5ODA4Mi42NDMwMDAxLCJzdWIiOiI2ODRlZGEwMmIyYzRiMmEzY2EyOTRlZjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rhH1BpwoJPbZhD-kITT6zIfpXfBfPY11Hjuw1io0r_Q'
  }
};





const handleWheel=(event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft +=event.deltaY
 
}
useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
 const cardsElement = cardsRef.current
 if(cardsElement){
  cardsElement.addEventListener('wheel',handleWheel)
 }


 return()=>{
  if(cardsElement){
    cardsElement.removeEventListener('wheel',handleWheel)
  }
 }
},[])


  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
            return <Link to={`/player/${card.id}`} className='card' key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCard