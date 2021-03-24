
export const useUpload = async (formData: FormData)=>{


    const CLOUDINARY_URL ="https://api.cloudinary.com/v1_1/dyukcbbpg/image/upload";

      const urlState= await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.secure_url !== "") {
          const uploadedFileUrl = data.secure_url;
          return { url: uploadedFileUrl, error: null}
        }
      })
      .catch((err) =>({url:null, error: err.message}));
    return urlState 
}
    

    

