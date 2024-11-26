import  { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
function Login() {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigete = useNavigate();
  return (
    <div className="grid  min-h-screen grid-cols-1 md:grid-cols-2 bg-gray-50">
       <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-700">Login</h2>
        <form className="space-y-4">
          <label className="flex items-center rounded border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 text-gray-500">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              placeholder="Email"
              className="ml-2 flex-grow bg-transparent outline-none"
              onChange={(e)=> {
                setEmail(e.target.value);
              }}
            />
          </label>
          {/* Password Input */}
          <label className="flex items-center rounded border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 text-gray-500">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              placeholder="Password"
              className="ml-2 flex-grow bg-transparent outline-none"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </label>

          <button onClick={async (e) => {
            try{
            e.preventDefault()
            const res  = await axios.post("https://backend.pranavsalunkhe327.workers.dev/api/v1/user/login" , {
                email,
                password

            })
            localStorage.setItem("token" , res.data.token);
            localStorage.setItem("firstname" , res.data.user.firstname)
            navigete('/')

            }catch(err){
                alert(err);
            }

          }} className="w-full rounded bg-gray-500 py-2 text-white transition hover:bg-gray-600">
            Login
          </button>
          <p className='text-sm'>Don't have an account? <a href='/register' className='text-blue-400 underline'>register</a></p>
        </form>
      </div>
    </div>
    <div className="hidden md:flex items-center justify-center bg-gray-200 px-4 py-8">
        <blockquote className="text-center text-xl font-semibold text-gray-600 md:text-2xl">
        "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe". He also said, "Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world"
          <footer className="mt-4 text-sm text-gray-500">- Albert Einstein</footer>
        </blockquote>
      </div>
    </div>

   
  );
}

export default Login;
