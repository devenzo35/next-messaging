import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
const db = firebase.firestore();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

const fetchMessages = (room, callback) => {
  return db
    .collection(`/rooms/${room}/messages`)
    .orderBy("createdAt", "asc")
    .onSnapshot(({ docs }) => {
      const messages = [];
      docs.map((doc) => {
        const data = doc.data();
        const format = +data.createdAt.toDate();
        messages.push({ id: doc.id, ...data, createdAt: format });
      });
      callback(messages);
    });
};

const fetchRooms = (callback) => {
  return db
    .collection("/rooms")
    .orderBy("roomName", "asc")
    .onSnapshot(({ docs }) => {
      const rooms = [];
      docs.map((doc) => {
        const data = doc.data();
        rooms.push({ id: doc.id, ...data });
      });
      callback(rooms);
    });
};

export { firebase, provider, db, fetchMessages, fetchRooms, storage };
