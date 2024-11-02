import { useState } from 'react';
import { Link } from 'react-router-dom';
import JoinSessionForm from '../JoinSessionForm';
import Input from '../Input';
import AppTitle from '../AppTitle';
import PageContainer from '../PageContainer';

const Home = () => {
    const [isJoining, setIsJoining] = useState(false);

    const toggleLinkField = (e) => {
        e?.preventDefault();

        setIsJoining(!isJoining);
    };
    return (
        <PageContainer>
            <AppTitle />
            <div className='text-3xl text-center'>Home Page</div>
            <div className='mt-10 text-center'>
                <Link to='/create-new-lobby'>
                    <Input type='button' value='Create a new Lobby' />
                </Link>
            </div>
            <div className='mt-4 flex-1 text-center'>
                <JoinSessionForm isJoining={isJoining} />
                <Input
                    onClick={toggleLinkField}
                    type='button'
                    className='mt-2'
                    value={isJoining ? 'Close' : 'Join an exiting Lobby'}
                />
            </div>
        </PageContainer>
    );
};

export default Home;
