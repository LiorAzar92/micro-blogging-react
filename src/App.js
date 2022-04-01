import './App.css';
import Home from './pages/Home'
import Profile from './pages/Profile';
import Login from './pages/Login';
import NavBar from './navBar/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';
import localForage from 'localforage';
import { addDoc, collection, doc, getDoc, limit, onSnapshot, orderBy, query, startAfter } from 'firebase/firestore';
import { auth, db } from './firebase-config';
import SignUp from './pages/SignUp';

export const TweetsContext = createContext();
//Provider - root component - Container


function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileURL, setProfileURL] = useState(null);
  const [input, setInput] = useState('');
  const [userName, setUserName] = useState('');
  const [tweets, setTweets] = useState([]);
  const [isPending, SetIsPending] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [lastDoc, setLastDoc] = useState([]);
  const [element, setElement] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [showMyTweets, setShowMyTweets] = useState(false);

  const usersCollection = collection(db, "users");
  const tweetsCollectionRef = collection(db, "tweets");
  const tweetsQuery = query(tweetsCollectionRef, orderBy('date', 'desc'), limit(8));
  const tweetsQueryLoading = query(tweetsCollectionRef, orderBy('date', 'desc'), limit(5), startAfter(lastDoc));

  useEffect(() => {
    updateTweetsDOM(tweetsQuery);
    SetIsPending(false);
  }, [])

  useEffect(() => {
    localForage.getItem('isAuth').then(result => {
      result &&
        setIsAuth(result);
    })
  }, [])

  const updateTweetsDOM = (query) => {
    onSnapshot(query, snapshot => {
      if (snapshot.docs.length) {
        const tweetsResult = snapshot.docs.map(doc => doc.data());
        const lastDoc = snapshot.docs[snapshot.docs.length - 1];
        setTweets([...tweets, ...tweetsResult]);
        setLastDoc(lastDoc);
        setIsLoading(false);
      } else {
        setHasMore(false);
      }
    })
  }
  const fetchMore = (e) => {
    setIsLoading(true);
    updateTweetsDOM(tweetsQueryLoading);
  }

  const enterUserName = () => {
    alert('Please Enter User Name!');
    SetIsPending(false);
  }

  const createTweet = async (tweet) => {
    SetIsPending(true);
    const userRef = doc(db, 'users', auth.currentUser.uid); //doc
    const userSnap = (await getDoc(userRef)).data(); //doc.data()
    tweet.userName = {
      name: userSnap.name ? userSnap.name : enterUserName(),
      id: auth.currentUser.uid,
      profilePicture: userSnap.photo ? userSnap.photo : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnZJpWtmIEj79wTDQ3zF8cUp5kzhwCJIJjuw&usqp=CAU'
    }
    try {
      await addDoc(tweetsCollectionRef, tweet);
      SetIsPending(false);
      setHasMore(true);
    } catch {
      alert('The tweet has not been added!')
    }
  }

  return (
    <>
      {

      }
      <div>
        <TweetsContext.Provider value={{
          tweetsCollectionRef,
          input,
          setInput,
          userName,
          setUserName,
          tweets,
          createTweet,
          isPending,
          isAuth,
          setIsAuth,
          email,
          setEmail,
          password,
          setPassword,
          profileURL,
          setProfileURL,
          usersCollection,
          element,
          setElement,
          fetchMore,
          isLoading,
          hasMore,
          showMyTweets,
          setShowMyTweets,
        }}>
          <Router>
            <NavBar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
            </Routes>
          </Router>
        </TweetsContext.Provider>
      </div>
    </>
  )
}

export default App;