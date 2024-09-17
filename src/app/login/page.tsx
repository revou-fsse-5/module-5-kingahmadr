import React from "react";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";

const page = () => {
  return (
    <div className="login-page">
      <Navbar />
      <LoginForm />
    </div>
  );
};

export default page;
