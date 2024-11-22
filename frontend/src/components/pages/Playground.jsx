/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import {
    useAPIStore,
    useSessionStore,
    usePlaygroundStore,
    useUserStore,
} from '../../store/stores';
import PageContainer from '../PageContainer';
import Slider from '../slider';
import Timer from '../timer';
import Textbox from '../textbox';
import PrivateDisplay from '../PrivateDisplay';

const Playground = () => {
    const { session, setSession } = useSessionStore();
    const { wsURL } = useAPIStore();
    const { client } = useUserStore();
    const { sliderValue, setSliderValue } = usePlaygroundStore();
    const [connecting, setConnecting] = useState(true);
    const [ws, setWs] = useState(null);
    const [fingers, setFingers] = useState(() => new Map());
    const [myFinger, setMyFinger] = useState(new Map());

    const connectWS = async () => {
        const urlWithParams = `${wsURL}?sessionID=${session.sessionID}&clientID=${client.clientID}`;
        const socket = new WebSocket(urlWithParams);

        socket.onopen = () => {
            console.log('Welcome to the websocket server');
            setConnecting(false);
        };

        socket.onerror = () => {
            console.log('Failed to connect. Please check connection');
        };

        socket.onclose = () => {
            console.log('Connection closed');
            setSession({
                ...session,
                users: session.users.filter(
                    (user) => user.id !== client.clientID
                ),
            });
            ws.send(JSON.stringify({ type: 'removeUser' }));
        };

        return socket;
    };

    useEffect(() => {
        if (!ws || !client.clientID || ws.readyState !== WebSocket.OPEN) return;
        console.log('sending finger change');
        ws?.send(
            JSON.stringify({
                type: 'fingerChange',
                clientID: client.clientID,
                fingerUp: myFinger.get(client.clientID),
            })
        );
    }, [myFinger]);

    useEffect(() => {
        if (sliderValue >= 70 && !myFinger.get(client.clientID)) {
            const newFinger = new Map(myFinger);
            newFinger.set(client.clientID, true);
            setMyFinger(newFinger);
            console.log(`finger goes up`, myFinger);
        } else if (sliderValue < 69 && myFinger.get(client.clientID)) {
            const newFinger = new Map(myFinger);
            newFinger.set(client.clientID, false);
            setMyFinger(newFinger);
            console.log(`finger goes down`, myFinger);
        }
    }, [sliderValue]);

    useEffect(() => {
        const setupWebSocket = async () => {
            const socket = await connectWS();
            if (!socket) return;

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log('message received:', data);

                switch (data.type) {
                    case 'init': {
                        setSession({ ...session, users: data.users });
                        const finger = new Map(myFinger);
                        finger.set(client.clientID, sliderValue >= 70);
                        socket.send(JSON.stringify({ type: 'addUser' }));
                        console.log('sending add user');
                        setMyFinger(finger);
                        break;
                    }
                    case 'fingerChange': {
                        const newFinger = new Map(fingers);
                        newFinger.set(data.clientID, data.fingerUp);
                        setFingers(newFinger);
                        break;
                    }
                    case 'addUser': {
                        setSession({ ...session, users: data.users });
                        console.log('adding user');
                        break;
                    }
                    case 'removeUser': {
                        setSession({ ...session, users: data.users });
                        console.log('removing user');
                        break;
                    }
                }
            };
            setWs(socket);
            console.log('socket', socket);
        };
        setupWebSocket();
        return () => {
            console.log('socket closed');
        };
    }, []);

    return (
        <PageContainer>
            PlayGround{' '}
            {connecting ? 'Connecting' : `Joined as ${client.userName}`}
            <div className='flex'>
                <div className='flex justify-center'>
                    <Textbox chidiya={`chidiya`} />
                    <Slider value={sliderValue} setValue={setSliderValue} />
                    <Timer seconds={0} />
                </div>
                <div className='flex flex-col items-center justify-center h-screen'>
                    {session.users.map((user) => (
                        <div key={user}>
                            {user}{' '}
                            <span className='text-4xl'>
                                {fingers.get(user) || myFinger.get(user)
                                    ? '👆'
                                    : '👇'}
                            </span>
                        </div>
                    ))}
                </div>{' '}
            </div>
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
