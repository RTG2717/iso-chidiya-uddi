import useStore from '../../store';
import PageContainer from '../PageContainer';
import Slider from '../slider';
import Timer from '../timer';
import Textbox from '../textbox';
import PrivateDisplay from '../PrivateDisplay';

const Playground = () => {
    const { session, client } = useStore();

    return (
        <PageContainer>
            <PrivateDisplay>
                <div className='text-center'>
                    {session ? session.sessionID : null}
                </div>
                <div className='text-center'>
                    {client ? client.clientID : null}
                </div>
            </PrivateDisplay>
        </PageContainer>
    );
};

export default Playground;
