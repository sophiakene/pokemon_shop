import React from "react"
import { useState, createContext, useContext } from "react"
import { Navbar, Container, Nav } from "react-bootstrap"
// if you're missing it: npm install react-router-dom
import { BrowserRouter, NavLink, Route, Routes, Link } from "react-router-dom";
import { LoginForm } from "./forms";
// import 'bootstrap/dist/css/bootstrap.min.css'
import { Products } from './products'

// User context with default values for setting User data
export const SetUserContext = createContext({
    setLoggedInUser: (user: string) => {},
    setLoggedInUserId: (id: number) => {},
  })


// Context for getting data about user
export const UserContext = createContext({ user: "", id: -1 })

export function Header() {
    const [user, setLoggedInUser] = useState("")
    const [id, setLoggedInUserId] = useState(-1)
    const newSetUserContext = { setLoggedInUser, setLoggedInUserId }
    const newGetUserContext = { user, id }

    return (
        <BrowserRouter>
        {/* Set Usercontext for LoginForm overriding default values  */}
                <Navbar bg="dark" variant="dark" sticky="top" expand="md">
                    <Container fluid>
                        <NavLink style={{textDecoration: 'none'}} to= "/">
                            <Navbar.Brand>PokéShop</Navbar.Brand>
                        </NavLink>
                        <Navbar.Toggle className="ms-auto"/>
                        <Navbar.Collapse> 
                            <Nav className="me-auto">
                                {/* Using Nav.Link instead of NavLink for the bootstrap styling. Using as={Link} 
                                to ensure internal linking/not reloading the entire page (SPA) (basically to ensure
                                it acts as if I used NavLink) */}
                                <Nav.Link as={Link} style={{textDecoration: 'none'}} to="/products">
                                    Products
                                </Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link as={Link} style={{textDecoration: 'none'}} to="/signup">
                                    Login 
                                </Nav.Link>
                                <Nav.Link as={Link} style={{textDecoration: 'none'}} to="/cart">
                                    Cart
                                </Nav.Link>
                                <Nav.Link style={{textDecoration: 'none'}}>
                                    {user} with id {id}
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar> 
                
                <Routes>
                    <Route path="/" element={
                        <UserContext.Provider value={newGetUserContext}>
                            <Home/>
                        </UserContext.Provider>}/>
                    <Route path="/signup" element={
                        <SetUserContext.Provider value={newSetUserContext}>
                            <LoginForm/> 
                        </SetUserContext.Provider>}/>
                    <Route path="/products" element={
                        <UserContext.Provider value={newGetUserContext}>
                            <Products/>
                        </UserContext.Provider>}/>
                    <Route path="/cart" element={
                        <UserContext.Provider value={newGetUserContext}>
                            <Cart/>
                        </UserContext.Provider>}/>
                </Routes>
             
        </BrowserRouter>
    )
}

function Home() {
    const { user, id } = useContext(UserContext)
    return (
        <div>
            <h2>Home</h2>
            <h2>Welcome, {user} with id {id}</h2>
        </div>
    ) 
  }

function Cart() {
    const { user, id } = useContext(UserContext)
    return (
        <div>
            <h2>Cart</h2>
            <h2>Welcome, {user} with id {id}</h2>
        </div>
    ) 
}


