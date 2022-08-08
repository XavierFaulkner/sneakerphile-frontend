import { Outlet, Link} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "./Header";

const Layout = () => {
  const {auth} = useAuth();
  const {setAuth} = useAuth();

  return (
    <>
      <Header />
      <p>Logged in as: {auth?.user}</p>
      <p>Accesstoken: {auth?.accessToken}</p>
      <Outlet />
    </>
  )
};

export default Layout;