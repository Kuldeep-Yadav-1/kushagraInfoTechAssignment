import React, { useEffect, useState } from "react";
import validateEmail from "../utils/validateEmail";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UseContextApp } from "../utils/UseContextApp";
import Swal from "sweetalert2";

function Adminsignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    currentUser,
    setCurrentuser,
    loggedIn,
    setLoggedIn,
    loadingData,
    setLoadingData,
  } = UseContextApp();

  const handleSignin = async () => {
    if (!email.trim() || !password.trim()) {
      // alert("all field are required");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "all field are required",
      });
      return;
    }
    if (!validateEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "email is not vallid",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`http://localhost:3008/api/admin-signin`, {
        email: email,
        password: password,
      });
      // alert(res?.data?.message || "admin login successfully");
      Swal.fire({
        icon: "success",
        title: "Success",
        text: res?.data?.message || "admin login successfully",
      });
      setCurrentuser(res?.data?.user);
      JSON.stringify(sessionStorage.setItem("user", res?.data?.user));
      setLoadingData(false);
      // setLoggedIn(true)
      setTimeout(() => {
        navigate(`/displayuser`);
      }, 2000);
    } catch (error) {
      // console.log("error");
      // alert(error?.response?.data?.message || "error from frontend");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message || "error from frontend",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-red-500 flex justify-center content-center items-center">
      <div className="bg-red-200 border rounded-2xl h-44 p-5 items-center grid grid-cols-1 gap-5">
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
          className="border bg-black text-white rounded px-5 py-1 rounded-2xl"
          disabled={loading}
          onClick={handleSignin}
        >
          {loading ? "Please wait.." : "  sign in"}
        </button>
      </div>
    </div>
  );
}

export default Adminsignin;
