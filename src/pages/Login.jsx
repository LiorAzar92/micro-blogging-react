import './Login.css';
import { auth, provider } from '../firebase-config';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { TweetsContext } from '../App';
import localForage from 'localforage';
import { useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { setDoc, getDocs, doc } from 'firebase/firestore';

const Login = () => {
    const { setIsAuth, email, setEmail, password, setPassword, isAuth, usersCollection } = useContext(TweetsContext);

    const navigate = useNavigate();

    useEffect(() => {
        isAuth && navigate('/');
    })

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then(() => {
            localForage.setItem('isAuth', true);
            setIsAuth(true);
            addUserToDb(auth.currentUser.uid);
            navigate('/');
            console.log(auth.currentUser.photoURL);
        })
    }

    const signInWithEmail = () => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
            localForage.setItem('isAuth', true);
            setIsAuth(true);
            addUserToDb();
            setEmail('');
            setPassword('');
            navigate('/');
        }).catch(() => {
            alert('User does not exist!');
        })

    }

    const addUserToDb = async () => {
        const users = await getDocs(usersCollection);
        let isUserMatching = false;
        users.forEach(doc => {
            if (doc.data().id === auth.currentUser.uid) {
                isUserMatching = true;
            }
        })
        if (isUserMatching) {
            return;
        } else {
            const newUser = {
                id: auth.currentUser.uid,
                name: auth.currentUser.displayName || '',
                email: auth.currentUser.email,
                photo: auth.currentUser.photoURL || ''
            }
            await setDoc(doc(usersCollection, auth.currentUser.uid), newUser); //adding user
        }
    }

    return (
        <div className='c-login'>
            <div className='ggl-container'>
                <div className='google'>
                    <p>Sign in with Google</p>
                    <div className='ggl-btn'> <button onClick={signInWithGoogle}><FcGoogle /> <strong>Google</strong></button></div>
                </div>
                <p>Sign in with Email</p>
                <div className='login-container'>
                    <div className='email-container'>
                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email"
                            placeholder='Email' />
                    </div>
                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='Password' />

                    <button className='sign-in-btn' onClick={signInWithEmail}>Sign In</button>
                </div>
            </div>
        </div >

    )
}

export default Login;
