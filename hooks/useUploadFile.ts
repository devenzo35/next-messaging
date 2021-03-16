import { storage } from "../firebase/firebaseConfig"
import { v4 as uuidv4 } from 'uuid';

export const useUploadFile=(file)=>{
    const uuid = uuidv4();
    const ref = storage.ref(`MsgImages/${uuid}`)
    const task= ref.put(file)
    
    return task
}
    

    

