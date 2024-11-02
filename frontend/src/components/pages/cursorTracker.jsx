import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const WS_URL = import.meta.env.VITE_WS_URL;

const CursorTracker = () => {
    const [cursors, setCursors] = useState(new Map());
    const [ws, setWs] = useState(null);
    const [clientID, setClientID] = useState(null);
    const [sessionID, setSessionID] = useState(null);
    const [sessionCode, setSessionCode] = useState(null);
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
                // Create new session
                const response = await axios.post(`${API_URL}/api/sessions`);
                activeSessionID = response.data.sessionID;
                setSessionCode(response.data.sessionCode);
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
            if (!ws || !clientID || ws.readyState !== WebSocket.OPEN) return;

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
        <div
            className='absolute inset-0 overflow-hidden'
            onMouseMove={handleMouseMove}
        >
            <div className='absolute top-4 right-4 bg-white p-4 rounded-lg shadow'>
                <div className='text-sm font-medium'>
                    Session Code: {sessionCode}
                </div>
                <div className='text-xs text-gray-500 mt-1'>
                    Share the URL or above code to invite others
                </div>
                <button
                    onClick={() =>
                        navigator.clipboard.writeText(window.location.href)
                    }
                    className='mt-2 px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
                >
                    Copy URL
                </button>
                <button
                    onClick={() => navigator.clipboard.writeText(sessionCode)}
                    className='mt-2 mx-2 px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
                >
                    Copy Code
                </button>
            </div>
            <div className='absolute inset-0 w-full h-full bg-sky-100 -z-10'>
                {Array.from(cursors.entries()).map(([id, data]) => (
                    <div
                        key={id}
                        className='absolute dot pointer-events-none transition-all duration-100 z-0'
                        style={{
                            left: data.position.x,
                            top: data.position.y,
                            borderColor: `rgba(1,1,255,0.6)`,
                            transform: 'translate(-50%, -50%)',
                            position: 'absolute',
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default CursorTracker;
