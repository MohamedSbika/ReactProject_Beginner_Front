import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link , useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Nav.css';
 


function BasicExample() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAuth');
        navigate('/auth/login');
    }

    const location = useLocation();

    const [isAuthenticated , setIsAuthenticated] = useState(false);

    useEffect(() => {
        const isAuth = localStorage.getItem('isAuth') || false;
        setIsAuthenticated(isAuth);
    } , [location]);






return (
<Navbar bg="light" data-bs-theme="light">
<Container>

<Nav className="me-auto">
{!isAuthenticated ? (
    <>
<Nav.Link><Link to={'auth/login'}>Log in</Link></Nav.Link>
<p> Bienvenu dans notre entreprise </p>

</>
) : (
    <Nav.Link><button className='btn btn-danger' onClick={handleLogout}>log out</button></Nav.Link>

)}
</Nav>
</Container>
</Navbar>
);
}
export default BasicExample;