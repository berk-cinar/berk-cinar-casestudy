import React, { useEffect, useState, useRef } from 'react';
import "../styles/Homepage.css"
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import ContentService from '../services/ContentService';
import { API_CONTENT_TYPES } from '../constants/appConstants';
import { SiThemoviedatabase } from "react-icons/si";

const Homepage = () => {
        const navigate = useNavigate();

        const { data: series, isFetching: seriesLoading, isError: seriesLoadError, refetch: reloadSeries } = useQuery("getTvShows", () => ContentService.get({ type: API_CONTENT_TYPES.TV, popular: true }),
                {
                        retryDelay: 10000,
                        retry: 3,
                        refetchOnWindowFocus: false
                });
        console.log("series:", series)
        const { data: movies, isFetching: moviesLoading, isError: moviesLoadError, refetch: reloadMovies } = useQuery("getMovies", () => ContentService.get({ type: API_CONTENT_TYPES.MOVIE, popular: true }),
                {
                        retryDelay: 10000,
                        retry: 3,
                        refetchOnWindowFocus: false
                });

        const navigateDetailsPage = (id, type) => {
                navigate(`/details/${id}?type=${type}`);
        };

        const moviesSectionRef = useRef(null);
        const tvSeriesSectionRef = useRef(null);

        const scrollToMovies = () => {
                if (moviesSectionRef.current) {
                        const y = moviesSectionRef.current.getBoundingClientRect().top + window.pageYOffset - 150;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                }
        };

        const scrollToTvSeries = () => {
                if (tvSeriesSectionRef.current) {
                        const y = tvSeriesSectionRef.current.getBoundingClientRect().top + window.pageYOffset - 150;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                }
        };

        return (
                <div className='all'>
                        <div className='navbar'>
                                <div>

                                        <SiThemoviedatabase className='logo' />
                                </div>
                                <div className='links'>
                                        <p onClick={scrollToMovies} className='link'>Popular Movies</p>
                                        <p onClick={scrollToTvSeries} className='link'>Popular TV Series</p>
                                </div>
                        </div>

                        <div className='homepageContainer'>
                                <Header
                                        movies={Array.isArray(movies) ? movies.filter(m => m.vote_average > 8) : []
                                        }
                                        series={Array.isArray(series) ? series.filter(m => m.vote_average > 7) : []
                                        }
                                />
                                <h1 ref={moviesSectionRef} className='categoryTitles'>Popular Movies</h1>
                                <div className='moviesContainer'>
                                        {
                                                moviesLoading ? (
                                                        <h3>Loading...</h3>
                                                ) :
                                                        movies.slice(0, 4).map(m => (
                                                                <div onClick={() => navigateDetailsPage(m.id, API_CONTENT_TYPES.MOVIE)} key={m.id} className="movie">
                                                                        <div className="movieRating">{m.vote_average.toFixed(1)} / 10</div>
                                                                        <img src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} alt={m.title} />
                                                                        <div className="movieTitle">
                                                                                <p >{m.title}</p>
                                                                        </div>
                                                                </div>
                                                        ))}
                                </div>
                                <h1 ref={tvSeriesSectionRef} className='categoryTitles'>Popular TV Series</h1>
                                <div className='moviesContainer'>
                                        {
                                                seriesLoading ?
                                                        (
                                                                <h3>Loading...</h3>
                                                        )
                                                        :
                                                        series.slice(0, 4).map(s => (
                                                                <div onClick={() => navigateDetailsPage(s.id, API_CONTENT_TYPES.TV)} key={s.id} className="movie">
                                                                        <div className="movieRating">{s.vote_average.toFixed(1)} / 10</div>
                                                                        <img src={`https://image.tmdb.org/t/p/w500${s.poster_path}`} alt={s.title} />
                                                                        <div className="movieTitle">
                                                                                <p >{s.original_name}</p>
                                                                        </div>
                                                                </div>
                                                        ))}
                                </div>
                                <Footer />
                        </div>

                </div>
        )
}

export default Homepage
