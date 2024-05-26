import React from "react";
import { useSelector } from "react-redux";

function Home() {
    const profiledata = useSelector((state) => state.user);

    return (
        <div>
            <h1>User Profile</h1>
            <p>Name: {profiledata.username}</p>
            <p>Email: {profiledata.email}</p>
        </div>
    );
}

export default Home;
