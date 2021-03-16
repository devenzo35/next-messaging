import { all, call, put, takeLatest } from "redux-saga/effects";
import { types } from "../redux/types";
import {firebase} from '../firebase/firebaseConfig'

interface UserInfo {
    username: string,
    uid: string,
    avatar?: string,
}

const auth= firebase.auth()

function* updateUserState(action) {
  try {
    yield put({ type:types.LOGIN_USER, payload: action.payload });
  } catch (err) {
    yield put({ type: types.LOGIN_FAILED, err });
  }
}

function* logoutUser() {
  try {
    yield put({ type:types.LOGOUT_USER});
  } catch (err) {
    yield put({ type: types.LOGIN_FAILED, err });
  }
}

function* registerWithEmailAndPassword(action) {
  try {
      const {user}= yield call( [auth, auth.createUserWithEmailAndPassword], action.payload.email, action.payload.password)
      yield call ([auth.currentUser, auth.currentUser.updateProfile] , { displayName: action.payload.name, photoURL: null});
      
      const userInfo: UserInfo = {
          username: user?.displayName,
          uid: user?.uid,
        };

        yield put ({ type: types.LOGIN_USER, payload: userInfo });
        action.payload.reset();
      }catch(err){
        console.log(err)
        yield put({ type: types.LOGIN_FAILED, payload: err.message });
      };
      
    }
    function* loginWithEmailAndPassword(action) {
      try {
        
        const {user}= yield call( [auth, auth.signInWithEmailAndPassword], action.payload.email, action.payload.password)
        const userInfo: UserInfo = {
          username: user?.displayName,
          avatar: user?.photoURL,
          uid: user?.uid,
        };
        
        yield put ({ type: types.LOGIN_USER, payload: userInfo });
        action.payload.reset();
      }catch(err){
        console.log(err)
        yield put({ type: types.LOGIN_FAILED, payload: err.message });
      };
    
}

function* userSession() {
  yield all([ 
    takeLatest(types.UPDATE_USER_STATE, updateUserState), 
    takeLatest(types.START_LOGOUT, logoutUser),
    takeLatest(types.START_REGISTER, registerWithEmailAndPassword),
    takeLatest(types.START_LOGIN, loginWithEmailAndPassword),
  ])
}

export {userSession};
