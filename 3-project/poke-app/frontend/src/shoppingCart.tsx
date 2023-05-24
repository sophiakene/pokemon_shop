// import { Pokemon } from "./types";
// import { Cart } from "./types"

// export function addToShoppingCart(pokemon : Pokemon) {
    
// }

import { Container, Row, Col, Button, Nav, Card } from "react-bootstrap"
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'

import { useContext, useEffect } from "react"
import { PokemonContext, UserContext, CartContext } from "./header"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoltLightning, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import {faXmark, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import 'font-awesome/css/font-awesome.min.css'
import { Cart, CartElement } from "./types"



function IncButton() {
    return (
        <Button
            type="button"
            id="incButton"
            className = "btn btn-danger"
        >
            <FontAwesomeIcon icon={faPlus}/>
        </Button>
    )
}

function DecButton() {
    return (
        <Button
            type="button"
            id="incButton"
            className = "btn btn-danger"
        >
            <FontAwesomeIcon icon={faMinus}/>
        </Button>
    )
}

function CheckoutCard() {
    const { cart, setCart } = useContext(CartContext)
    
    const {itemsTotal, subtotal} = cart.reduce((acc, item) => {
        acc.itemsTotal += item.amount
        acc.subtotal += item.amount * item.product.price
        return acc
    }, {itemsTotal: 0, subtotal: 0})
    
    return (
        <Card bg="light" style={{width: "18rem"}}>
            <Card.Body>
                <Card.Title>
                    Summary
                </Card.Title>
                <Card.Text>
                    Total number of items: {itemsTotal}
                </Card.Text>
                <Card.Text>
                    Subtotal: {subtotal}
                </Card.Text>
                <Button className="btn btn-danger btn-block">
                    Proceed to checkout
                </Button>
            </Card.Body>
        </Card>
    )
}

function RemoveButton({ handleRemoveFromBasket } : { handleRemoveFromBasket: () => void}) {
    return (
        <Button
            type="button"
            id="removeButton"
            className = "btn btn-dark"
            onClick={()=>handleRemoveFromBasket()}
        >
            <FontAwesomeIcon icon={faXmark}/>
        </Button>
    )
}

function CartCard({index} : {index: number}) {
    const { cart, setCart } = useContext(CartContext)
    const { user, id } = useContext(UserContext)

    const product = cart[index].product
    const amount = cart[index].amount
    //discrepancy between product id and index used for pokemon context list used in detailed products page, below is a hacky fix:
    const detailedProductIndex = product.id - 1 

    const detailedProduct = `/detailed_product/${detailedProductIndex}`
    const pokeName = product.name
    const image = `/data/poke_images/${pokeName.toLowerCase()}.avif`
    const info = product.info
    const price = product.price

    function handleRemoveFromBasket() {
        fetch(`http://localhost:3005/customers/${id}/baskets/products/${product.id}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({amount})
        })
        .then(response => response.json())
        .then(response => setCart(response.basket))
        .catch(error => console.log({ errorRemovingProductFromBasketForUser: error }))
    }

    return (
        <div>
            <Card bg="light" className="mb-3">
                <Row className="no-gutters">
                    <Col md={3}>
                        <Link to={detailedProduct}>
                            <Card.Img src={image} alt="Pokemon" />
                        </Link>
                    </Col>
                    <Col md={6}>
                        <Card.Body>
                            <h5>
                                <Card.Title>
                                    {pokeName}
                                </Card.Title>
                            </h5>
                            <Card.Text>
                                    {info}
                            </Card.Text>
                            <Card.Text>
                                    Price: {price}
                            </Card.Text>
                            <Card.Text>
                                    Quantity: {amount}
                            </Card.Text>
                        </Card.Body>
                    </Col>
                    <Col md={3} className="mb-auto">
                        <Card.Body style={{textAlign: "right"}}>
                            <RemoveButton handleRemoveFromBasket={handleRemoveFromBasket}/>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </div>  
    )
}

function AllCartCards() {
    const { cart, setCart } = useContext(CartContext)

    if (cart.length != 0) {
        const allCartCards = 
            cart.map((cartElement, index) => { return (
                <div key={cartElement.product.name}>
                    <CartCard index={index} />
                </div>
                )
            })
        return (
            <div>
                {allCartCards}
            </div>
        ) 
    } else {
        return (
            <div></div>
        )
    }
    
}

export function ShoppingCart() {

    const { user, id } = useContext(UserContext)
    const { cart, setCart } = useContext(CartContext)

    // update the CartContext
    useEffect(() => {
        fetch(`http://localhost:3005/customers/${id}/baskets`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
        .then(response => response.json())
        .then(response => setCart(response.basket))
        .catch(error => console.log({ errorFetchingBasketForUser: error }))
    }, [])
    
    let shoppingCartTitle = "Shopping cart is empty."

    if (cart.length != 0) {
        if (user != "DEFAULT") {
            shoppingCartTitle = `Shopping cart content for ${user}:`
        } else {
            shoppingCartTitle = "Shopping cart contents:"
        }
    } else {
        if (user != "DEFAULT") {
            shoppingCartTitle = `Shopping cart for ${user} is empty`
        }
    }

    return (
        <Container fluid>
            <Row style={{justifyContent: 'center'}}>
                <Col sm={8} className="mt-5">
                    <h1>
                        {shoppingCartTitle}
                    </h1>
                </Col>
            </Row>
            <Row style={{justifyContent: 'center'}}>
                <Col sm={6} className="mt-3">
                    <AllCartCards/>
                </Col>
                <Col sm={2} className="mt-3">
                    <CheckoutCard/>
                </Col>
            </Row>
        </Container>
    )
}