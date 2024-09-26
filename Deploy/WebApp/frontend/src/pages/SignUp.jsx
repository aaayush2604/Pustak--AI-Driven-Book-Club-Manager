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
    <div>
  <div>
    <h1>
      SignUp
      <span>GupShup</span>
    </h1>

    <form onSubmit={handleSubmit}>
      <label>
        <span>Email</span>
      </label>
      <input
        type="text"
        placeholder="Enter your Email"
        value={inputs.email}
        onChange={(e) => {
          setInputs({ ...inputs, email: e.target.value });
        }}
      />

      <label>
        <span>Username</span>
      </label>
      <input
        type="text"
        placeholder="Enter your Username"
        value={inputs.username}
        onChange={(e) => {
          setInputs({ ...inputs, username: e.target.value });
        }}
      />

      <label>
        <span>Password</span>
      </label>
      <input
        type="password"
        placeholder="Enter your Password"
        value={inputs.password}
        onChange={(e) => {
          setInputs({ ...inputs, password: e.target.value });
        }}
      />

      <Link to="/login">Already Have an Account?</Link>

      <div>
        <button disabled={loading}>
          {loading ? <span>Loading...</span> : "SignUp"}
        </button>
      </div>
    </form>
  </div>
</div>

  )
}

export default SignUp