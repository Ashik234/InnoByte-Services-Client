import React from 'react'
import { Navigate } from 'react-router-dom';

function PublicRoutes(props) {
    if (localStorage.getItem('userJWT')) {
          return <Navigate to="/" />;
        }
        <Navigate to='/login'/>
        return props.children;
}

export default PublicRoutes