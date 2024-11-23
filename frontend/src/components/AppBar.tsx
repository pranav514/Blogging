import { Link } from "react-router-dom";
function AppBar() {
    const token = localStorage.getItem('token');
    const firstname = localStorage.getItem('firstname');

    return (
        <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <button onClick={() => {
                localStorage.removeItem('token')
                localStorage.removeItem('firstname')
              }}>logout</button>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">Blog</a>
        </div>
        <div className="navbar-end">
            {!token ?          <button className="btn btn-ghost btn-circle">
    
            <Link to={'/login'}>
                Login
            
            </Link>
          </button> : <h1>{firstname}</h1>  }

        </div>
      </div>
    );
  }
  
  export default AppBar;
  