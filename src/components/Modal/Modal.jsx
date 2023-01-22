import { Component, useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import '../styles.css'
const modalRoot = document.querySelector('#modal-root')

export default function Modal({onClose, photo}) {
 
 
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return() => {
      window.addEventListener('keydown', handleKeyDown)
    }
  })
 
  const handleKeyDown = event => {
    if(event.code === 'Escape') {
      onClose()
      }
    }
    
  const handleBackdropClick = (event) => {
    if(event.currentTarget === event.target) {
      onClose()
      }
    }
 
  return(
            <div onClick={handleBackdropClick} className="Overlay">
      <div className="Modal">
        <img src={photo} alt="" />
      </div>
    </div>
        )
}

// class Modal extends Component {
//   state = {

//   }

//   componentDidMount() {
//    window.addEventListener('keydown', this.handleKeyDown)
  

//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown)
   
//   }

//   handleKeyDown = event => {
//     if(event.code === 'Escape') {
//         this.props.onClose()
//     }
//    }

//    handleBackdropClick = (event) => {
//     if(event.currentTarget === event.target) {
//         this.props.onClose()
//     }
//    }


//   render() {
//     return createPortal(
//         <div onClick={this.handleBackdropClick} className="Overlay">
//   <div className="Modal">
//     <img src={this.props.photo} alt="" />
//   </div>
// </div>, modalRoot
//     )
//   }
// }

Modal.propTypes = {
  onClose: PropTypes.elementType.isRequired,
  photo: PropTypes.string.isRequired
 }
