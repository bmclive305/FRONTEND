import React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/slices/userSlice";
import { AppDispatch } from "../../redux/Store";
import "./Navbar.css";

const Navbar: React.FC = () => {

    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    

    return (
        <div id="navbarContainer">
            <div id="logo">Logo</div>
            <div id="navbarLinksContainer">
                <div id="homeLink"
                    onClick={() => navigate("/home")}
                >
                    Home
                </div>
                <div id="profileLink"
                    onClick={() => navigate("/profile")}
                >
                    Profile
                </div>
                <div id="cartLink"
                    onClick={() => navigate("/cart")}
                >
                    Cart
                </div>
                <div id="logoutLink"
                    onClick={() => dispatch(logoutUser())}
                >
                    Logout
                </div>
            </div>
        </div>
    )
}

export default Navbar;