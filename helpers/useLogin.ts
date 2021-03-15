import { firebase } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";

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

        localStorage.setItem("user", JSON.stringify(userInfo));
        dispatch({ type: "START_LOGIN", payload: userInfo });

      } catch (err) {
        console.log(err.code, err.message, err.email, err.credential);
      }
    } else {
      dispatch({ type: "WITHOUT_USER"});
    }
  });
}

export default useLogin