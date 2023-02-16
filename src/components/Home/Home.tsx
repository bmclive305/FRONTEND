import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/slices/userSlice";
import { AppDispatch, RootState } from "../../redux/Store";
import Navbar from "../Navbar/Navbar";



export const Home: React.FC= ()=>{
    
    const userState = useSelector((state:RootState) => state.user);
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if(!userState.isLoggedIn) navigate('/');
    },[userState.isLoggedIn]);
    
    return (
        <>
            <Navbar />
            <div className="HomeRootContainer">
                <h1 className="HomePageHeader">Hello {userState.user ?
                    userState.user.firstName + ","
                    : " " }
                </h1>
                <button onClick={() => { dispatch(logoutUser()) }}>LogOut</button>
            </div> 
        </>
    )
}

export default Home;