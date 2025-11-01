import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseContextApp } from "../utils/UseContextApp";

function DisplayAlldata() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    currentUser,
    setCurrentuser,
    loggedIn,
    setLoggedIn,
    loadingData,
    setLoadingData,
  } = UseContextApp();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser == null) {
      navigate(`/adminsignin`);
    }
  }, []);
  useEffect(() => {
    fetchAllData();
  }, []);
  const handleUpdate = (user_id) => [navigate(`/updateuser/${user_id}`)];

  const handleDelete = async (user_id) => {
    try {
      setLoading(true);
      const res = await axios.post(`http://localhost:3008/api/delete-user`, {
        user_id: user_id,
      });
      // alert(res?.data?.message || "deleted successfully");
      Swal.fire({
        icon: "success",
        title: "Success",
        text: res?.data?.message || "deleted successfully",
      });

      fetchAllData();
    } catch (error) {
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

  const fetchAllData = async () => {
    try {
      const res = await axios.get(`http://localhost:3008/api/get-all-user`);
      console.log("data", res);
      console.log("data result", res?.data?.result);
      const resResult = res?.data?.result;
      setUserData(resResult);
    } catch (error) {
      console.log(error?.response?.data?.message || "error from frontend");
    }
  };
  return (
    <div className="grid  grid-cols-1 md:grid-cols-2 bg-red-500 lg:grid-cols-3 gap-3 p-5">
      {userData.map((item, index) => {
        return (
          <div
            key={item?._id}
            className=" grid grid-cols-1 gap-4 rounded bg-red-300 border p-5"
          >
            <div>Name :{item?.name}</div>
            <div>Post :{item?.post}</div>
            <div>Email:{item?.email}</div>
            <button
              onClick={() => handleDelete(item?._id)}
              className="bg-black text-white border rounded-2xl px-5 py-1"
            >
              Delete data
            </button>
            <button
              onClick={() => handleUpdate(item?._id)}
              className="bg-black text-white border rounded-2xl px-5 py-1"
            >
              Update data
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default DisplayAlldata;
