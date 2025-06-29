
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { use } from "react";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCwxYzBQM33JPPCcy048WAE2gpepqKRgDc",
  authDomain: "netflix-779dd.firebaseapp.com",
  projectId: "netflix-779dd",
  storageBucket: "netflix-779dd.firebasestorage.app",
  messagingSenderId: "965377952057",
  appId: "1:965377952057:web:a8932c040e034f77e800e8",
  measurementId: "G-2PM31BZRYL"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth()
const db =getFirestore(app)

const signup = async(name,email,password)=>{
    try{
      const res =  await createUserWithEmailAndPassword(auth,email,password)
      const user =res.user;
      await addDoc(collection(db,'user'),{
        uid: user.uid,
        name,
        authProvided:'local',
        email,
      })
    }catch(error){
        console.log(error)
      toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}


const login = async(email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password)
    }catch(error){
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout =async()=>{
    signOut(auth)
}


const addToWatchLater = async (userId, movie) => {
  try {
    await setDoc(doc(db, 'users', userId, 'watchLater', movie.id.toString()), {
      ...movie,
      addedAt: new Date(),
    });
    toast.success("Added to Watch Later");
  } catch (error) {
    console.error(error);
    toast.error("Failed to add");
  }
};


const removeFromWatchLater = async(userId,movieId)=>{
  try{
    await deleteDoc(doc(db,'users',userId,'watchLater',movieId.toString()));
    toast.success("Remove from watch Later")

  }catch(error){
     console.error(error);
    toast.error("Failed to remove");
  }
}

export {auth,db,login,signup,logout,addToWatchLater,removeFromWatchLater}