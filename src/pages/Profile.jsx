import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import userRequest from "../utils/userRequest";
import { changeUserDetails } from "../Redux/user/userSlice";

function Profile() {
  const profiledata = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const uploadImage = useMutation({
    mutationFn: (data) => userRequest.post("/uploadimage", data),
    onSuccess: (data) => {
      dispatch(
        changeUserDetails({
          userId: data.data.user._id,
          username: data.data.user.username,
          email: data.data.user.email,
          contact: data.data.user.contact,
          about: data.data.user.about,
          image: data.data.user.imageUrl,
        })
      );
      toast.success(data.data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("userId", profiledata.userId);
      uploadImage.mutate(formData);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto bg-gray-100 rounded-xl shadow-md overflow-hidden mt-20">
        <h1 className="text-xl font-bold p-4">Profile</h1>
        <div className="md:flex justify-center items-center">
          <div className="md:flex-shrink-0 ">
              <img
                className="h-48 w-full rounded-full mb-2 ml-2"
                src={
                  profiledata.image ||
                  "https://media.istockphoto.com/id/619400810/photo/mr-who.jpg?b=1&s=612x612&w=0&k=20&c=wnP9EiJwAD1RYuZocG7tdbpcd0-l91K55cAiDcj9InE="
                }
                alt="Profile"
              />
            <input
              type="file"
              id="imageInput"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="flex justify-center items-center">
              <label
                htmlFor="imageInput"
                className="mt-2 border-2 rounded text-black px-4 py-2 cursor-pointer"
              >
                Upload Image
              </label>
            </div>
          </div>
          <div className="p-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  Name
                </div>
                <p className="mt-1 p-2 text-lg border-2 rounded text-black">
                  {profiledata.username}
                </p>
              </div>
              <div>
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  Email
                </div>
                <p className="mt-1 p-2 text-lg border-2 rounded text-black">
                  {profiledata.email}
                </p>
              </div>
              <div>
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  About
                </div>
                <textarea
                  name="about"
                  value={
                    profiledata.about
                      ? profiledata.about
                      : "Tell us about yourself"
                  }
                  className="mt-1 p-2 w-full border rounded text-lg leading-tight text-black"
                />
              </div>
              <div>
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  Contact
                </div>
                <p className="mt-1 p-2 text-lg border-2 rounded text-black">
                  {profiledata.contact
                    ? profiledata.contact
                    : "Add your contact number"}
                </p>
              </div>
            </div>
            <Link to="/profile/edit">
              <button className="mt-4 border-2 rounded text-black px-4 py-2">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
