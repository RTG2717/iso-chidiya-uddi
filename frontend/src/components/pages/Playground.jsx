import useStore from '../../store';
import PageContainer from '../PageContainer';

const Playground = () => {
    const { session, client } = useStore();

    return (
        <PageContainer>
            PlayGround
            {localStorage.sl ? (
                <>
                    <div className='text-center'>{session}</div>
                    <div className='text-center'>
                        {client ? client.clientID : null}
                    </div>
                </>
            ) : null}
        </PageContainer>
    );
};

export default Playground;
