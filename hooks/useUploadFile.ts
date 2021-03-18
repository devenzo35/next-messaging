import { firebase, storage } from "../firebase/firebaseConfig"
import { v4 as uuidv4 } from 'uuid';

export const useUploadFile=(file: File)=>{
    const uuid = uuidv4();
    var storageRef = firebase.storage().ref();
    var mountainImagesRef = storageRef.child(`MsgImages/${uuid}`);
    const task= mountainImagesRef.put(file)
    
    return task
}
    

    

