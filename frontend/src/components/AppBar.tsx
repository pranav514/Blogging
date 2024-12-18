import { Link, useNavigate } from "react-router-dom";

function AppBar() {
  const token = localStorage.getItem('token');

  const firstname : string = localStorage.getItem('firstname') || "";
  const navigate = useNavigate();
  return (
    <div className="navbar bg-slate-400 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('firstname');
                navigate('/')
              }}
              className="btn btn-ghost"
            >
              Logout
            </button>
            <button
              onClick={() => {
                token ? navigate('/blogpost') : alert("login to view blog")
                
              }}
              className="btn btn-ghost"
            >
              Add Blog
            </button>
            <button
              onClick={() => {
                token ?  navigate('/explore') : alert("login to view your blog")
               
              }}
              className="btn btn-ghost"
            >
              View Your Blogs
            </button>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl font-bold">Blog</a>
      </div>
      <div className="navbar-end">
        {!token ? (
          <button className="btn btn-ghost btn-circle">
            <Link to={'/login'}>Login</Link>
          </button>
        ) : (
          <div className="relative mt-1 mr-2 inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">{firstname[0]}</span>
    </div>
        )}
      </div>
    </div>
  );
}

export default AppBar;
