import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import  app  from '../firebase';
import {useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInFailure, signInSuccess } from "../redux/user/userSlice";

export default function OAuth() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleGoogleClick = async () =>{
      const auth = getAuth(app);
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
            },
          body: JSON.stringify({
            name: resultFromGoogle.user.displayName,
            email: resultFromGoogle.user.email,
            googlePhotoUrl: resultFromGoogle.user.photoURL,
          
          })
        });
        const data = await res.json();
        if (res.ok) {
          dispatch(signInSuccess(data));
          navigate('/');

        }
      console.log(resultFromGoogle);
    } catch (err) {
      dispatch(signInFailure(err.messsage));
    }

  };
  return (
    <Button type="button" gradientDuoTone="pinkToOrange" outline onClick={handleGoogleClick}>
      <AiFillGoogleCircle className="w-6 h-6 mr-2"  />
      Continue with Google
    </Button>
  );
}
