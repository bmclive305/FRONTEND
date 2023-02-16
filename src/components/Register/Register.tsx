import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from "../../models/User";
import { AppDispatch, RootState } from "../../redux/Store";
import { registerUser, setUser } from '../../redux/slices/userSlice';
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register: React.FC = () => {
    const [formValues, setFormValues] = useState<User>({
        id: "0",
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        userRole: ''
    });
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const userState = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if(userState.isLoggedIn) navigate('/home');
    },[userState.isLoggedIn]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(formValues.password !== confirmPassword) {
            setPasswordsMatch(false);
            return;
        }

        try {
            dispatch(setUser(formValues));
            await dispatch(registerUser(formValues)).then(() => {navigate("/")});
        } catch (error) {
            console.error(error);
        }
    };

    const handlePasswordMatch = () => {
        if(formValues.password !== confirmPassword) {
            setPasswordsMatch(false);
        } else {
            setPasswordsMatch(true);
        }
    }

    return (
        <div id="registerFormContainer">
            <form id="registerForm" onSubmit={handleSubmit}>
                <h1>Register</h1>
                <label htmlFor="firstName">First Name:</label>
                <input type="text" 
                    id="firstName" 
                    value={formValues.firstName} 
                    onChange={e => setFormValues({ ...formValues, firstName: e.target.value })} 
                    placeholder="First Name"
                    required
                />

                <label htmlFor="lastName">Last Name:</label>
                <input type="text" 
                    id="lastName" 
                    value={formValues.lastName} 
                    onChange={e => setFormValues({ ...formValues, lastName: e.target.value })} 
                    placeholder="Last Name"
                    required
                />

                <label htmlFor="email">Email:</label>
                <input type="email" 
                    id="email" value={formValues.email} 
                    onChange={e => setFormValues({ ...formValues, email: e.target.value })} 
                    placeholder="Email"
                    required
                />

                <label htmlFor="password" 
                    style={passwordsMatch ? {color: 'black'} : {color: 'red'}}>
                        {passwordsMatch ? "Password:" : "Passwords do not match"}
                </label>
                <input type="password" 
                    id="password" 
                    value={formValues.password} 
                    onChange={e => setFormValues({ ...formValues, password: e.target.value })} 
                    placeholder="Password"
                    required
                />

                <label htmlFor="confirmPassword"
                    style={passwordsMatch ? {color: 'black'} : {color: 'red'}}>
                    {passwordsMatch ? "Confirm Password:" : "Passwords do not match"}
                </label>
                <input type="password" 
                    id="confirmPassword" 
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)}
                    onBlur={() => handlePasswordMatch()}
                    placeholder="Confirm Password"
                    required
                />

                <div className="registerFormSubmit">
                    <button id="registerButton" type="submit">Submit</button>
                    <button id="linkButtonToLogin" onClick={() => navigate("/")}>Login</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
