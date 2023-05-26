import * as React from 'react'
import { useContext } from "react"
import Button from "react-bootstrap/Button"
//import Badge from 'react-bootstrap/Badge'
import "./css/detailed-product.css"
import { Container, Row, Col, Card } from "react-bootstrap"
import { PokemonContext, CartContext, UserContext } from "./Header"
import { useParams } from 'react-router-dom'
import { pokeColours } from './consts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { getSalePrice } from './shoppingCart/ShoppingCart'

export function DetailedProductPage() {

    const { pokemon } = useContext(PokemonContext)
    const { index } = useParams() as { index: string }  
    const productImage = `/data/poke_images/${pokemon[Number(index)].name.toLowerCase()}.avif` 
    const { cart, setCart } = useContext(CartContext) // eslint-disable-line
    const { user, id } = useContext(UserContext) // eslint-disable-line

    function handleAddToBasket() {
        // Call backend to add product
        fetch(`http://localhost:3005/customers/${id}/baskets/products/${pokemon[Number(index)].id}`, {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ amount: 1})
        })
        .then(response => response.json() )
        .then(shoppingCart => setCart(shoppingCart.basket))
        .catch(error => console.log({ errorAddingProductToShoppingCart: error }))
    }

    return (
        <Container className="detailed-container">
                <Row>
                    <Col xs={12} md={8}>
                        <Card className='bg-light mb-2'>
                            <Card.Body>
                                <h1>{pokemon[Number(index)].name}</h1>
                                <Card.Img className='detailed-img' src={productImage} alt="Pokemon"/>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>  
                        <Card.Text className='align-self-center'>
                <Card>
                        <div className="detailed-text">
                            <h6>Information:</h6>
                            <h4>{pokemon[Number(index)].info}</h4>
                        </div>
                        <div className="detailed-text">
                            <h6>Price:</h6>
                            <h4 id="price">{getSalePrice(pokemon[Number(index)].name, pokemon[Number(index)].price)} DKK</h4>
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
                    </Col>
                </Row>
            </Container>

    )
}; 


