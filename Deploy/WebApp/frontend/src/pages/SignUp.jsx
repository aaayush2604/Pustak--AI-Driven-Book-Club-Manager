import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSignUp from '../Hooks/useSignUp.jsx';


const SignUp =() => {

  const [inputs,setInputs]=useState(
    {
      email:'',
      username:'',
      password:''
    }
  )

  const {signup,loading}=useSignUp();

  const handleSubmit=async (e)=>{
    e.preventDefault();
    console.log(inputs);
    await signup(inputs); 
  }

  const handleCheckBoxChange=(gender)=>{
    setInputs({...inputs,gender})
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white shadow-md rounded-lg p-8 w-96">
    <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">
      SignUp
    </h1>

    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          <span>Email</span>
        </label>
        <input
          type="text"
          placeholder="Enter your Email"
          value={inputs.email}
          onChange={(e) => {
            setInputs({ ...inputs, email: e.target.value });
          }}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          <span>Username</span>
        </label>
        <input
          type="text"
          placeholder="Enter your Username"
          value={inputs.username}
          onChange={(e) => {
            setInputs({ ...inputs, username: e.target.value });
          }}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          <span>Password</span>
        </label>
        <input
          type="password"
          placeholder="Enter your Password"
          value={inputs.password}
          onChange={(e) => {
            setInputs({ ...inputs, password: e.target.value });
          }}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <Link to="/login" className="text-sm text-blue-600 hover:underline mb-4 block text-center">
        Already Have an Account?
      </Link>

      <div>
        <button
          disabled={loading}
          type="submit"
          className={`w-full p-2 text-white font-semibold rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none`}
        >
          {loading ? <span>Loading...</span> : "SignUp"}
        </button>
      </div>
    </form>
  </div>
</div>


  )
}

export default SignUp