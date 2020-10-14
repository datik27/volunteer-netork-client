import React, { useContext } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';


const PrivateRoute = ({children, ...rest}) => {
    const [user]=useContext(UserContext)
    const location=useLocation()
    return (
        <Route
            {...rest}
            render ={
                ()=>user.isSignedIn ? (children)
                : <Redirect to={{
                    pathname:'/auth',
                    state:location
                }}
                />
            }
        >

        </Route>
    );
};

export default PrivateRoute;