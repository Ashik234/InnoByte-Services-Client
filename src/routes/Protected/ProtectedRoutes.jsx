import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectRoutes(props) {
  
    if (localStorage.getItem('userJWT')) {
        return props.children;
      }else{
        return <Navigate to="/" />;

      }
}

export default ProtectRoutes