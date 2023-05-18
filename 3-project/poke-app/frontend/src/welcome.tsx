import React from 'react'
import { useContext } from 'react'
import { UserContext } from './header'
import './welcome.css'

export function PikaWelcome() {
    const { user, id } = useContext(UserContext)
    if (id === 0) {
        return (
        <div className='background'>
            <div className='welcome-text'>
                <h1>Welcome to Pokéshop!</h1>
                <h2>Your number 1 provider of Pokémon</h2>
            </div>
        </div>
        )
    } else {
        return (
        <div className='background'>
            <div className='welcome-text'>
                <h1>Welcome, {user}, to Pokéshop!</h1>
                <h2>Your number 1 provider of Pokémon</h2>
            </div>
        </div>
        )
    }
}