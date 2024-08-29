import { useState } from "react";
import axios from "axios";
import {useCookies} from 'react-cookie';
import { useNavigate} from "react-router-dom";

export const Authentication = () =>{
    return (
        <div className="auth">
            <SignIn/>
            <SignUp/>
        </div>
    );
};

const SignIn = () =>{
    const [username, setUser] = useState("");
    const [password, setPass] = useState("");

    const [_,setCookies] = useCookies(["access_token"])
    const navigate = useNavigate()
    
    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post("http://localhost:3005/authentication/login",{
                username,
                password,
            });

            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID); // userId locally
            navigate("/") // navigate back to the home page
        }catch(err){
            console.error(err);
        }
    }
    return (<AuthTemplate
        username={username}
        setUser={setUser}
        password={password}
        setPass={setPass}
        butLabel="Login"
        onSubmit={onSubmit}
    />);
};

const SignUp = () =>{
    const [username, setUser] = useState("");
    const [password, setPass] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            await axios.post("http://localhost:3005/authentication/reg",{
                username,
                password,
            });
        }catch(err){
            console.error(err);
        }
    };

    return (<AuthTemplate
        username={username}
        setUser={setUser}
        password={password}
        setPass={setPass}
        butLabel="Register"
        onSubmit={onSubmit}
    />);
};

const AuthTemplate = ({username, setUser, password, setPass, butLabel, onSubmit}) => {
    return (<div className="auth-container">
        <form onSubmit={onSubmit}>
            <h1>Sign In</h1>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" onChange={(event) =>setUser(event.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="text" id="password" onChange={(event) => setPass(event.target.value)}/>
            </div>
            <button type="submit">{butLabel}</button>
        </form>
    </div>);
}