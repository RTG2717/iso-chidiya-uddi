import { useState, useEffect } from 'react';
import './App.css';
import Slider from './components/slider';
import Navbar from './components/navbar';
import Textbox from './components/textbox';
import Timer from './components/timer';
import CursorTracker from './components/cursorTracker';

function App() {
    const [value, setValue] = useState(0);
    const [seconds, setSeconds] = useState(2);
    const [chidiya, setChidiya] = useState(1); // only for testing, edit this functionality later

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

    return (
        <main className='h-screen w-full'>
            <CursorTracker />
            {/* <Navbar value={value} />
            <div className='flex flex-col items-center justify-center h-screen'>
                <Textbox chidiya={`chidiya ${chidiya}`} />
                <Slider value={value} setValue={setValue} />
                <Timer seconds={seconds} />
            </div> */}
        </main>
    );
}

export default App;
