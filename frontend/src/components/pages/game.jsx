import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Navbar from '../navbar';
import Textbox from '../textbox';
import Slider from '../slider';
import Timer from '../timer';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:5000/ws';

const Game = () => {
    const [ws, setWs] = useState(null);
    const [clientID, setClientID] = useState(null);
    const [sessionID, setSessionID] = useState(null);
    const [userName, setUserName] = useState('');
    const [isConnecting, setIsConnecting] = useState(true);
    const [error, setError] = useState(null);

    const [value, setValue] = useState(0);
    const [seconds, setSeconds] = useState(2);
    const [chidiya, setChidiya] = useState(1);
    const [fingerUp, setFingerUp] = useState(false);
    const [otherUserFingers, setOtherUserFingers] = useState(new Map());

    useEffect(() => {
        if (seconds == 0) {
            setSeconds(2);
            setChidiya(chidiya + 1);
        }
    }, [seconds]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((seconds) => (seconds > 0 ? seconds - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (value < 69 && fingerUp !== false) setFingerUp(false);
        else if (value < 69 && fingerUp !== true) setFingerUp(true);
    }, [value]);

    useEffect(() => {
        if (!ws || !clientID || ws.readyState !== WebSocket.OPEN) return;

        ws.send(
            JSON.stringify({
                type: 'position',
                fingerUp: fingerUp,
            })
        );
    }, [fingerUp]);

    const initializeSession = async () => {
        try {
            // Check for existing Session URL
            const urlSessionID = new URLSearchParams(
                window.location.search
            ).get('session');
            let activeSessionID = urlSessionID;

            if (!activeSessionID) {
                // Create new session
                const response = await axios.post(`${API_URL}/api/sessions`);
                activeSessionID = response.data.sessionID;
            }

            // Get username
            const userName = `User-${Math.floor(Math.random() * 1000)}`;
            setUserName(userName);

            // Initialize WebSocket connection
            console.log('Initializing WebSocket connection...');
            const wsUrl = `${WS_URL}?sessionID=${activeSessionID}&userName=${encodeURIComponent(
                userName
            )}`;
            console.log('WebSocket URL:', wsUrl);

            const socket = new WebSocket(wsUrl);

            socket.onopen = () => {
                console.log('WebSocket connection established');
                setIsConnecting(false);
                setError(null);
            };

            socket.onerror = (error) => {
                console.error('WebSocket error:', error);
                setError(
                    'Failed to connect. Please check your connection and try again.'
                );
                setIsConnecting(false);
            };

            setWs(socket);
            setSessionID(activeSessionID);

            // Update url with sessionID if not already there
            if (!urlSessionID) {
                window.history.pushState({}, '', `?session=${activeSessionID}`);
            }

            return socket;
        } catch (error) {
            console.error('Error initializing session: ', error);
            setError('Failed connection. Please Try again.');
            setIsConnecting(false);
            return null;
        }
    };

    useEffect(() => {
        let reconnectTimeout;

        const setupWebSocket = async () => {
            const socket = await initializeSession();
            if (!socket) return;

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);

                switch (data.type) {
                    case 'init':
                        setClientID(data.clientID);
                        setIsConnecting(false);
                        setError(null);
                        break;
                    case 'fingerChange':
                        setOtherUserFingers((prev) => {
                            const newFingers = new Map(prev);
                            newFingers.set(data.clientID, {
                                username: data.username,
                                fingerUp: data.fingerUp,
                            });
                            return newFingers;
                        });
                        console.log('Other User Fingers:', otherUserFingers);
                        break;
                    case 'disconnect':
                        setOtherUserFingers((prev) => {
                            const newFingers = new Map(prev);
                            newFingers.delete(data.clientID);
                            return newFingers;
                        });
                        break;
                }
            };

            socket.onclose = () => {
                setIsConnecting(true);
                // Attempt to reconnect after 3 seconds
                reconnectTimeout = setTimeout(setupWebSocket, 3000);
            };

            socket.onerror = () => {
                setError('Connection Error: Attempting to reconnect...');
            };
        };

        setupWebSocket();

        return () => {
            clearTimeout(reconnectTimeout);
            if (ws) {
                ws.close();
            }
        };
    }, []);

    if (error) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <div className='text-red-500 text-xl'>{error}</div>
            </div>
        );
    }

    if (isConnecting) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <div className='text-xl'>Connecting...</div>
            </div>
        );
    }

    return (
        <main>
            <Navbar value={value} />
            <div className='flex flex-col items-center justify-center h-screen'>
                <Textbox chidiya={`chidiya ${chidiya}`} />
                <Slider value={value} setValue={setValue} />
                <Timer seconds={seconds} />
            </div>
        </main>
    );
};

export default Game;
