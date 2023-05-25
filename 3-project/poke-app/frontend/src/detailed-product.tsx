import * as React from 'react'
import { useContext, useEffect } from "react"
import Button from "react-bootstrap/Button"
//import Badge from 'react-bootstrap/Badge'
import "./css/detailed-product.css"
import { Container, Form, Row, Col, Card } from "react-bootstrap"
import { PokemonContext, CartContext, UserContext } from "./header"
import { useParams } from 'react-router-dom'
import { pokeColours } from './consts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'


//const { index } = useParams() as { index: number }

export function DetailedProductPage() {

    const { pokemon } = useContext(PokemonContext)
    const { index } = useParams() as { index: string }  
    const productImage = `/data/poke_images/${pokemon[Number(index)].name.toLowerCase()}.avif` 
    const { cart, setCart } = useContext(CartContext)
    const { user, id } = useContext(UserContext)

    function handleAddToBasket() {
        // Call backend to add product
        fetch(`http://localhost:3005/customers/${id}/baskets/products/${pokemon[Number(index)].id}`, {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ amount: 1})
        })
        .then(response => response.json() )
        // .then(shoppingCart => setCart(shoppingCart))
        .then(shoppingCart => setCart(shoppingCart.basket))
        .catch(error => console.log({ errorAddingProductToShoppingCart: error }))
    }

    return (
        
            <Container className="detailed-container">
            <Card className="bg-light" style={{margin:"10px"}}>
            <Card.Body>
            <h1>{pokemon[Number(index)].name}</h1>
            <Card.Img src={productImage} alt="Pokemon" variant="top" style={{width: "30vw", height: "auto"}}/>
            
            
            <Card.Text className='align-self-center'>
            <Button 
                className = "btn-lg"
                style={{margin:"5px"}}
                type='submit' 
                variant='danger'
                onClick={handleAddToBasket}
                id="{pokemon[index].name.toLowerCase()}">
                <FontAwesomeIcon icon={faShoppingCart}/> 
                Add to shopping cart
            </Button>  
            <Card className="align-self-center" style={{width:"97.5%"}}>
                    <div className="detailed-text">
                        <h6>Information:</h6>
                        <h4>{pokemon[Number(index)].info}</h4>
                    </div>
                    <div className="detailed-text">
                        <h6>Price:</h6>
                        <h4 id="price">{pokemon[Number(index)].price} DKK</h4>
                    </div>

                    <div className="detailed-text">
                        <h6>Type:</h6>
                            <ol style={{ listStyle: 'none', margin:0, padding:0 }}>
                            {pokemon[Number(index)].type.map((item,index) => 
                                <>
                                <div className="badge" style={{background:pokeColours[item as keyof typeof pokeColours], margin:"2px"}}>
                                <li style={{margin:"2px"}} key={index}>{item}</li>
                                </div>
                                </>
                            )}
                            </ol>
                        </div>
                    
                <div className="detailed-text">
                    <h6>Size:</h6>
                    <h4>{pokemon[Number(index)].size}m</h4>
                </div>         

            </Card>                  
            </Card.Text>
            </Card.Body>
            </Card>
            </Container>

    )
}; 


