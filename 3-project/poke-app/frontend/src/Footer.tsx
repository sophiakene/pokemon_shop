import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import './css/footer.css'

export function Footer() {
    return (
        <Navbar className='nav-footer' bg='dark' variant='dark' fixed='bottom'>
            <Container>
                <Navbar.Brand>poke.shop@mail.com</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className='justify-content-end'>
                    <Navbar.Text>Poké Valley 42, Los Angeles</Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};