import { firebase, storage } from "../firebase/firebaseConfig"
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

export const useUploadFile= (file: File)=>{

    const [url, setUrl] = useState('')

    const CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/dyukcbbpg/image/upload";

    const CLOUDINARY_UPLOAD_PRESET = "next-messaging";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    //setProgress("Loading image...");

    fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.secure_url !== "") {
          //setProgress("");
          const uploadedFileUrl = data.secure_url;
          setUrl(uploadedFileUrl)
          //setImageUrl(uploadedFileUrl);
        }
      })
      .catch((err) =>{console.log(err)}) //setProgress(err.message));

    return url
}
    

    

