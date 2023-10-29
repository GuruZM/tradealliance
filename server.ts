

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./app/utils/firebase/firebase_initialization"; 

// User Methods

export async function checkUser () {    
    let isLogged = false;
    onAuthStateChanged(auth, (user : any) => {
        if (user) {
            isLogged = true;      
        }
      
    })
    return isLogged;
}