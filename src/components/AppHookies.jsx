import React,{useState, useEffect, useRef} from "react";
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
import {BsSearch} from "react-icons/bs";
const keyApi = '26520877-3fd7b67c65e333110b622b89f';
const Container = () => {
  return(
    <div className="container">
     <Hearts color="red"/>
    </div>
  )
}

export default function ImageFinder() {
 const [name, setName] = useState('')
 let [namePhoto, setSubmit] = useState(null)
 const [images, setImages] = useState([])
 const [isLoading, setLoading] = useState(false)
 const [isError, setError] = useState(false)
 const [page, setPage] = useState(1)
 const [showButton, setShowButton] = useState(false)
 const [showModal, setShowModal] = useState(false)
 const [photo, setPhoto] = useState('')
 const isFirstRender = useRef(true)


const handleName = event => {
    setName(event.target.value )

}

const handleSubmit= event => {
    event.preventDefault();
    if(name.trim() === '') {
        console.log(name)
        return  toast.error("Please enter word")
    }
       setSubmit(name)
       setImages([])
   
}

const openButton = (data) => {
    if(page*12 >= data.totalHits) {
        setShowButton(false)
      return toast.error(`No more photo`)
    }
    else {
      return  setShowButton(true)
    }
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
    
    if(isFirstRender.current) {
        console.log('it is i am')
        isFirstRender.current = false
        return
    }
    fetchData()
    
}, [namePhoto]
)

const fetchData = async () => {
    if(namePhoto == null) {
        return toast.error(`Enter name photo`)
    }
    setLoading(true)
    try{
      
      const {data} = await axios.get(`https://pixabay.com/api/?q=${namePhoto}&page=${page}&key=${keyApi}&image_type=photo&orientation=horizontal&per_page=12`)
      console.log(data)
      setImages(prev => [...prev, ...data.hits])
      openButton(data)
     
      } catch(error) {
        setError(true)
      } finally{
        setLoading(false)
        setPage(prev => prev+1)
    }
  }

 return(
    <>
    
                
    <Searchbar name={name} handleName={handleName} handleSubmit={handleSubmit}></Searchbar> 
    {images.length > 0 && (<ImageGallery items={images} onClick={openPhoto}/>)}
    {showModal && (<Modal onClose={toggleModal} photo={photo}/>)}
    <ToastContainer autoClose={3000}/>
    {isLoading && (<Container></Container>)}
    {showButton && (<Button onClick={fetchData}/>)}
   
    
    </>
  )
}

