import Tweet from './Tweet'
import './TweetsList.css'
import { createContext, useContext } from 'react'
import { TweetsContext } from '../App';
import { nanoid } from 'nanoid';
import { auth } from '../firebase-config';


export const TweetContext = createContext();

const TweetsList = () => {
    const { tweets, showMyTweets } = useContext(TweetsContext);

    return (
        <div className='c-tweets-list'>
            {tweets.map(tweet =>
                showMyTweets ?
                    tweet.userName.id === auth.currentUser.uid &&
                    <TweetContext.Provider value={{ tweet }}
                        key={nanoid()}>
                        <Tweet key={nanoid()} />
                    </TweetContext.Provider> :
                    <TweetContext.Provider value={{ tweet }}
                        key={nanoid()}>
                        <Tweet key={nanoid()} />
                    </TweetContext.Provider>
            )}
        </div>
    )
}

export default TweetsList
