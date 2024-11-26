import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Animation from '../components/Animation';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "https://backend.pranavsalunkhe327.workers.dev/api/v1/user/register",
        { email, password, firstname, lastname }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("firstname", response.data.user.firstname);
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2 bg-gray-50">
      <div className="flex items-center justify-center px-4 py-8 bg-gray-100">
        <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-semibold text-gray-700">Register</h2>
          <form className="space-y-4">
            <label className="flex items-center rounded border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 text-gray-500"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                placeholder="Email"
                className="ml-2 flex-grow bg-transparent outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="flex items-center rounded border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 text-gray-500"
              >
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label className="flex items-center rounded border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
              <input
                type="text"
                placeholder="First Name"
                className="ml-2 flex-grow bg-transparent outline-none"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </label>
            <label className="flex items-center rounded border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
              <input
                type="text"
                placeholder="Last Name"
                className="ml-2 flex-grow bg-transparent outline-none"
                onChange={(e) => setLastname(e.target.value)}
              />
            </label>
            <button
              onClick={handleSubmit}
              className="w-full rounded bg-blue-500 py-2 text-white transition hover:bg-blue-600"
            >
              Register
            </button>
            <p className="text-center text-sm">
              Already have an account?{' '}
              <a href="/login" className="text-blue-500 underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center bg-gray-200 px-4 py-8">
        {/* <blockquote className="text-center text-xl font-semibold text-gray-600 md:text-2xl">
          "If I have seen further, it is by standing on the shoulders of giants."
          <footer className="mt-4 text-sm text-gray-500">- Isaac Newton</footer>
        </blockquote> */}
        <Animation />
      </div>
    </div>
  );
}

export default Register;
