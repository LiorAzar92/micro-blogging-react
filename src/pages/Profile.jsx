import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { TweetsContext } from '../App';
import { auth, db } from '../firebase-config';
import { MdUploadFile } from 'react-icons/md'
import './Profile.css'

const Profile = () => {
    const { userName, setUserName, profileURL, setProfileURL, tweetsCollectionRef } = useContext(TweetsContext);
    const navigate = useNavigate();

    const storage = getStorage();

    const onSubmitName = e => {
        e.preventDefault()
        if (!userName) {
            alert('Please add a name');
            return
        }
        const userRef = doc(db, 'users', auth.currentUser.uid);
        updateDoc(userRef, {
            name: userName
        })
        updateTweetsList(userName, 'name');
        navigate('/');
    }

    const changePhotoToURL = async (e) => { //profileState update
        const file = e.target.files[0];
        const imageRef = ref(storage, file.name);
        await uploadBytes(imageRef, file).then(() => {
            console.log('uploaded file');
        }).catch(err => {
            console.log(err);
        })
        await getDownloadURL(imageRef).then(url => {
            setProfileURL(url);
        }).catch(err => {
            console.log(err);
        })
    }

    const onSubmitPhoto = async e => {
        console.log(profileURL)
        e.preventDefault()
        if (!profileURL) {
            alert('Please add a Photo');
            return;
        }
        const updateRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(updateRef, {
            photo: profileURL,
        })
        updateTweetsList(profileURL, 'picture');
        navigate('/');
    }

    const updateTweetsList = async (value, key) => {
        const tweets = await getDocs(tweetsCollectionRef);
        tweets.forEach(tweet => {
            if (tweet.data().userName.id === auth.currentUser.uid) {
                const tweetRef = doc(db, 'tweets', tweet.id)
                if (key === 'name') {
                    updateDoc(tweetRef, {
                        userName: {
                            id: tweet.data().userName.id,
                            name: value,
                            profilePicture: tweet.data().userName.profilePicture
                        }
                    })
                } else {
                    updateDoc(tweetRef, {
                        userName: {
                            id: tweet.data().userName.id,
                            name: tweet.data().userName.name,
                            profilePicture: value
                        }
                    })
                }
            }
        });
    }

    useEffect(() => {
        getProfilePic()
    }, [])

    const getProfilePic = async () => {
        const users = await getDocs(collection(db, 'users'));
        users.forEach(doc => {
            if (doc.data().id === auth.currentUser.uid) {
                setProfileURL(doc.data().photo)
            }
        })
    }

    return (
        <div className='c-profile'>
            <p>
                Profile Update
            </p>
            <form onSubmit={onSubmitName}>
                <label htmlFor="name">User Name</label>
                <input type="text" value={userName} onChange={e => setUserName(e.target.value)} />
                <button type='submit'>Save</button>
            </form>
            <form onSubmit={onSubmitPhoto}>
                <div className='pic-update'>
                    <label className="custom-file-upload">
                        <input type="file" onChange={changePhotoToURL} />
                        <MdUploadFile />
                        <span className='upload'>Upload Profile Picture</span>
                    </label>
                    <img src={profileURL ? profileURL : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnZJpWtmIEj79wTDQ3zF8cUp5kzhwCJIJjuw&usqp=CAU'} className='profile-pic' alt="profilePic" />
                </div>
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default Profile