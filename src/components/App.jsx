import React,{useState, useEffect} from "react";
import { Hearts  } from 'react-loader-spinner'
import Searchbar from './Searchbar/Searchbar';
import axios from 'axios';
import ImageGallery from './ImageGallery/ImageGallery'
import Modal from './Modal/Modal'
import Button from './Button/Button'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'
import './styles.css'

const keyApi = '26520877-3fd7b67c65e333110b622b89f';
const Container = () => {
  return(
    <div className="container">
     <Hearts color="red"/>
    </div>
  )
}

function ImageFinder() {
 const [name, setName] = useState('')
 let [namePhoto, setSubmit] = useState('')
 const [images, setImages] = useState([])
 const [isLoading, setLoading] = useState(false)
 const [isError, setError] = useState(false)
 const [page, setPage] = useState(1)
 const [showButton, setShowButton] = useState(false)
 const [showModal, setShowModal] = useState(false)
 const [photo, setPhoto] = useState('')


const handleName = event => {
    setName(event.target.value )

}

const handleSubmit= event => {
    event.preventDefault();
    if(name.trim() === '') {
        console.log(name)
        return  toast.error("Please enter word")
    }
       setPage(1)
       setSubmit(name)
       setImages([])
   
}

const openButton = (data) => {
    if(data.totalHits === 0) {
      return toast.error(`No photo with ${namePhoto}`)
    }
    if(page*12 >= data.totalHits) {
        setShowButton(false)
      return toast.error(`No more photo`)
    }
      setShowButton(true)
    
   }
const openPhoto  = (event) => {
      
    const [img] = event.currentTarget.children
    setPhoto(img.alt)
      toggleModal()
    }
const  toggleModal = () => {
    
    setShowModal(!showModal)
  }

useEffect(() => {
    
    if(namePhoto) {
      fetchData()
      
    }
    
      
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [namePhoto]
)

const fetchData = async () => {
    setLoading(true)
    try{
      
      const {data} = await axios.get(`https://pixabay.com/api/?q=${namePhoto}&page=${page}&key=${keyApi}&image_type=photo&orientation=horizontal&per_page=12`)
      console.log(data)
      setImages(prev => [...prev, ...data.hits])
      
      openButton(data)
      setPage(prev => prev+1)

      } catch(error) {
        setError(true)
        if(isError) {
          toast.error('Error')
          console.log(error)
        }
      } finally{
        setLoading(false)
        
        
    }
  }

 return(
    <>
    
                
    <Searchbar name={name} handleName={handleName} handleSubmit={handleSubmit}></Searchbar> 
    {images.length > 0 && (<ImageGallery items={images} onClick={openPhoto}/>)}
    {showModal && (<Modal onClose={toggleModal} photo={photo}/>)}
    <ToastContainer autoClose={2000}/>
    {isLoading && (<Container></Container>)}
    {showButton && (<Button onClick={fetchData}/>)}
   
    
    </>
  )
}

export const App = () => {
  return (
   <ImageFinder />
  );
};