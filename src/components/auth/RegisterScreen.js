import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import validator from 'validator';


import { removeError } from '../../actions/ui';
import { setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForms';
import { startRegisterWithInput } from '../../actions/auth';

export const RegisterScreen = () => {


    const dispatch = useDispatch();



    const [ formValues, handleInputChange] = useForm({
        name: 'Hernando',
        email: 'nando@gmail.com',
        password: '123456',
        password2: '123456'
    })

    const {name, email, password, password2 } = formValues;

    const hanldeRegister = (e) => {
        e.preventDefault();
        
        if( isFormValid() ) {
            dispatch(startRegisterWithInput(email, password, name))
        }
    }

    const isFormValid = () => {

        if( name.trim().length === 0 ) {
            dispatch(setError('Name is required'))
            // const Swal = require('sweetalert2')
            
            return false;
        } else if ( !validator.isEmail(email) ) {
            dispatch(setError('Email not valid'))
            
            return(false)
        } else if( password !== password2 || password.length < 6 ) {
            dispatch(setError('Passwords should be at least 6 charecters and match'))
           
            return (false)
        }
        dispatch(removeError());
        return(true);
    }


    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={hanldeRegister}>

                {
                    // msgError && 
                    // (
                    //     <div className='auth__alert-error'>
                    //         { msgError.msgError } 
                    //     </div>
                    // )
                    
                
                }

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

               

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
