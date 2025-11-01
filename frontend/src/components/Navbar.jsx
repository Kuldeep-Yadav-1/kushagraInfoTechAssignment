import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between p-5 bg-blue-200 text-xl">
      <Link to={"/adminsignin"}>Admin Signin</Link>
      <Link to={"/adduser"}>Add new user</Link>
      {/* <Link to={"/displayuser"}>Dispaly user</Link>
    <Link to={"/updateuser"}>Update User Data</Link> */}
    </div>
  );
}

export default Navbar;
