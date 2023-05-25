import { Container, Row, Col, Button, Card, InputGroup, } from "react-bootstrap"
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'

import { useContext, useEffect } from "react"
import { PokemonContext, UserContext, CartContext } from "./header"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import 'font-awesome/css/font-awesome.min.css'
import { Cart, CartElement } from "./types"



function IncButton( { handleClick } : { handleClick: React.MouseEventHandler<HTMLButtonElement>}) {
    return (
        <Button
            type="button"
            id="incButton"
            className = "btn btn-danger"
            size="sm"
            onClick={handleClick}
        >
            <FontAwesomeIcon icon={faPlus}/>
        </Button>
    )
}

function DecButton({ handleClick } : { handleClick: React.MouseEventHandler<HTMLButtonElement>}) {
    return (
        <Button
            type="button"
            id="incButton"
            className = "btn btn-danger"
            size="sm"
            onClick={handleClick}
            // style={{paddingRight:"20 rem"}}
        >
            <FontAwesomeIcon icon={faMinus}/>
        </Button>
    )
}

function RemoveButton({ handleClick } : { handleClick: React.MouseEventHandler<HTMLButtonElement>}) {
    return (
        <Button
            type="button"
            id="removeButton"
            className = "btn btn-dark"
            onClick={handleClick}
        >
            <FontAwesomeIcon icon={faXmark}/>
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
    const price = product.price

    function handleRemoveFromBasket(amountToRemove:number) {
        // call backend to remove the specified amount of a product
        fetch(`http://localhost:3005/customers/${id}/baskets/products/${product.id}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({amount: amountToRemove})
        })
        .then(response => response.json())
        .then(response => {setCart(response.basket); console.log({cart: cart, resp: response.basket})})
        .catch(error => console.log({ errorRemovingProductFromBasketForUser: error }))
    }

    function handleAddToBasket() {
        // Call backend to add product
        fetch(`http://localhost:3005/customers/${id}/baskets/products/${product.id}`, {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ amount: 1})
        })
        .then(response => response.json() )
        .then(shoppingCart => setCart(shoppingCart.basket))
        .catch(error => console.log({ errorAddingProductToShoppingCart: error }))
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
                                Price: {price}
                            </Card.Text>
                            <Card.Text className="mt-4">
                                Quantity: 
                            </Card.Text>
                            <Card.Text>
                                <DecButton handleClick={event => handleRemoveFromBasket(1)}/> 
                                {" "} {amount} {" "}
                                <IncButton handleClick={handleAddToBasket}/>
                            </Card.Text>
                        </Card.Body>
                    </Col>
                    <Col md={3} className="mb-auto">
                        <Card.Body style={{textAlign: "right"}}>
                            <RemoveButton handleClick={event => handleRemoveFromBasket(amount)}/>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </div>  
    )
}



function AllCartCards() {
    const { cart, setCart } = useContext(CartContext)

    if (cart.length !== 0) {
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

function GuestEmptyCartGreeting() {
    return <h1> Shopping cart is empty.</h1>
}

function UserEmptyCartGreeting({ userName } : {userName: string}) {
    return <h1> Shopping cart for {userName} is empty. </h1>
}

function GuestCartGreeting() {
    return <h1> Shopping cart contents:</h1>
}

function UserCartGreeting( { userName } : { userName: string }) {
    return <h1> Shopping cart contents for {userName}: </h1>
}

function CartGreeting( { userName, cart } : { userName: string, cart: Cart}) {
    if (cart.length !== 0) {
        if (userName !== "DEFAULT") {
            return <UserCartGreeting userName={userName}/>
        } else {
            return <GuestCartGreeting/>
        }
    } else if (userName !== "DEFAULT") {
        return <UserEmptyCartGreeting userName={userName}/>
    } else {
        return <GuestEmptyCartGreeting/>
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
    
    return (
        <Container fluid>
            <Row style={{justifyContent: 'center'}}>
                <Col sm={8} className="mt-5">
                    <CartGreeting userName={user} cart={cart}/>
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