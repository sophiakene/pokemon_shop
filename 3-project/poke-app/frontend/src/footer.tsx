import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

export function Footer() {
    return (
        <Navbar bg='dark' variant='dark' fixed='bottom'>
            <Container>
                <Navbar.Brand>Pokéshop</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className='justify-content-end'>
                    <Navbar.Text>Poké Valley 42, Los Angeles</Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};