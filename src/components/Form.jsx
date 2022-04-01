import './Form.css'
import { useContext } from 'react';
import { TweetsContext } from '../App';

const Form = () => {
    const { input, setInput, createTweet, isPending } = useContext(TweetsContext);

    const onSubmit = e => {
        e.preventDefault()
        if (!input) {
            alert('Please add a tweet')
            return
        }
        createTweet({ content: input, userName: '', date: new Date().toISOString() })
        setInput('')
    }

    return (
        <form className='c-form' onSubmit={onSubmit}>
            <textarea placeholder='What you have in mind...' value={input} onChange={(e) => {
                setInput(e.target.value)
            }} />
            <div className='submit-row'>
                {
                    input.length > 140 &&
                    <div className='error'>
                        The tweet can't contain more than 140 chars.
                    </div>
                }
                <div className='btn'>
                    {
                        !isPending ?
                            <button type='submit' disabled={input.length > 140} >Tweet</button> :
                            <button type='submit' className='add-btn' disabled>Adding Tweet...</button>
                    }
                </div>
            </div>
        </form>
    )
}

export default Form
