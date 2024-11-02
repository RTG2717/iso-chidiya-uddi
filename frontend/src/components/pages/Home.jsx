import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JoinSessionForm from '../JoinSessionForm';
import Input from '../Input';
import AppTitle from '../AppTitle';
import PageContainer from '../PageContainer';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const Home = () => {
    const navigate = useNavigate();
    const [isJoining, setIsJoining] = useState(false);

    const toggleLinkField = (e) => {
        e?.preventDefault();

        setIsJoining(!isJoining);
    };

    const handleSessionCreation = async () => {
        console.log('creating new session');

        axios.post(`${baseURL}/api/sessions`).then((res) => {
            console.log(res.data);
            navigate('/create-new-lobby', { state: { session: res.data } });
        });
    };
    return (
        <PageContainer>
            <AppTitle />
            <div className='text-3xl text-center'>Home Page</div>
            <div className='mt-10 text-center'>
                <Input
                    type='button'
                    value='Create a new Lobby'
                    onClick={handleSessionCreation}
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
