
import { db } from "../firebase/firebase-config";






export const startNewNote = () => {

    return (dispatch, getState ) => {

        const uid = getState().auth.uid;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const doc = db.collection(`${uid}/jounal/notes`).add(newNote)

    }
}