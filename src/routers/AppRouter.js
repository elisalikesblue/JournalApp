import React from 'react';
import { useEffect } from 'react';
import { getAuth } from '@firebase/auth';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';


import { login } from '../actions/auth';
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';



export const AppRouter = () => {

    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLogged, setisLogged] = useState(false)



    useEffect(() => {
        const auth = getAuth();
        auth.onAuthStateChanged( (user) => {
            if( user?.uid ) {
                dispatch(login(user.uid, user.displayName))
                setisLogged(true);
            }
            else {
                setisLogged(false);
            }
            
            setChecking(false);
        })

    }, [ dispatch, setChecking, setisLogged])


    if ( checking ) {
        return (
            <h1>Please wait</h1>
        )
    }


    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated={isLogged}
                    />

                    <PrivateRoute
                        exact
                        isAuthenticated={isLogged}
                        path="/"
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
