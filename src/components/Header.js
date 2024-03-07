import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../styles/Header.css"
import { API_CONTENT_TYPES } from '../constants/appConstants';


const Header = ({ series, movies }) => {
        const navigate = useNavigate();
        const [movie, setSelectedMovie] = useState([]);
        const [serie, setSelectedSerie] = useState([]);

        const navigateDetailsPage = (id, type) => {
                navigate(`/details/${id}?type=${type}`);
        };

        useEffect(() => {
                if (Array.isArray(movies) && movies.length > 0) {
                        const randomIndex = Math.floor(Math.random() * movies.length);
                        setSelectedMovie(movies[randomIndex]);
                }
                if (Array.isArray(series) && series.length > 0) {
                        const randomIndex = Math.floor(Math.random() * series.length);
                        setSelectedSerie(series[randomIndex]);
                }

        }, [movies, series]);

        return (
                <div className='header'>
                        <div class="header-bg"></div>
                        <div className='headerElements'>
                                <div className='card-container'>

                                        <div onClick={() => navigateDetailsPage(movie.id, API_CONTENT_TYPES.MOVIE)} key={movie.id}>
                                                <div className="movieRating">  {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10</div>
                                                <img className='image1' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />

                                                <div className='card-title'>
                                                        <p>{movie.title}</p>
                                                </div>
                                        </div>


                                </div>


                                <div className='header-text' >
                                        <p className='text-1'>Welcome to the</p>
                                        <p className='text-2'>World of TV Series & Movies</p>
                                </div>
                                <div className='card-container'>

                                        <div onClick={() => navigateDetailsPage(serie.id, API_CONTENT_TYPES.TV)} key={serie.id}>
                                                <div className="movieRating">  {serie.vote_average ? serie.vote_average.toFixed(1) : 'N/A'} / 10</div>
                                                <img className='image1' src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} alt={serie.title} />
                                                <div className='card-title'>
                                                        <p>{serie.original_name}</p>
                                                </div>
                                        </div>


                                </div>

                        </div>
                </div >
        )
}

export default Header;
