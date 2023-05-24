import * as React from 'react'
import { useContext, useEffect } from "react"
import Button from "react-bootstrap/Button"
//import Badge from 'react-bootstrap/Badge'
import "./css/detailed-product.css"
import { Container, Form, Row, Col, Card } from "react-bootstrap"
import { PokemonContext, CartContext, UserContext } from "./header"
import { useParams } from 'react-router-dom'
import { pokeColours } from './pokemon'
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
            <Container>
            <Row>
            <Card className="bg-light" style={{width:"45%", margin:"10px"}}>
            <Card.Body>
            <Card.Img src={productImage} alt="Pokemon"/>
            </Card.Body>
            </Card>
            <Card className="bg-light" style={{width:"45%", margin:"10px"}}>
                <div className="card-body d-flex flex-column">
                    <div className="card-title">
                        <h3 id="name">{pokemon[Number(index)].name}</h3>
                        <p className="card-text">
                        <h5>{pokemon[Number(index)].info}</h5>
                        </p> 
                        <p className="card-text">
                        <div>
                            <ol style={{ listStyle: 'none' }}>
                            {pokemon[Number(index)].type.map((item,index) => 
                                <>
                                <div className="badge" style={{background:pokeColours[item as keyof typeof pokeColours]}}>
                                <li key={index}>{item}</li>
                                </div>
                                <br/>
                                </>
                            )}
                            </ol>
                        </div>

                    </p>
                    </div>
                    <p className="card-text">
                        <h5 id="price">Prize: {pokemon[Number(index)].price} DKK</h5>
                    </p>
                    
                <p className="card-text">
                    <h5>Size: {pokemon[Number(index)].size}</h5>
                </p>
          
                </div>

                <Button 
                                type='submit' 
                                variant='danger'
                                onClick={handleAddToBasket}
                                id="{pokemon[index].name.toLowerCase()}"
                            >
                                <FontAwesomeIcon icon={faShoppingCart}/> 
                                Add to shopping cart
                            </Button>                  


            </Card>
            </Row>
            </Container>
    )
}; 


