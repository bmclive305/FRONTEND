import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthState } from "../../models/AuthState";
import { remoteUrl } from "../../models/URL";
import { LoginUser, User } from "../../models/User";

const user: User = {
    id: "0",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userRole: ""
}

const initialState: AuthState = {
    isLoggedIn: false,
    registeredError: false,
    loginError: false,
    user,
    isRegistered: false,
    isLoading: false
};

export const registerUser = createAsyncThunk(
    "register",
    async (userData: User, thunkAPI) => {
        console.log("This is from the AsyncThunk", userData);
        try {
            const res = await axios.post(`${remoteUrl}/users`, userData);
            console.log(res.data);
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Email Already Exist');
        }
    }
);

export const login = createAsyncThunk(
    'login',
    async (user: LoginUser, thunkAPI) => {
        try {
            const res = await axios.post(`${remoteUrl}/login`, user);
            console.log(res.data);
            
            localStorage.setItem("token", res.data["token"]);
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Incorrect username or password');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'logout',
    async () => {
        console.log("Logged Out");
        try{    
            localStorage.removeItem("token");
        } catch(e) {
           console.error(e);
        }
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            return state;
        }
    },
    extraReducers: (builder) => {

        // Register Cases
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading = true;
            return state;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.registeredError = false;
            return state;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.registeredError = true;
            return state;
        });

        // Login Cases
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.loginError = false;
            state.user = action.payload.user.Items[0];
            return state;
        });
        builder.addCase(login.rejected, (state) => {
            state.isLoggedIn = false;
            state.loginError = true;
            state.user = user;
            return state
        });

        // Logout Cases
        builder.addCase(logoutUser.fulfilled, (state,action) => {
            state.isLoggedIn = false;
            state.user = user;
            return state;
        });
    }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
