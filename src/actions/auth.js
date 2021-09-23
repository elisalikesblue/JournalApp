import { googleAuthProvider } from "../firebase/firebase-config"
import { getAuth, signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { updateProfile } from "@firebase/auth";
// import Swal from 'sweetalert2';

import { types } from "../types/types"
import { finishLoading, startLoading } from "./ui";






export const startLoginEmailPassowrd = (email, password) => {
    const auth = getAuth();

    return (dispatch) => {

        dispatch(startLoading())

        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(finishLoading())

                dispatch(login(user.uid, user.displayName))
            })
            .catch( e => {
                console.log(e)
                dispatch(finishLoading())

                const Swal = require('sweetalert2')
                Swal.fire({
                    title: 'Error!',
                    text: e.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                console.log(e)
            })
                
        //dispatch( login(123, 'Pedro'))
    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}


export const startRegisterWithInput = (email, password, name ) => {
    const auth = getAuth();
    

    return (dispatch) => {
        createUserWithEmailAndPassword( auth, email, password)
        .then( async({user}) => {
            await(updateProfile(auth.currentUser, {displayName: name}))
            dispatch(login(user.uid, user.displayName))
            console.log(user)
        })
        .catch((e) => {
            console.log(e)
            
            const Swal = require('sweetalert2')
            Swal.fire({
                title: 'Error!',
                text: e.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        });
    }
    
}

export const startGoogleLogin = ( dispatch ) => {

    const auth = getAuth();
    
        signInWithPopup( auth, googleAuthProvider )
            .then((result)=> {
                
                dispatch(login(result.user.uid, result.user.displayName));
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // // The signed-in user info.
                // const user = result.user;
            }).catch((error) => {
                // // Handle Errors here.
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // // The email of the user's account used.
                // const email = error.email;
                // // The AuthCredential type that was used.
                // const credential = GoogleAuthProvider.credentialFromError(error);
                // // ...
            })
    
}

export const startLogout = () => {
    const auth = getAuth();
    return async ( dispatch ) => {
        await (auth.signOut());

        dispatch( logout() );
    }
}

export const logout = () => ({
    type: types.logout
})

