import { Outlet, Link} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const {auth} = useAuth();
  const {setAuth} = useAuth();

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
};

export default Layout;