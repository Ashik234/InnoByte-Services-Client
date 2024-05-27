import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const profiledata = useSelector((state) => state.user);
  const user = {
    image: "https://via.placeholder.com/150",
    name: "John Doe",
    email: "john.doe@example.com",
    about:
      "Software engineer with 5 years of experience in full-stack development.",
    contact: "+1 234 567 890",
  };

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-20">
        <h1 className="text-xl font-bold">Profile</h1>
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:h-full md:w-48"
              src={profiledata.image}
              alt="Profile"
            />
          </div>
          <div className="p-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  Namedfdf
                </div>
                <p className="mt-1 text-lg leading-tight font-medium text-black">
                  {profiledata.username}
                </p>
              </div>
              <div>
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  Email
                </div>
                <p className="mt-1 text-lg leading-tight font-medium text-black">
                  {profiledata.email}
                </p>
              </div>
              <div>
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  About
                </div>
                <p className="mt-1 text-lg leading-tight font-medium text-black">
                  {profiledata.about}
                </p>
              </div>
              <div>
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  Contact
                </div>
                <p className="mt-1 text-lg leading-tight font-medium text-black">
                  {profiledata.contact}
                </p>
              </div>
            </div>
            <button className="mt-4  text-black px-4 py-2 rounded-md">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
