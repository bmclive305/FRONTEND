import { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

import AuthService from "./services/auth.service";
import IUser from './types/user.type';

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import EventBus from "./common/EventBus";
import { Avatar, Dropdown, Navbar } from "flowbite-react";

type Props = {};

type State = {
  showModeratorBoard: boolean,
  showAdminBoard: boolean,
  currentUser: IUser | undefined
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
<Navbar
className=""
  fluid={true}
  rounded={true}
>
  <Navbar.Brand href={"/"}>
    <img
      src="/logo.png"
      className="mr-3 h-12"
      alt="BMC Logo"
    />
  </Navbar.Brand>
  <div className="flex md:order-2">
  {currentUser && (
    <Dropdown
    arrowIcon={false}
    inline={true}
    label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true}/>}
  >
    <Dropdown.Header>
      <span className="block text-sm">
        {currentUser.username}
      </span>
      <span className="block truncate text-sm font-medium">
        {currentUser.email}
      </span>
    </Dropdown.Header>
    <Dropdown.Item>
      <a href={"/profile"} >
        Profile
      </a>
    </Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item>
      <a href="/login" className="nav-link" onClick={this.logOut}>
      Sign out
      </a>
    </Dropdown.Item>
  </Dropdown>
  )}
  
  {!currentUser && (
    <div className="self-center flex dark:text-white">
    <a
    href={"/login"}
  >
    Login/Register
  </a>     
    </div>

    // <Navbar.Collapse>
    //   <Navbar.Link
    //     href={"/login"}
    //   >
    //     Login
    //   </Navbar.Link>
    //   <Navbar.Link
    //     href={"/register"}
    //   >
    //     Register
    //   </Navbar.Link>      
    // </Navbar.Collapse>

  )}
    
    <Navbar.Toggle />
  </div>
  <Navbar.Collapse>
    <Navbar.Link
      href={"/home"}
      active={true}
    >
      Home
    </Navbar.Link>
    
    {showModeratorBoard && (
      <Navbar.Link href={"/mod"}>
        Mod
      </Navbar.Link> 
        )}

    {showAdminBoard && (
      <Navbar.Link href={"/admin"}>
        Admin
      </Navbar.Link> 
        )}

    {currentUser && (
      <Navbar.Link href={"/user"}>
        User
      </Navbar.Link>
        )}
  </Navbar.Collapse>
</Navbar>
        

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;

{/* <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            BMC
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Mod
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav> */}