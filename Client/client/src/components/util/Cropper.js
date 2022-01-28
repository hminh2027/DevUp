import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import ReactCrop from 'react-image-crop'

import 'react-image-crop/dist/ReactCrop.css'

import styles from './Cropper.module.css'

const Cropper = ({ src, setImage, setCropImage }) => {
    const dispatch = useDispatch()
    const [crop, setCrop] = useState({aspect: 1/1})
    const [image, setLocalImage] = useState(null)
    const [link, setLink] = useState(null)
    
    useEffect(()=>{
        setLink(URL.createObjectURL(src))
    },[src])

    function getCroppedImg() {
        const canvas = document.createElement("canvas")
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height
        canvas.width = crop.width
        canvas.height = crop.height
        const ctx = canvas.getContext("2d")
      
        // New lines to be added
        const pixelRatio = window.devicePixelRatio
        canvas.width = crop.width * pixelRatio
        canvas.height = crop.height * pixelRatio
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
        ctx.imageSmoothingQuality = "high"
      
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        )
        canvas.toBlob(
            blob => {
                if(blob) setImage({...image,avatar: blob})
                else dispatch({type: 'ALERT' , payload: {error: 'Please crop the image!'}})
            }
        )
        setCropImage(null)
    }

    return (
        <div className={styles.container}>
            <div className={styles.crop_heading}>Crop Image</div>
            <ReactCrop className={styles.crop_img} crop={crop} src={link} onChange={setCrop} onImageLoaded={setLocalImage} />
            <div onClick={getCroppedImg} className={styles.crop_btn}>Crop</div>
        </div>
    )
}

export default Cropper
