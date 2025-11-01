import React from "react";
import { useState, useEffect } from "react";
import validateEmail from "../utils/validateEmail";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UseContextApp } from "../utils/UseContextApp";
import Swal from "sweetalert2";

function Adduser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState("");
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  const {
    currentUser,
    setCurrentuser,
    loggedIn,
    setLoggedIn,
    loadingData,
    setLoadingData,
  } = UseContextApp();

  useEffect(() => {
    if (currentUser == null) {
      navigate(`/adminsignin`);
    }
  }, []);
  const handleAddNewUser = async () => {
    if (!name.trim() || !post.trim() || !email.trim() || !password.trim()) {
      // alert("all field are required");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "all field are required",
      });
      return;
    }
    if (!validateEmail(email)) {
      // alert("email is not vallid");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "email is not vallid",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`http://localhost:3008/api/user-data`, {
        name: name,
        post: post,
        email: email,
        password: password,
      });
      // alert(res?.data?.message || "user data added successfully");
      Swal.fire({
        icon: "success",
        title: "Success",
        text: res?.data?.message || "User Data added",
      });
    } catch (error) {
      // console.log("error");
      // alert(error?.response?.data?.message || "error from frontend");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message || "error ",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-500 flex justify-center content-center items-center">
      <div className="bg-red-200 border rounded-2xl h-65 p-5 items-center grid grid-cols-1 gap-5">
        <div>
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            placeholder="Enter admin name"
            className="rounded-2xl py-1 px-4 border"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="post">Post :</label>

          <select
            name=""
            id="post"
            value={post}
            className="rounded-2xl py-1 px-4 border"
            onChange={(e) => setPost(e.target.value)}
          >
            <option value="">---select post---</option>
            <option value="Mern Developer">Mern Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Frontend Developer">Frontend Developer</option>
          </select>
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="text"
            placeholder="Enter admin email"
            className="rounded-2xl py-1 px-4 border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">password :</label>
          <input
            type="text"
            value={password}
            placeholder="Enter admin password"
            className="rounded-2xl py-1 px-4 border"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="border bg-black text-white px-5 py-1 rounded-2xl"
          disabled={loading}
          onClick={handleAddNewUser}
        >
          {loading ? "Please wait.." : "Update Data"}
        </button>
      </div>
    </div>
  );
}

export default Adduser;
