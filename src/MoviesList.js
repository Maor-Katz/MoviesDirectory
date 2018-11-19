import React from 'react';
/* eslint-disable  */
export class MoviesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        const { allMovies, showModalFunc } = this.props;
        
        return (
            <div className="moviesList">
                {
                    allMovies.map((movie, index) => (
                        <div key={index} className="movieDetails">
                            <img className="movieImage" src={movie.Poster}/>
                            <div className="movieTitle">Title: {movie.Title}</div>
                            <div className="movieYear">Year:{movie.Year}</div>
                            <div className="movieId">Id: {movie.imdbID}</div>
                            <div className="EDITBUTTON"><button className="editMovie" onClick={() => {showModalFunc(movie)}}>Edit Movie</button></div>
                        </div>
                    ))
                }
            </div>
        );
    }
}
