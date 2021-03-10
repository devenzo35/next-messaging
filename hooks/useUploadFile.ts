import { storage } from "../firebase/firebaseConfig"


export const useUploadFile=(file)=>{

    const ref = storage.ref(`MsgImages/${file.name}`)
    
    const task= ref.put(file)

    return task
}
