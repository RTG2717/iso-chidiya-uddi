import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CursorTracker from './pages/cursorTracker';
import UsernameForm from './pages/UsernameForm';

const Layout = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/track' element={<CursorTracker />} />
            <Route path='/create-new-lobby' element={<UsernameForm />} />
            <Route path='/join-lobby' element={<UsernameForm />} />
        </Routes>
    );
};

export default Layout;
