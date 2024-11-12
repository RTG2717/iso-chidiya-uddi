import { useState } from 'react';
import Input from './Input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const baseURL = import.meta.env.VITE_API_URL;

const JoinSessionForm = ({ isJoining }) => {
    const [sessionLink, setSessionLink] = useState('second');
    const inputTextCSS =
        'px-2 py-1 w-24 rounded-md bg-white placeholder bg-indigo-50 mx-2';

    const buttonCSS = 'px-2 py-1 rounded-md bg-indigo-600 text-stone-200';

    const navigate = useNavigate();

    const handleLinkInput = (e) => {
        setSessionLink(e.target.value);
    };

    const verifyCode = (e) => {
        e.preventDefault();

        const sessionCode = e.target[0].value;
        axios
            .get(`${baseURL}/api/sessions_by_code/${sessionCode}`)
            .then((res) => {
                if (res.status === 200) {
                    navigate(`/join-lobby`, { state: { session: res.data } });
                }
            })
            .catch((err) => {
                console.error(
                    'Error Occurred while trying to fetch session:',
                    err
                );
            });
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
        <form hidden={!isJoining} onSubmit={verifyCode}>
            <Input
                placeholder='Enter Code'
                className={'placeholder:text-slate-500 ' + inputTextCSS}
                type='text'
                onChange={handleLinkInput}
            />
            <Input
                // onClick={verifyLink}
                className={buttonCSS}
                type='submit'
                value='Enter Lobby'
            />
        </form>
    );
};

export default JoinSessionForm;
