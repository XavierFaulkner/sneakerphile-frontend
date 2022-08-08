import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthProvider';
import RequireAuth from './components/RequireAuth';
import Login from "./components/Login"
import Layout from "./components/Layout"
import Feed from './components/Feed';
import Missing from "./components/Missing"
import Register from "./components/Register"
import Unauthorized from './components/Unauthorized';
import Admin from './components/Admin';
import './components/styles.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="feed" element={<Feed />} />

        {/* private routes */}
        <Route element={<RequireAuth allowedRoles={["ROLE_USER"]}/>}>
          <Route path="feed" element={<Feed />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);