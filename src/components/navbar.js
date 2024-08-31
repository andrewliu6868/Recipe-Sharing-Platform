import {Link} from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./style.css"

export const Navbar = () =>{
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () =>{
        // clear cookies and local storage, direct back to login
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/auth");
    }
    return (
        <div className="navbar">
            <ul>
                <li>
                    <Link to="/"> Home </Link>
                </li>
                <li>
                    <Link to="/create">Create Recipe</Link>
                </li>
                <li>
                    <Link to="/save">View Recipes</Link>
                </li>
                <li>
                    {!cookies.access_token ? (<Link to="/auth"> Sign In / Sign Up </Link>) : (<button onClick={logout}>Logout</button>)}
                </li>
            </ul>
        </div>
    );
};