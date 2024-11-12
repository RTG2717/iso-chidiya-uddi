import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JoinSessionForm from '../JoinSessionForm';
import Input from '../Input';
import AppTitle from '../AppTitle';
import PageContainer from '../PageContainer';

const Home = () => {
    const navigate = useNavigate();
    const [isJoining, setIsJoining] = useState(false);

    const toggleLinkField = (e) => {
        e?.preventDefault();

        setIsJoining(!isJoining);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        navigate('/create-new-lobby');
    };
    return (
        <PageContainer>
            <AppTitle />
            <div className='text-3xl text-center'>Home Page</div>
            <div className='mt-10 text-center'>
                <Input
                    type='button'
                    onClick={handleCreate}
                    value='Create a new Lobby'
                />
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
