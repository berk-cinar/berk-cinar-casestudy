import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import "../styles/MovieDetails.css"
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import ContentService from '../services/ContentService';
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaStar } from "react-icons/fa";

const MovieDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const type = queryParams.get("type");

    const { data, isError, isFetching, refetch } = useQuery("getItemDetail",
        () => ContentService.getById(id, type), {
        enabled: !!id && !!type
    });

    function convertDateFormat(dateStr) {
        const [year, month, day] = dateStr.split('-');
        return `${day}.${month}.${year}`;
    }

    const navigateHomepage = () => {
        navigate(`/`);
    };

    if (isError) {
        return (<div>
            <h3>Film yüklenemedi.</h3>
            <button onClick={refetch}>Tekrar deneyin</button>
        </div>);
    }

    if (isFetching) {
        return <div>Film yükleniyor...</div>;
    }

    return (
        <div style={{ color: "black", marginTop: "120px" }}>
            <div onClick={() => navigateHomepage()} className='detail-navbar'>
                <div className="nav-content">
                    <IoMdArrowRoundBack className='return-icon' />
                    <span className='return-text'>Back to the Homepage</span>
                </div>
            </div>
            <div class="row">
                <div class="col1">         <img className='image' src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.title} /></div>
                <div class="col2">
                    <div class="content-container">
                        <div className='detail-header'>
                            <h1>{data.title?.length > 0 ? data.title : data.original_name}</h1>          <div className='language'>{data.original_language}</div>
                        </div>
                        <div class="rating-container">
                            <FaStar className="star-icon" />
                            <h4>TMDB:</h4>
                            <div>{data.vote_average.toFixed(1)}/10</div>
                        </div>
                    </div>




                    <p>{data.overview}</p>
                    <div>
                        <p>Release date: {convertDateFormat(data.release_date)}</p>
                    </div>
                    <div className='row2'>
                        <div className='col'>
                            <img className='actor-images' src="/assets/actor-1.jpg" />
                            <div>Harrison Ford</div>

                        </div>

                        <div className='col'>
                            <img className='actor-images' src="/assets/actor-2.jpg" />
                            <div>Robert De Niro</div>
                        </div>
                        <div className='col'>
                            <img className='actor-images' src="/assets/actor-3.jpg" />
                            <div>Keira Knightley</div>
                        </div>
                        <div className='col'>
                            <img className='actor-images' src="/assets/actor-4.jpg" />
                            <div>William Holden</div>

                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default MovieDetails;
