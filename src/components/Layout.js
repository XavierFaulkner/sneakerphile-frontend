import { Outlet, Link} from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Layout = () => {
  const {auth} = useAuth();
  const {setAuth} = useAuth();

  const logout = () => {
    setAuth(null);
  }

  return (
    <>
      <nav>
        <ul>
          {auth?.user
            ? (
                <>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/admin">Admin</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                  <button onClick={logout}>logout</button>
                </>
              )
            : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>
              )
          }
        </ul>
      </nav>
      <p>Logged in as: {auth?.user}</p>
      <p>Accesstoken: {auth?.accessToken}</p>
      <Outlet />
    </>
  )
};

export default Layout;