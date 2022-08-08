import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import useAuth from "../hooks/useAuth";

export default function Header() {
    const {auth} = useAuth();
    const {setAuth} = useAuth();
    const [isActive, setIsActive] = useState(false)

    const logout = () => {
        setAuth(null);
      }

    const setActive = () => {
        setIsActive(!isActive)
    }

    return (
        <header>
            {/* <nav>
                Sneakerphile
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
        </nav> */}
        <div className={`dropdown ${isActive ? 'active' : ''}`}>
            <button id='navLink' onClick={setActive}>Sneakerphile</button>
            <div className='dropdown-menu' onClick={setActive}>
                {auth?.user
                    ? (
                        <>
                            <Link to="/">Home</Link>
                            <button onClick={logout}>logout</button>
                        </>
                    )
                    : (
                        <>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Login</Link>
                        </>
                    )
                }
            </div>
        </div>
        </header>
    )
}
