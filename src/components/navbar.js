import {Link} from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

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
            <Link to="/"> Home </Link>
            {!cookies.access_token ? (<Link to="/auth"> Sign In / Sign Up </Link>) : (<button onClick={logout}>Logout</button>)}
            <Link to="/create">Create Recipe</Link>
            <Link to="/save">View Recipes</Link>
        </div>
    );
};