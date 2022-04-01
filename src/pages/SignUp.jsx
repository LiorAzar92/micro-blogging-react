
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { useContext } from 'react';
import { TweetsContext } from '../App';
import { auth } from '../firebase-config';
import './SignUp.css';

const SignUp = () => {
    const { email, setEmail, password, setPassword, } = useContext(TweetsContext);

    const signUpWithEmail = e => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password).then(user => {
            console.log(user);
            setEmail('');
            setPassword('');
            alert('User Created!')
        }).catch(err => {
            console.log(err);
            alert('Error!')
        })
    }

    return (
        <div className="c-signup">
            <form className='email' onSubmit={signUpWithEmail}>
                <p>Sign Up with Email</p>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' />
                </div>
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp
