import React from 'react';
import Input from './Input';

const JoinSessionForm = ({ isJoining }) => {
    const inputTextCSS =
        'px-2 py-1 w-96 rounded-md bg-white placeholder bg-indigo-50 mx-2';

    const buttonCSS = 'px-2 py-1 rounded-md bg-indigo-600 text-stone-200';
    return (
        <form hidden={!isJoining}>
            <Input
                placeholder='Enter the URL sent by your friend'
                className={'placeholder:text-slate-500 ' + inputTextCSS}
                type='text'
            />
            <Input className={buttonCSS} type='submit' value='Enter Lobby' />
        </form>
    );
};

export default JoinSessionForm;
