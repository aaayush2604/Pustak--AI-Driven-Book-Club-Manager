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
    <div className="flex items-center justify-center min-h-screen login-background">
    <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login</h1>

        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                    <span>Email</span>
                </label>
                <input 
                    type="text" 
                    placeholder="Enter your Email" 
                    value={email} 
                    onChange={(e) => { setEmail(e.target.value); }}
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
                    value={password} 
                    onChange={(e) => { setPassword(e.target.value); }}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <Link to="/signup" className="text-sm text-blue-600 hover:underline mb-4 block text-center">
                Don't Have an Account?
            </Link>
            <div>
                <button 
                    disabled={loading} 
                    type="submit" 
                    className={`w-full p-2 text-white font-semibold rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none`}
                >
                    {loading ? <span>Loading...</span> : "Login"}
                </button>
            </div>
        </form>
    </div>
</div>


  )
}

export default Login