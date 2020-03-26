import React from "react";
import PropTypes from "prop-types";
import "./Movie.css";

function Movie({year, title, summary, poster, genres}) {
    return <div className="movie">
        <img src={poster} alt={title} title={title}/>
        <div className="movie_data">
            <h3 className="movie_title">{title}</h3>
            <h5 className="movie_year">{year}</h5>
            <ul className="movie_genres">
                {genres.map((genre, index) => 
                <li key={index} className="genres_genre">{genre}</li>
                )}
            </ul>
            <p className="movie_summary">{summary.slice(0,140)}...</p>
        </div>
    </div>
}

Movie.propTypes ={
    id: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Movie;
// style 넣고 싶으면 style={{backgroundColor:"red"}}이렇게 사용한다
// html class를 사용하고 싶으면 className를 쓴다. javascript class안에서 html class를 쓰면 component class와 혼란될수있따.

//gh_pages로 깃허브에 사이트를 운영할 수 있다.
//package.json에 "homepage" 를 추가하고
//scripts 안에 "deploy": "gh-pages -d build",
//             "predeploy": "npm run build"
//npm run build 를 하면 build드 결과 폴더가 생성되고, 이를 업로드 하면된다.