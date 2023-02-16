import React from 'react';
import "./SideCard.css";

interface SideCardProps {
    setCurrentProfileCardProp: React.Dispatch<React.SetStateAction<string>>;
    currentProfileCardProp: string;
}

const SideCard: React.FC<SideCardProps> = (props) => {

    const {currentProfileCardProp, setCurrentProfileCardProp} = props;

    return (
        <div className="sideCardContainer">
            <div className="card">
                <div className={`cardButton ${currentProfileCardProp === "Information" ? "selected" : ""}`} 
                    onClick={() => setCurrentProfileCardProp("Information")}>
                        Information
                </div>
                <div className={`cardButton ${currentProfileCardProp === "Orders" ? "selected" : ""}`} 
                    onClick={() => setCurrentProfileCardProp("Orders")}>
                        Orders
                </div>
                <div className={`cardButton ${currentProfileCardProp === "WishList" ? "selected" : ""}`} 
                    onClick={() => setCurrentProfileCardProp("WishList")}>
                        WishList
                </div>
            </div>
        </div>
    );
}

export default SideCard;