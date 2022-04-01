import { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { TweetsContext } from '../App'
import Form from '../components/Form'
import TweetsList from '../components/TweetsList'
import './Home.css'

const Home = () => {
    const { isAuth, fetchMore, element, setElement, isLoading, hasMore, showMyTweets, setShowMyTweets } = useContext(TweetsContext);

    const navigate = useNavigate();

    const loader = useRef(fetchMore)

    const observer = useRef(new IntersectionObserver(entries => {
        const first = entries[0];
        if (first.isIntersecting) {
            loader.current();
        }
    }, { threshold: 1 }))

    useEffect(() => {
        loader.current = fetchMore;
    }, [fetchMore])

    useEffect(() => {
        const currentElement = element;
        const currentObserver = observer.current;
        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        }
    }, [element])

    useEffect(() => {
        !isAuth && navigate('/login');
    })

    const checkboxChange = () => {
        setShowMyTweets(!showMyTweets)
    }

    return (
        <div className="c-home">
            <Form />
            <div className='checkbox'>
                <button onClick={checkboxChange} className="filter-btn">{showMyTweets ? 'My Tweets' : 'All Tweets'}</button>
            </div>
            <TweetsList />
            {
                !isLoading && hasMore &&
                < div ref={setElement} className="scroller" ></div>
            }
        </div >
    )
}

export default Home;
