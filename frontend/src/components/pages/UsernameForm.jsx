import { useEffect, useState } from 'react';
import Input from '../Input';
import { useLocation, useNavigate } from 'react-router-dom';
import AppTitle from '../AppTitle';
import PageContainer from '../PageContainer';
import useStore from '../../store';
import axios from 'axios';

const UsernameForm = () => {
    const navigate = useNavigate();
    const { apiURL, session, setSession } = useStore();

    const handleUpdateUserName = (e) => {
        console.log('name changed', e.target.value);
        setUserName(e.target.value);
    };
    const submitUserName = (e) => {
        e.preventDefault();

        // add script to call a post to submit username to backend
        navigate('/track');
    };

    useEffect(() => {
        const getSession = async () => {
            let res = null;
            let sessionCode = null;
            if (sessionCode) {
                // change session to sessionCode and add the var to store.
                // logic here if sessionCode is available.
            } else {
                res = await axios.post(`${apiURL}/api/sessions/`);
            }
            return res.data;
        };
        getSession().then((result) => {
            setSession(result?.sessionID);
            console.log('data', result);
        });
    }, []);
    return (
        <>
            <form>
                <PageContainer>
                    <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                        <AppTitle />
                    </div>
                    <div className='mt-10 text-center text-2xl/9'>
                        <label htmlFor='username'></label>
                        Display Username
                    </div>
                    <div className='mt-2 flex justify-center'>
                        <Input
                            id='username'
                            name='username'
                            autoComplete='username'
                            placeholder='Enter your username'
                            className='flex w-min '
                            type='text'
                            onChange={handleUpdateUserName}
                        />
                    </div>
                    <div className=' mt-4 text-center justify-center'>
                        <Input
                            onClick={submitUserName}
                            type='submit'
                            className='transition-all shadow-inner px-4 rounded-lg'
                            value='Enter as User'
                        />
                        <Input
                            type='button'
                            onClick={() => navigate(-1)}
                            value='Back'
                            className='ml-2'
                        />
                    </div>
                    <div className='text-center'>
                        {session ? session : 'No session found yet'}
                    </div>
                </PageContainer>
            </form>
        </>
    );
};

export default UsernameForm;
