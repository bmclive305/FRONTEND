import React, { useEffect, useState } from 'react';
import Navbar from "../Navbar/Navbar";
import Information from "./ProfileCard/Information/Information";
import Orders from "./ProfileCard/Orders/Orders";
import WishList from "./ProfileCard/WishList/WishList";
import SideCard from "./SideCard/SideCard";
import "./Profile.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {

    const [currentProfileCard, setCurrentProfileCard] = useState<string>("Information");
    const navigate = useNavigate();
    const userState = useSelector((state:RootState) => state.user);

    useEffect(() => {
        if(!userState.isLoggedIn) navigate('/');
    },[userState.isLoggedIn]);

    let cardToRender;
    switch (currentProfileCard) {
        case "Information":
            cardToRender = <Information />
            break;
        case "Orders":
            cardToRender = <Orders />
            break;
        case "WishList":
            cardToRender = <WishList />
            break;
    }

    return (
        <>
            <Navbar />
            <div id="profilePageContainer">
                <SideCard 
                    setCurrentProfileCardProp={setCurrentProfileCard} 
                    currentProfileCardProp={currentProfileCard}     
                />
                <div id="cardToRenderContainer">
                    {cardToRender}
                </div>
            </div>
        </>
    );
}

export default Profile;