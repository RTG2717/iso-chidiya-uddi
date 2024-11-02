import { useState } from 'react';
import Input from './Input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JoinSessionForm = ({ isJoining }) => {
    const [sessionLink, setSessionLink] = useState('second');
    const inputTextCSS =
        'px-2 py-1 w-96 rounded-md bg-white placeholder bg-indigo-50 mx-2';

    const buttonCSS = 'px-2 py-1 rounded-md bg-indigo-600 text-stone-200';

    const navigate = useNavigate();

    const handleLinkInput = (e) => {
        setSessionLink(e.target.value);
    };

    const verifyLink = (e) => {
        e.preventDefault();
        const sessionID = new URLSearchParams(sessionLink?.split('?')[1])?.get(
            'session'
        );
        axios
            .get(
                [import.meta.env.VITE_API_URL, 'api/sessions', sessionID].join(
                    '/'
                )
            )
            .then((res) => {
                // if response is 200 then redirect to the url
                if (res.status === 200) {
                    console.log('link', res.data.sessionID);
                    navigate(`/track?session=${res.data.sessionID}`);
                }
            })
            .catch((error) => {
                console.error(
                    'Error occurred trying to fetch sessionID: ',
                    error
                );
            });
        console.log('sessionLink', sessionID);
    };
    return (
        <form hidden={!isJoining}>
            <Input
                placeholder='Enter the URL sent by your friend'
                className={'placeholder:text-slate-500 ' + inputTextCSS}
                type='text'
                onChange={handleLinkInput}
            />
            <Input
                onClick={verifyLink}
                className={buttonCSS}
                type='submit'
                value='Enter Lobby'
            />
        </form>
    );
};

export default JoinSessionForm;
