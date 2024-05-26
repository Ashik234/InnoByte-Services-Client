import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Profile from "/person_2.svg";
import Logout from "/logout.svg";
import { useSelector } from "react-redux";
function NavBar() {
  const profiledata = useSelector((state) => state.user);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userJWT");
    navigate("/login");
  };
  return (
    <nav className="flex justify-between items-center py-4 border-2 p-8">
      <div className="flex gap-8">
        <Link to="/">
          <div className="text-xl font-bold">InnoByte Services</div>
        </Link>
      </div>
      <div className="flex gap-3">
        <div>
          <div className="flex gap-2">
            <h1>{profiledata.username}</h1>
            <img
              src={Profile}
              className="cursor-pointer"
              alt=""
              onClick={toggleDropdown}
            />
          </div>
          {dropdownOpen && (
            <div className="absolute bg-white border border-gray-300 rounded-md p-2 top-16 right-12 z-10">
              <ul>
                <li>
                  <Link
                    to="/profile"
                    className="block py-2 px-4 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
                <div className="flex cursor-pointer py-2 px-2 hover:bg-gray-100">
                  <img src={Logout} alt="" />
                  <li onClick={handleLogout}>Logout</li>
                </div>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar; 
