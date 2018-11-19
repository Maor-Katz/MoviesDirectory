
import React, { Component } from 'react';
import Modal from 'react-modal';
import { MyModal } from './MyModal';
import { MoviesList } from './MoviesList';

import './App.css';

// import ReactDOM from 'react-dom';

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';

/* eslint-disable  */




class App extends Component {
    state = {
        loading: false,
        allMovies: [],
        showModal: false,
        modalWithMovie: {},
        hideAddMovieButton: false,
        modalIsOpen: false,
        valueOfAddedMovie: "",
    };
    customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        }
    };

    showModalFunc = (movie) => {
        let { hideAddMovieButton } = this.state
        const copiedMovie = { ...movie };
        hideAddMovieButton = true
        this.setState({ showModal: true, modalWithMovie: copiedMovie, hideAddMovieButton })
    }

    updateMovie = (newMovie) => {
        let { showModal, modalWithMovie, allMovies, hideAddMovieButton } = this.state;
        allMovies.forEach(movie => {

            if (movie.imdbID === newMovie.imdbID) {
                Object.keys(movie).forEach(field => movie[field] = newMovie[field])
            }
        });
        hideAddMovieButton = false
        this.setState({ showModal: false, allMovies, modalWithMovie: {}, hideAddMovieButton })
    }

    openAndCloseModal = () => {
        let { modalIsOpen } = this.state;
        modalIsOpen = !modalIsOpen;
        this.setState({ modalIsOpen })
    }

    openModal = () => {
        let { modalIsOpen } = this.state
        modalIsOpen = true;
        this.setState({ modalIsOpen })
    }

    addMovie = () => {
        let { allMovies, modalIsOpen } = this.state
        fetch(`http://www.omdbapi.com/?t=${this.textInput.value}&apikey=98f17da2`)
            .then(resp => {
                return resp.json()
            })

            .then((resp) => {
                debugger
                if (typeof resp.Title== "string")
                 { allMovies = allMovies.concat(resp) }
                else { alert("No such movie man") }
                modalIsOpen = !modalIsOpen
                this.setState({ allMovies, modalIsOpen })
            })
        debugger
    }

    closeModal = () => {
        let { hideAddMovieButton } = this.state
        hideAddMovieButton = false
        this.setState({ showModal: false, modalWithMovie: {}, hideAddMovieButton, modalIsOpen: false })
    }

    componentDidMount() {
        let { allMovies } = this.state;
        fetch('http://www.omdbapi.com/?s=run&apikey=98f17da2')
            .then(resp => resp.json())
            .then((res) => {
                allMovies = allMovies.concat(res.Search)
                this.setState({ allMovies })
            })

    }

    render() {
        const { modalIsOpen, allMovies, showModal, modalWithMovie, hideAddMovieButton } = this.state
        return (
            <div className="App">
                <h2 className="header">Welcome Mk App</h2>
                < MoviesList allMovies={allMovies} showModalFunc={this.showModalFunc} />
                <MyModal show={this.state.showModal} showModalFunc={this.showModalFunc}
                    showModal={showModal} modalWithMovie={modalWithMovie} closeModal={this.closeModal.bind(this)} updateMovie={this.updateMovie} />
                <div> <button className="addMovieButton" hidden={hideAddMovieButton} onClick={this.openAndCloseModal}>+Add Movie</button></div>
                <Modal
                    isOpen={modalIsOpen}
                    style={this.customStyles}
                    className="Modal"
                    overlayClassName="Overlay"
                    contentLabel="Example Modal"
                >
                    <h1 className="enterMovie">Please enter movie name</h1>
                    <div> <input type="text" className="addMovieTestbox" ref={(input) => { this.textInput = input }} /></div>
                    <button onClick={() => { this.closeModal(); }} >close</button>
                    <button onClick={() => { this.addMovie(event) }} >Add</button>
                </Modal>
            </div>
        );
    }
}

export default App;
// { Name: 'name1', Year: 11112323, imdbID: 3223, Title: 'title1', }, { Name: 'name2', Year: 2222222323, imdbID: 3223, Title: 'title2' }, { Name: 'name3', Year: 3333332323, imdbID: 3223, Title: 'title33' }