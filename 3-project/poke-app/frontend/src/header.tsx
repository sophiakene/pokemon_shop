import React from "react"
import { useState, useEffect, createContext } from "react"
import { Navbar, Container, Nav, Badge } from "react-bootstrap"
import { BrowserRouter, NavLink, Route, Routes, Link, useParams } from "react-router-dom";
import { Forms } from "./forms/forms";
import { Pokemon, Cart } from "./types";
import { Products } from './products'
import { Home } from "./home";
import { DetailedProductPage } from "./detailed-product";
import { ShoppingCart } from "./shoppingCart"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './css/logo.css'

//// login context stuff
// User context with default values for setting User data
export const SetUserContext = createContext({
    setLoggedInUser: (user: string) => {},
    setLoggedInUserId: (id: number) => {},
  })

// Context for getting data about user
export const UserContext = createContext({ user: "", id: -1 })

export const CartContext = createContext({cart: [] as Cart, setCart: (cart:Cart) => {} })

//// products context stuff
export const PokemonContext = createContext({
    pokemon: [] as Pokemon[],
    //setPokemon: (pokemon: Pokemon[]) => {}, // remove if decide to load on front page
})

function getAllPokemon(setPokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>) {
    fetch('http://localhost:3005/products', {
        method: 'GET',
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
    .then(response => response.json())
    .then(pokemon => setPokemon(pokemon))
    .catch(error => console.log( {error: error} ))
}

let defaultUser = {
    id: 0,
    firstName: "default",
    lastName: "",
    mail: "DEFAULT@UNKNOWN",
}

function setDefaultUser(
        setLoggedInUserId: React.Dispatch<React.SetStateAction<number>>,
        setLoggedInUser: React.Dispatch<React.SetStateAction<string>>
    ) {
    // Call backend to get default user data                 
    fetch(`http://localhost:3005/customers/${defaultUser.mail}`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    .then(res => res.json())
    .then(userResult => {
        // Clean up basket from last unknown user
        fetch(`http://localhost:3005/customers/${userResult.mail}/baskets`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
        setLoggedInUserId(userResult.id)
        setLoggedInUser(userResult.firstName)
    })
    .catch(error => console.log({ errorSettingUser: error }))
}

export function Header() {
    const [user, setLoggedInUser] = useState("")
    const [id, setLoggedInUserId] = useState(-1)
    const [pokemon, setPokemon] = useState<Pokemon[]>([])
    const newSetUserContext = { setLoggedInUser, setLoggedInUserId }
    const newGetUserContext = { user, id }
    const [cart, setCart] = useState<Cart>([])
    const cartContext = { cart, setCart }
    useEffect(() => setDefaultUser(setLoggedInUserId, setLoggedInUser), [])
    useEffect(() => getAllPokemon(setPokemon), []) // eslint-disable-line react-hooks/exhaustive-deps
    const pokemonContext = { pokemon }
    function getTotalAmountOfProducts() { return cart.reduce((acc, cartElement) => cartElement.amount + acc, 0) }
    let displayName = (id === 0) ? 'Guest' : user

    return (
        <BrowserRouter>
        {/* Set Usercontext for LoginForm overriding default values  */}
                <Navbar bg="dark" variant="dark" sticky="top" expand="md">
                    <Container fluid>
                        {/* <NavLink style={{textDecoration: 'none'}} to= "/">
                            <img src="data/pokeball-logo.png" width='30vw' alt="Pokéball logo" className="logo-img"/>
                        </NavLink> */}
                        <NavLink style={{textDecoration: 'none'}} to= "/">
                            <Navbar.Brand>
                                <img src="data/pokeball-logo.png" width='30vw' alt="Pokéball logo" className="logo-img"/>
                                Pokéshop
                            </Navbar.Brand>
                        </NavLink>
                        <Navbar.Toggle className="ms-auto"/>
                        <Navbar.Collapse> 
                            <Nav className="me-auto">
                                {/* Using Nav.Link instead of NavLink for the bootstrap styling. Using as={Link} 
                                to ensure internal linking/not reloading the entire page (basically to ensure
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
                                    <FontAwesomeIcon icon={faShoppingCart} size="xl"/>
                                        <span style={{fontSize: '14px'}}>
                                            <Badge pill bg="danger" className='amountCounter' style={{position: 'relative', left: '-8px', top: '-15px' }}>
                                                {getTotalAmountOfProducts()}
                                            </Badge>
                                        </span>
                                </Nav.Link>
                                <Navbar.Text style={{textDecoration: 'none'}}>
                                    Logged in as {displayName}
                                </Navbar.Text>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar> 
                
                <Routes>
                    <Route path="/" element={
                        <UserContext.Provider value={newGetUserContext}>
                            <Home />
                        </UserContext.Provider>}/>
                    <Route path="/signup" element={
                        <SetUserContext.Provider value={newSetUserContext}>
                            <Forms/> 
                        </SetUserContext.Provider>}/>
                    <Route path="/products" element={
                        <PokemonContext.Provider value={pokemonContext}>
                            <UserContext.Provider value={newGetUserContext}>
                                <CartContext.Provider value={cartContext}>
                                    <Products/>
                                </CartContext.Provider>
                            </UserContext.Provider>
                        </PokemonContext.Provider>
                    }/>
                    <Route path="/cart" element={
                        <UserContext.Provider value={newGetUserContext}>
                            <CartContext.Provider value={cartContext}>
                                <PokemonContext.Provider value={pokemonContext}>
                                    <ShoppingCart/>
                                </PokemonContext.Provider>
                            </CartContext.Provider>
                        </UserContext.Provider>}/>

                    <Route path="/detailed_product/:index" element = {
                        <UserContext.Provider value={newGetUserContext}>
                            <CartContext.Provider value={cartContext}>
                                <PokemonContext.Provider value={pokemonContext}>
                                    <DetailedProductPage/>
                                </PokemonContext.Provider>
                            </CartContext.Provider>
                        </UserContext.Provider>}/>
                </Routes>
             
        </BrowserRouter>
    )
}
