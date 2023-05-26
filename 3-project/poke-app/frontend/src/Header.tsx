import React from "react"
import { useState, useEffect, createContext } from "react"
import { Navbar, Container, Nav, Badge } from "react-bootstrap"
import { BrowserRouter, NavLink, Route, Routes, Link } from "react-router-dom";
import { Forms } from "./forms/forms";
import { Pokemon, Cart } from "./types";
import { Products } from './products/Products'
import { Home } from "./home/Home";
import { DetailedProductPage } from "./products/DetailedProduct";
import { ShoppingCart } from "./shoppingCart/ShoppingCart"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './css/logo.css'

// User context with default values for setting User data
export const SetUserContext = createContext({
    setLoggedInUser: (user: string) => {},
    setLoggedInUserId: (id: number) => {},
  })

// Context for getting data about user
export const UserContext = createContext({ user: "", id: -1 })

export const CartContext = createContext({cart: [] as Cart, setCart: (cart:Cart) => {} })

// Products context
export const PokemonContext = createContext({
    pokemon: [] as Pokemon[],
})

function getAllPokemon(setPokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>) {
    console.log("getAllPokemon done again")
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

function getBasketContent(id: number, setCart:React.Dispatch<React.SetStateAction<Cart>>) {
    fetch(`http://localhost:3005/customers/${id}/baskets`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
    .then(response => response.json())
    .then(response => setCart(response.basket))
    .catch(error => console.log({ errorFetchingBasketForUser: error }))
}

function LoginComponent() {
    return (
        <Nav.Link as={Link} style={{textDecoration: 'none'}} to="/signup">
                Login 
        </Nav.Link>
    )
}

function LogoutComponent({ handleClick } : { handleClick: React.MouseEventHandler<HTMLButtonElement>}) {
    return (
        <Nav.Link 
            as={Link} 
            style={{textDecoration: 'none'}} 
            to="/signup"
            onClick={handleClick}
            >
            Logout
        </Nav.Link>
    )
}

function LoginLogout({ id, setLoggedInUser, setLoggedInUserId } :
        { id: number, 
          setLoggedInUserId: React.Dispatch<React.SetStateAction<number>>,
          setLoggedInUser: React.Dispatch<React.SetStateAction<string>> }
    ) {
    if (id === 0) {
        return <LoginComponent/>
    } else {
        return <LogoutComponent handleClick={event => setDefaultUser(setLoggedInUserId, setLoggedInUser)}/>
    }
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
    // if user id changes, cart state must be updated in order to show correct item counter on cart logo
    useEffect(() => getBasketContent(id, setCart), [id]) 
    const pokemonContext = { pokemon }
    const totalAmountOfProducts = cart ? cart.reduce((acc, cartElement) => cartElement.amount + acc, 0) : 0
    const displayName = (id === 0) ? 'Guest' : user

    return (
        <BrowserRouter>
                <Navbar bg="dark" variant="dark" sticky="top" expand="md">
                    <Container fluid>
                        {/* textDecoration none to remove link underline */}
                        <NavLink style={{textDecoration: 'none'}} to= "/">
                            <Navbar.Brand>
                                <img src="data/pokeball-logo.png" width='30vw' alt="Pokéball logo" className="logo-img"/>
                                Pokéshop
                            </Navbar.Brand>
                        </NavLink>
                        <Navbar.Toggle className="ms-auto"/>
                        <Navbar.Collapse> 
                            <Nav className="me-auto">
                                {/* Using Nav.Link instead of NavLink for bootstrap styling. Using as={Link} 
                                 to ensure internal linking/not reloading the entire page (SPA) (basically to ensure
                                 it acts as if we used NavLink) */}
                                <Nav.Link as={Link} style={{textDecoration: 'none'}} to="/products">
                                    Products
                                </Nav.Link>
                            </Nav>
                            <Nav>
                                <LoginLogout 
                                    id={id}
                                    setLoggedInUser={setLoggedInUser}
                                    setLoggedInUserId={setLoggedInUserId}
                                />
                                <Nav.Link as={Link} style={{textDecoration: 'none'}} to="/cart">
                                    <FontAwesomeIcon icon={faShoppingCart} size="xl"/>
                                        <span style={{fontSize: '14px'}}>
                                            <Badge pill bg="danger" className='amountCounter' style={{position: 'relative', left: '-8px', top: '-15px' }}>
                                                {totalAmountOfProducts} 
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
