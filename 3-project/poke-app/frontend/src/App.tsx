import React, { useState, createContext, useEffect } from "react";
import './App.css'
import { Footer } from './footer'
import { Products } from './products'
import { Pokemon, Cart } from "./types";
import { Header } from "./header"

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

export const CartContext = createContext({cart: [] as Cart, setCart: (cart:Cart) => {} })

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  useEffect(() => getAllPokemon(setPokemon), []) // eslint-disable-line react-hooks/exhaustive-deps
  const pokemonContext = { pokemon }
  const [cart, setCart] = useState<Cart>([])
  const cartContext = { cart, setCart }

  return (
    <div className="App">
      
      <CartContext.Provider value={cartContext}>
      <PokemonContext.Provider value={pokemonContext}>
        <Header/>
      </PokemonContext.Provider>
      </CartContext.Provider>

      <Footer />
    </div>
  );
}

export default App;
