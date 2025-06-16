import React, { useEffect, useRef, useState } from 'react';
import './TitleCard.css';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { addToWatchLater } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { FaBookmark } from 'react-icons/fa';

const TitleCard = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const [userId, setUserId] = useState(null);
  const cardsRef = useRef();

 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
      else setUserId(null);
    });
    return () => unsubscribe();
  }, []);

 
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTEyNGQxZjNjNTE4MmVhNDk1ZGIyZWFjNDc2MmY3MiIsIm5iZiI6MTc0OTk5ODA4Mi42NDMwMDAxLCJzdWIiOiI2ODRlZGEwMmIyYzRiMmEzY2EyOTRlZjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rhH1BpwoJPbZhD-kITT6zIfpXfBfPY11Hjuw1io0r_Q'
      }
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    const cardsElement = cardsRef.current;
    if (cardsElement) {
      cardsElement.addEventListener('wheel', handleWheel);
    }
    return () => {
      if (cardsElement) {
        cardsElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  const handleWatchLater = async (movie) => {
    if (!userId) {
      alert("Please sign in to add to Watch Later");
      return;
    }
    await addToWatchLater(userId, movie);
  };

  return (
    <div className='title-cards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index) => (
          <div className='card' key={index}>
            <Link to={`/player/${card.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt='' />
              <p>{card.original_title}</p>
            </Link>
            <button
              className='watch-later-btn'
              onClick={() => handleWatchLater(card)}
              title='Add to Watch Later'
            >
              <FaBookmark />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCard;
