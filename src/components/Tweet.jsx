import { useContext } from 'react'
import { TweetsContext } from '../App';
import './Tweet.css'
import { TweetContext } from './TweetsList'


const Tweet = () => {
    const { tweet } = useContext(TweetContext);
    const { showMyTweets } = useContext(TweetsContext);

    return (
        <div className='c-tweet' style={showMyTweets ? { backgroundColor: 'rgb(206, 212, 218)' } : { backgroundColor: '#343A40' }}>
            <div className='name-date'>
                <div className='profile'>
                    <img src={tweet.userName.profilePicture} alt="profile" />
                    <div className='name' style={{ marginLeft: tweet.userName.profilePicture ? '10px' : '20px' }}>
                        {tweet.userName.name}
                    </div>
                </div>
                <div className='date'>
                    {tweet.date}
                </div>
            </div>
            <div className='content' style={showMyTweets ? { color: '#6C757D' } : { color: 'white' }}>
                {tweet.content}
            </div>
        </div>
    )
}

export default Tweet
