import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CursorTracker from './cursorTracker';
import UsernameForm from './UsernameForm';

const Layout = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/track' element={<CursorTracker />} />
            <Route path='/create-new-lobby' element={<UsernameForm />} />
        </Routes>
    );
};

export default Layout;
