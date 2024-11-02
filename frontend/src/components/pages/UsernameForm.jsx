import { useState } from 'react';
import Input from '../Input';
import { useLocation, useNavigate } from 'react-router-dom';
import AppTitle from '../AppTitle';
import PageContainer from '../PageContainer';

const UsernameForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const session = location.state.session;

    const handleUpdateUserName = (e) => {
        console.log('name changed', e.target.value);
        setUserName(e.target.value);
    };
    const submitUserName = (e) => {
        e.preventDefault();

        // add script to call a post to submit username to backend
        navigate('/track');
    };
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
                </PageContainer>
            </form>
        </>
    );
};

export default UsernameForm;
