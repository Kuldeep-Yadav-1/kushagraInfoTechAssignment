import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import validateEmail from "../utils/validateEmail";
import {UseContextApp} from "../utils/UseContextApp";

function Updateuser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState("");
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate()

  //   const { user_id } = useParams("id");
  const { user_id } = useParams();
  console.log("user_id", user_id);
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

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleUpdate = async () => {
    if (!name.trim() || !post.trim() || !email.trim() || !password.trim()) {
      alert("all field are required");
      return;
    }
    if (!validateEmail(email)) {
      alert("email is not vallid");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:3008/api/update-user-data/${user_id}`,
        {
          name: name,
          post: post,
          email: email,
          password: password,
        }
      );
      alert(res?.data?.message || "user data updated successfully");
    } catch (error) {
      // console.log("error");
      alert(error?.response?.data?.message || "error from frontend");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3008/api/get-single-data/${user_id}`
      );
      console.log("data", res);
      console.log("single data result", res?.data?.result);
      const resResult = res?.data?.result;
      setUserData(resResult);
      setName(resResult?.name);
      setEmail(resResult?.email);
      setPost(resResult?.post);
      setPassword(resResult?.password);
    } catch (error) {
      console.log(error?.response?.data?.message || "error from frontend");
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
          onClick={handleUpdate}
        >
          {loading ? "Please wait.." : "Update Data"}
        </button>
      </div>
    </div>
  );
}

export default Updateuser;
