import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import useLogin from '../Hooks/useLogin.jsx';

const Login = () => {

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const {loading, login}=useLogin();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        await login(email,password);
    }

  return (
    <div>
    <div>
        <h1>Login
        </h1>

        <form onSubmit={handleSubmit}>
            <label>
                <span>Email</span>
            </label>
            <input type='text' placeholder='Enter your Username' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <label>
                <span>Password</span>
            </label>
            <input type='password' placeholder='Enter your Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <Link to="/signup">
                Don't Have an Account?
            </Link>
            <div>
                <button disabled={loading} type='submit'>
                    {loading ? <span></span> : "Login"}
                </button>
            </div>
        </form>
    </div>
</div>

  )
}

export default Login