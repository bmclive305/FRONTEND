import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from "../../models/User";
import { AppDispatch, RootState } from "../../redux/Store";
import { login } from "../../redux/slices/userSlice";
import './Login.css';

const Login: React.FC = () => {

    const navigate = useNavigate();
    const userState = useSelector((state: RootState) => state.user);
    const dispatch: AppDispatch = useDispatch();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {
        if(userState.isLoggedIn) {navigate("/home")};
    }, [userState.isLoggedIn]);

    const handleLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const user: LoginUser = {
            email: email,
            password: password
        }
        dispatch(login(user)).then(() => {
            setEmail("");
            setPassword("");
        });
    };

    return (
        <div className="login">
            <form className="credentialsForm" name="loginForm" id="auth" onSubmit={handleLogin}>
                <h1>Login</h1>

                {userState.loginError ? <h3>Invalid Email / Password</h3> : ""}

                <label>Email:</label>
                <input type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                    required
                />

                <div className="passwordContainer">
                    <label>Password:</label>
                    <input type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                        required
                    />

                    <input
                        type="checkbox"
                        id="passwordToggle"
                        name="passwordToggle"
                        checked={showPassword}
                        onChange={() => {setShowPassword(!showPassword)}}
                    />
                </div>

                <div className='credentialsFormSubmit'>
                    <button id="credentialsBtn">Login</button>
                    <button className="registerLinkFromLogin" onClick={() => navigate("/register")}>Register</button>
                </div>
            </form>
        </div>
    )
}

export default Login;