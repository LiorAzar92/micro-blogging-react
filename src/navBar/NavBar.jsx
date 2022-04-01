import { useContext } from "react";
import { TweetsContext } from "../App";
import { Nav, NavLink, NavMenu } from "./NavBarElements";
import { signOut } from 'firebase/auth';
import { auth } from "../firebase-config";
import localForage from "localforage";
// import { useNavigate } from "react-router";

const NavBar = () => {
    const { isAuth, setIsAuth, setShowMyTweets } = useContext(TweetsContext);

    const signUserOut = () => {
        localForage.setItem('isAuth', false);
        setIsAuth(false);
        setShowMyTweets(false);
        signOut(auth).then(() => {
            alert('Signed Out!')
        })
    }

    return (
        <>
            <Nav>
                <NavMenu>
                    {isAuth &&
                        <>
                            <NavLink to='/'>
                                <p>Home</p>
                            </NavLink>
                            <NavLink to="/profile">
                                <p>Profile</p>
                            </NavLink>
                        </>
                    }
                    {
                        !isAuth ?
                            <NavLink to="/login">
                                <p>Login</p>
                            </NavLink> :
                            <NavLink onClick={signUserOut} to='/login' >
                                <p>Logout</p>
                            </NavLink>
                    }
                    {
                        !isAuth &&
                        <NavLink to="/signup">
                            <p>Sign Up</p>
                        </NavLink>
                    }
                </NavMenu>
            </Nav>
        </>
    )
}

export default NavBar
