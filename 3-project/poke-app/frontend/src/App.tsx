import React, { useState, createContext, useEffect } from "react";
import './App.css'
import { LoginForm } from './forms'
import { Footer } from './footer'
import { Products, ProductsFilterBar } from './products'

export type Pokemon = {
  id: string
  name: string
  size: number
  price: number
  sizeCategory: string
  type: string[]
  info: string
}

export const PokemonContext = createContext({
  pokemon: [] as Pokemon[],
  setPokemon: (pokemon: Pokemon[]) => {}, // remove if decide to load on front page
})

// User context with default values for setting User data
export const SetUserContext = createContext({
  setLoggedInUser: (user: string) => {},
  setLoggedInUserId: (id: number) => {},
})

// Context for getting data about user
export const UserContext = createContext({ user: "", id: -1 })

function ContextedLogin() {
  return (
    <div>
      {/* Set Usercontext for LoginForm overriding default values  */}
      {/*<SetUserContext.Provider value={newSetUserContext}>
        <LoginForm/>
      </SetUserContext.Provider>
      <p>{user} with id {id}</p> 
      <Footer />
      */}
    </div>
  )
}

function getAllPokemon(setPokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>) {
  fetch('http://localhost:3005/products', {
      method: 'GET',
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
  })
  .then(response => response.json())
  .then(pokemon => setPokemon(pokemon))
  .catch(error => console.log( {error: error} ))
}
function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  useEffect(() => getAllPokemon(setPokemon), []) // eslint-disable-line react-hooks/exhaustive-deps
  const [user, setLoggedInUser] = useState("")
  const [id, setLoggedInUserId] = useState(-1)
  const newSetUserContext = { setLoggedInUser, setLoggedInUserId }
  const newGetUserContext = { user, id }
  const pokemonContext = { pokemon, setPokemon }

  return (
    <div className="App">
      <p>sss</p>
      <PokemonContext.Provider value={pokemonContext}>
        <Products/>
      </PokemonContext.Provider>
    </div>
  );
}

export default App;
