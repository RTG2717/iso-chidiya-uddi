import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const CursorTracker = () => {
    const [cursors, setCursors] = useState(new Map());
    const [ws, setWs] = useState(null);
    const [clientID, setClientID] = useState(null);
    const [sessionID, setSessionID] = useState(null);
    const [userName, setUserName] = useState('');
    const [isConnecting, setIsConnecting] = useState(true);
    const [error, setError] = useState(null);

    const initializeSession = async () => {
        try {
            // Check for existing Session URL
            const urlSessionID = new URLSearchParams(
                window.location.search
            ).get('session');
            let activeSessionID = urlSessionID;

            if (!activeSessionID) {
                console.log('No Active session found, making a new one');
                // Create new session
                const response = await axios.post(
                    'http://localhost:5000/api/sessions/'
                );
                activeSessionID = response.data.sessionID;
            }

            // Get Username
            const userNameEntered = `User123`;
            setUserName(userNameEntered);

            // Initialize WebSocket
            const ws_init = new WebSocket(
                `ws://localhost:5000?sessionID=${activeSessionID}&userName=${userNameEntered}`
            );

            setWs(ws_init);
            setSessionID(activeSessionID);

            // Update url with sessionID if not already there
            if (!urlSessionID) {
                window.history.pushState({}, '', `?session=${activeSessionID}`);
            }

            return ws;
        } catch (error) {
            console.error('Error initializing session: ', error);
            setError('Failed connection. Please Try again.');
            setIsConnecting(false);
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
                    case 'cursors': {
                        const cursorMap = new Map(); // Brackets introduced to remove no-case declaration error
                        data.cursors.forEach((cursor) => {
                            cursorMap.set(cursor.clientID, {
                                position: cursor.position,
                                userName: cursor.userName,
                            });
                        });
                        setCursors(cursorMap);
                        break;
                    }
                    case 'cursor':
                        setCursors((prev) =>
                            new Map(prev).set(data.clientID, {
                                position: data.position,
                                userName: data.userName,
                            })
                        );
                        break;
                    case 'disconnect':
                        setCursors((prev) => {
                            const newCursors = new Map(prev);
                            newCursors.delete(data.clientID);
                            return newCursors;
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

    const handleMouseMove = useCallback(
        (e) => {
            if (!ws || !clientID || !ws.readyState !== WebSocket.OPEN) return;

            const position = {
                x: e.clientX,
                y: e.clientY,
            };

            ws.send(
                JSON.stringify({
                    type: 'position',
                    position,
                })
            );
        },
        [ws, clientID]
    );

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
        <div className='relative w-full h-screen bg-gray-50'>
            <div className='absolute inset-0' onMouseMove={handleMouseMove}>
                {Array.from(cursors.entries()).map(
                    ([id, data]) =>
                        id !== clientID && (
                            <div
                                key={id}
                                className='absolute pointer-events-none transition-all duration-100'
                                style={{
                                    left: data.position.x,
                                    top: data.position.y,
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >
                                <div className='relative'>
                                    <svg
                                        className='w-6 h-6 text-blue-500'
                                        viewBox='0 0 24 24'
                                        fill='currentColor'
                                    >
                                        <path d='M5.586 12.657l4.95 4.95a1 1 0 001.414 0l8.485-8.485a1 1 0 000-1.414L15.657 2.93a1 1 0 00-1.414 0L5.586 11.243a1 1 0 000 1.414z' />
                                    </svg>
                                    <div className='absolute top-6 left-0 px-2 py-1 bg-blue-500 text-white text-xs rounded whitespace-nowrap'>
                                        {data.username}
                                    </div>
                                </div>
                            </div>
                        )
                )}
            </div>
            <div className='absolute top-4 right-4 bg-white p-4 rounded-lg shadow'>
                <div className='text-sm font-medium'>
                    Session ID: {sessionID}
                </div>
                <div className='text-xs text-gray-500 mt-1'>
                    Share this URL to invite others
                </div>
                <button
                    onClick={() =>
                        navigator.clipboard.writeText(window.location.href)
                    }
                    className='mt-2 px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
                >
                    Copy URL
                </button>
            </div>
        </div>
    );
};

export default CursorTracker;
