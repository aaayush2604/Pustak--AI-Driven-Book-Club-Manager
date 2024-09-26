import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const handleInputErrors = ({
    email,
  username,
  password
}) => {
  if (!email || !username || !password) {
    toast.error("All Fields are not Filled");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
};

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser}=useAuthContext();

  const signup = async ({
    email,
    username,
    password,
  }) => {
    const success = handleInputErrors({
     email,
      username,
      password,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      const data = await res.json();
      if (data.error) {
        console.log(data.error);
        throw new Error(data.error);
      }

      localStorage.setItem('user',JSON.stringify(data));

      setAuthUser(data);

      console.log(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { signup, loading };
};

export default useSignUp;