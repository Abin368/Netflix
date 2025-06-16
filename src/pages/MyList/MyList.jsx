import React, { useEffect, useState, useRef } from 'react';
import { db, removeFromWatchLater } from '../../firebase';
import { onSnapshot, collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import './MyList.css';
import Navbar from '../../components/Navbar/Navbar';

const MyList = () => {
  const [user] = useAuthState(auth);
  const [watchLater, setWatchLater] = useState([]);
  const cardsRef = useRef();

  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(
      collection(db, 'users', user.uid, 'watchLater'),
      (snapshot) => {
        const movies = snapshot.docs.map((doc) => doc.data());
        setWatchLater(movies);
      },
      (error) => console.error('Error fetching watch later:', error)
    );
    return () => unsubscribe();
  }, [user]);

  const handleRemove = (movieId) => {
    removeFromWatchLater(user.uid, movieId);
  };

  return (
    <div className='mylist'>
        <Navbar/>
      <div className='mylist-content'>
        <h2>My List</h2>
        {watchLater.length === 0 ? (
          <p className='empty-msg'>No items in your Watch Later list.</p>
        ) : (
          <div className='card-list' ref={cardsRef}>
            {watchLater.map((card, index) => (
              <div className='card' key={index}>
                <Link to={`/player/${card.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                    alt={card.original_title || card.title}
                  />
                  <p>{card.original_title || card.title}</p>
                </Link>
                <button
                  className='watch-later-btn'
                  onClick={() => handleRemove(card.id)}
                  title='Remove from Watch Later'
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyList;
