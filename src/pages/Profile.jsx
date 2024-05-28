import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import userRequest from "../utils/userRequest";
import { changeUserDetails } from "../Redux/user/userSlice";

function Profile() {
  const profiledata = useSelector((state) => state.user);
  console.log(profiledata);
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);

  const uploadImage = useMutation({
    mutationFn: (data) => userRequest.post("/uploadimage", data),
    onSuccess: (data) => {
      console.log(data);
      // dispatch(changeUserDetails(data.data.user));
      dispatch(
        changeUserDetails({
          userId: data.data.user._id,
          username: data.data.user.username,
          email: data.data.user.email,
          contact: data.data.user.contact,
          about:data.data.user.about,
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
    setImage(e.target.files[0]);
  };

  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("userId", profiledata.userId);
    uploadImage.mutate(formData);
    console.log(uploadImage);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto bg-gray-100 rounded-xl shadow-md overflow-hidden mt-20">
        <h1 className="text-xl font-bold p-4">Profile</h1>
        <div className="md:flex">
          <div className="md:flex-shrink-0 ml-4">
            <img
              className="h-48 w-full rounded-lg"
              src={profiledata.image || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC"}
              alt="Profile"
            />
            <input
              type="file"
              id="imageInput"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="imageInput"
              className="mt-4 border-2 rounded text-black px-4 py-2 cursor-pointer"
            >
              Change Image
            </label>
            {image && (
              <button
                onClick={handleImageUpload}
                className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md"
              >
                Upload Image
              </button>
            )}
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
