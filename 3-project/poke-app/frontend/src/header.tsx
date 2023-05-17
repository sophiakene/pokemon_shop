import React from "react"
import { Navbar, Container, Nav } from "react-bootstrap"
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { LoginForm } from "./forms";
// import 'bootstrap/dist/css/bootstrap.min.css'

export function Header() {
    return (
        <Navbar bg="dark" variant="dark" sticky="top" expand="md">
            <Container>
                <BrowserRouter>
                    <NavLink style={{textDecoration: 'none'}} to= "/">
                        <Navbar.Brand>PokéShop</Navbar.Brand>
                    </NavLink>
                    <Navbar.Toggle className="ms-auto"/>
                    <Navbar.Collapse> 
                        <Nav className="me-auto">
                            <Nav.Link style={{textDecoration: 'none'}} href="/products">
                                Products
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link style={{textDecoration: 'none'}} href="/signup">
                                Login
                            </Nav.Link>
                            <Nav.Link style={{textDecoration: 'none'}} href="/cart">
                                Cart
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>                    
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/signup" element={<LoginForm/>}/>
                        <Route path="/products" element={<Products/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                    </Routes>
                </BrowserRouter>
            </Container>
        </Navbar>  
    )
}

function Home() {
    return <h2></h2>
  }

function Cart() {
    return <h2></h2>
}

function Products() {
    return <h2></h2>
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