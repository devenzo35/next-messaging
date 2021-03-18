import { firebase } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { types } from "../redux/types";

const useLogin=()=>{

const dispatch = useDispatch();
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      try {
        const userInfo = {
          username: user?.displayName,
          avatar: user?.photoURL,
          uid: user?.uid,
        };
        dispatch({ type: types.UPDATE_USER_STATE, payload: userInfo });

      } catch (err) {
        console.log(err.code, err.message, err.email, err.credential);
      }
    } else {
      dispatch({ type: types.WITHOUT_USER});
    }
  });
}

export default useLogin