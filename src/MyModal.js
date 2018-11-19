import React from 'react';
import Modal from 'react-modal';


/* eslint-disable  */
export class MyModal extends React.Component {
    customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            height : '100px',
            width : '250px'
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            isEnabled: true,
        };


    }
    componentWillReceiveProps(newprops) {
        this.setState({ modalWithMovie: newprops.modalWithMovie, })
    }

    componentDidMount() {
        this.setState({ modalWithMovie: this.props.modalWithMovie, })
    }

    openModal = () => {
        let { modalIsOpen } = this.state
        modalIsOpen = true;
        this.setState({ modalIsOpen })
        debugger
    }

    handleChange = (field) => {
        return (event) => {
            let { modalWithMovie, isEnabled } = this.state;
            event.target.className = event.target.className.replace(/notValid/g, '')
            if (event.target.value === '') {
                isEnabled = false;
                event.target.className += ' notValid'
            }
            else { isEnabled = true; }

            modalWithMovie[field] = event.target.value
            this.setState({ modalWithMovie, isEnabled })
        }
    }

    render() {
        let { formIsValid, isEnabled, modalIsOpen } = this.state
        // debugger
        // const { modalWithMovie } = this.state;
        const { showModal, modalWithMovie } = this.props
        const showHideClassname = showModal ? "modal display-block" : "modal display-none";
        return (

            <div className={showHideClassname}>

                <form className="modal-main" >
                    {/* Favorite Food: <FontAwesomeIcon icon="stroopwafel" /> */}

                    <img className="imgModal" src={modalWithMovie.Poster} />
                    <div className="title-line"><div className="fieldName"> Title: </div> <div className="modal-textbox">  <input type="text" className="modalTitle" value={modalWithMovie.Title} onChange={this.handleChange('Title')} /></div></div>
                    <div className="year-line"><div className="fieldName">Year:</div>   <div className="modal-textbox"><input type="number" className="modalYear" value={modalWithMovie.Year} onChange={this.handleChange('Year')} /></div></div>
                    <div className="id-line"><div className="fieldName">imdbID:</div><div className="modal-textbox"><input type="text" className="modalId" value={modalWithMovie.imdbID} onChange={this.handleChange('imdbID')} disabled /></div></div>
                    <button onClick={(e) => { this.props.closeModal(); e.preventDefault(); }} >close</button>
                    <button disabled={!isEnabled} onClick={(e) => { this.openModal(); e.preventDefault(); }} >update</button>
                </form>
                <Modal
                    isOpen={modalIsOpen}
                    style={this.customStyles}
                    className="Modal"
                    overlayClassName="Overlay"
                    contentLabel="Example Modal"
                >
                    <div>
                        Are you sure man?
                </div>
                    <button onClick={() => {
                        modalIsOpen = false;
                        this.setState({ modalIsOpen })
                    }}>no</button>
                    <button onClick={(e) => {
                        this.props.updateMovie(modalWithMovie);
                        e.preventDefault(); modalIsOpen = false;
                        this.setState({ modalIsOpen });
                    }}>Yes</button>
                </Modal>
            </div>
        );
    };
}