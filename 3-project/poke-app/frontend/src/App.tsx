import React, { useState, createContext, useEffect } from "react";
import './App.css'
import { Footer } from './footer'
import { Products } from './products'
import { Pokemon } from "./types";
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

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  useEffect(() => getAllPokemon(setPokemon), []) // eslint-disable-line react-hooks/exhaustive-deps
  const pokemonContext = { pokemon }

  return (
    <div className="App">
      <Header/>
      <PokemonContext.Provider value={pokemonContext}>
        <Products/>
      </PokemonContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
