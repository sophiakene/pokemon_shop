import React from "react"
import { useState, useEffect, createContext, useContext } from "react"
import { Navbar, Container, Nav } from "react-bootstrap"
import { BrowserRouter, NavLink, Route, Routes, Link, useParams } from "react-router-dom";
import { LoginForm } from "./forms";
import { Pokemon, Cart } from "./types";
import { Products } from './products'
import { Home } from "./home";
// import 'bootstrap/dist/css/bootstrap.min.css'

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


export function Header() {
    const [user, setLoggedInUser] = useState("")
    const [id, setLoggedInUserId] = useState(-1)
    const [pokemon, setPokemon] = useState<Pokemon[]>([])
    const newSetUserContext = { setLoggedInUser, setLoggedInUserId }
    const newGetUserContext = { user, id }
    const [cart, setCart] = useState<Cart>([])
    const cartContext = { cart, setCart }
    useEffect(() => getAllPokemon(setPokemon), []) // eslint-disable-line react-hooks/exhaustive-deps
    const pokemonContext = { pokemon }

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
                            <Home />
                        </UserContext.Provider>}/>
                    <Route path="/signup" element={
                        <SetUserContext.Provider value={newSetUserContext}>
                            <LoginForm/> 
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
                            <CartShow/>
                        </UserContext.Provider>}/>
                    <Route path="/detailed_product">
                        <Route path=":name" element={<DetailDummy/>}/>
                    </Route>
                </Routes>
             
        </BrowserRouter>
    )
}

function CartShow() {
    const { user, id } = useContext(UserContext)
    return (
        <div>
            <h2>Cart</h2>
            <h2>Welcome, {user} with id {id}</h2>
        </div>
    ) 
}

// should be deleted when real detail component in place
function DetailDummy() {
    const { name } = useParams()
    return (
        <div>
            <h2>Detailed product page dummy</h2>
            <h2> {name} </h2>
        </div>
    ) 
  }
