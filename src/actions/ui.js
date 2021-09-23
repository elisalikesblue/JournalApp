
import Swal from "sweetalert2"

import { types } from "../types/types"



export const setError = (msgError) => {

    Swal.fire({
        title: 'Error!',
        text: msgError,
        icon: 'error',
        confirmButtonText: 'hey'
    })


    return {
        type: types.uiSetError,
        payload: {
            msgError
        }
    }
}

export const removeError = () => {

    

    return {
        type: types.uiRemoveError,
        
        
    }
}

export const startLoading = () => {
    return {
        type: types.uiStartLoading
    }
}

export const finishLoading = () => {
    return {
        type: types.uiFinishLoading
    }
}