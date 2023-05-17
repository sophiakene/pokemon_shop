import React from "react"
import { useState, createContext, useContext } from "react"
import { Navbar, Container, Nav } from "react-bootstrap"
// npm install react-router-dom
import { BrowserRouter, NavLink, Route, Routes, Link } from "react-router-dom";
import { LoginForm } from "./forms";
// import 'bootstrap/dist/css/bootstrap.min.css'


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
                    <Route path="/products" element={<Products/>}/>
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

function Products() {
    const { user, id } = useContext(UserContext)
    return (
        <div>
            <h2>Products</h2>
        </div>
    ) 
}


// function makeNavBar() {
//     const header = document.createElement('header')
//     header.setAttribute("class", 'sticky-top')
//     totalItems = getTotal()[0]
//     header.innerHTML =` 
//     <nav class="navbar navbar-expand-md navbar-dark bg-dark">
//         <div class="container-fluid">
//             <a class="navbar-brand" href="index.html">PokéShop</a>
//             <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
//                 aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
//                 <span class="navbar-toggler-icon"></span>
//             </button>
//             <div class="collapse navbar-collapse" id="navbarCollapse">
//                 <ul class="navbar-nav me-auto mb-2 mb-md-0">
//                     <li class="nav-item">
//                         <a class="nav-link" href="products.html">Products</a>
//                     </li>
//                 </ul>
//                 <ul class="navbar-nav ml-auto">
//                     <li class="nav-item">
//                         <a class="nav-link" href="login.html">Login</a>
//                     </li>
//                     <li class="nav-item">
//                         <a class="nav-link mb-0" href="shopping_cart.html">
//                         <i class="fa fa-shopping-cart fa-lg"></i> 
//                         <span class="badge btn-danger badge-pill"  style="position: relative; left: -8px; top: -15px; font-size:10px;" id="item-counter">${totalItems}</span></a>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     </nav>
//     `
//     document.body.insertAdjacentElement("afterbegin", header)
// }