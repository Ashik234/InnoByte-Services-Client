import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import userRequest from "../utils/userRequest";
import { changeUserDetails } from "../Redux/user/userSlice";

function EditProfile() {
  const profiledata = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: profiledata.userId,
    username: profiledata.username,
    contact: profiledata.contact,
    about: profiledata.about,
  });

  const editProfile = useMutation({
    mutationFn: (data) => userRequest.post("/edit", data),
    onSuccess: (data) => {
      dispatch(changeUserDetails(data.data.user));
      toast.success(data.data.message);
      navigate("/profile");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editProfile.mutate(formData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-100 rounded-xl shadow-lg overflow-hidden mt-20 p-8">
      <h1 className="text-xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Name
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="col-span-1">
            <label className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Contact
            </label>
            <input
              type="number"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="col-span-2">
            <label className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              About
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
