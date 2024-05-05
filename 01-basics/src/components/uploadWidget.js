import React, { useState, useContext, useRef, useEffect } from 'react';
import { CloudinaryContext } from '../context/cloudinary-context';
import env from "react-dotenv";

export default function UploadWidget(){

    const {setImage_Url,setImageUploaded} = useContext(CloudinaryContext);
    const [notification, setNotification] = useState('')
    
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    const cloudinaryNameRef = useRef(env.CLOUDINARY_NAME);
    const cloudinaryUploadPresetRef = useRef(env.CLOUDINARY_UPLOAD_PRESET);

    useEffect(() =>{
        cloudinaryRef.current = window.cloudinary;
        setNotification('');

        console.log('cloudname Ref here', cloudinaryNameRef);
        console.log('cloudpreset ref here', cloudinaryUploadPresetRef);    

        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: cloudinaryNameRef.current,
            uploadPreset: cloudinaryUploadPresetRef.current,       
        }, function(error, result){
           console.log(result)
           if (!error && result.event === 'success'){
                
                console.log('cloudinary is working');
                const cloudinaryImageUrl = result.info.url;
                console.log("cloudinaryImageUrl=>", cloudinaryImageUrl);

                setImage_Url(cloudinaryImageUrl);
                setImageUploaded(true);

                document.querySelector("#uploaded_image").src = cloudinaryImageUrl;
                document.querySelector("#uploaded_image").style.display = "block";
                document.querySelector("#new_image_tag").style.display = "block";
                
                console.log('cloudinary data retrieved')
                setNotification("Upload Success!")
            }
        })        
    }, [])

    const handleWidgetClick = (event) => {
        event.preventDefault();

        widgetRef.current.open()
    }

    return( 
        <>
            <div>
                <button onClick={handleWidgetClick} className="mt-3 mb-1 btn btn-primary btn-sm"> Upload New Image </button>
            </div>
            <div>
                <h6 id="new_image_tag" className="mt-3" style={{display:'none'}}> Image Uploaded </h6>
            </div>
            <div>
                <img src="" className="mt-2" style={{display:'none', maxWidth:'500px', objectFit:'contain'}} id="uploaded_image" alt="uploadedImage"/>
            </div>
            <div style={{color:'green'}}>
                {notification}
            </div>
        </>
    )
}

