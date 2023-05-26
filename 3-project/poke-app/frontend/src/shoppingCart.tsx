import { Container, Row, Col, Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'

import { useContext, useEffect } from "react"
import { UserContext, CartContext } from "./header"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import 'font-awesome/css/font-awesome.min.css'
import { Cart } from "./types"



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

function CheckoutCard() {// eslint-disable-next-line
    const { cart, setCart } = useContext(CartContext) 
    
    const {itemsTotal, subtotal} = cart.reduce((acc, item) => {
        let salePrice
        switch(item.product.name) {
            case "Pikachu": 
            case "Bulbasaur":
            case "Diglett": {
                salePrice = item.product.price / 2
                break
            }
            default: {
                salePrice = item.product.price
            }
        }
        acc.itemsTotal += item.amount
        acc.subtotal += item.amount * salePrice
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
                    Subtotal: {subtotal} DKK
                </Card.Text>
                <Button className="btn btn-danger btn-block">
                    Proceed to checkout
                </Button>
            </Card.Body>
        </Card>
    )
}



function CartCard({index} : {index: number}) {
    const { cart, setCart } = useContext(CartContext) // eslint-disable-next-line
    const { user, id } = useContext(UserContext)

    const product = cart[index].product
    const amount = cart[index].amount
    //discrepancy between product id and index used for pokemon context list used in detailed products page, below is a hacky fix:
    const detailedProductIndex = product.id - 1 

    const detailedProduct = `/detailed_product/${detailedProductIndex}`
    const pokeName = product.name
    const image = `/data/poke_images/${pokeName.toLowerCase()}.avif`
    const price = product.price
    let salePrice
    switch(product.name) {
        case "Pikachu": 
        case "Bulbasaur":
        case "Diglett": {
            salePrice = price / 2
            break
        }
        default: {
            salePrice = price
        }
    }

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
                    {/* the extra ordering effort ensures the x-button ends up on top
                    of the card in mobile view */}
                    <Col sm={{span:4, order:1}} xs={{order:2}}> 
                        <Card.Body>
                            <Link to={detailedProduct}>
                                <Card.Img style={{width:"80%", maxWidth:"150px"}} src={image} alt="Pokemon" />
                            </Link>
                        </Card.Body>
                    </Col>
                    <Col sm={{span:5, order:2}} xs={{order:3}}>
                        <Card.Body>
                            <h5>
                                <Link to={detailedProduct}>
                                    <Card.Title>
                                        {pokeName}
                                    </Card.Title>
                                </Link>
                            </h5>
                            <Card.Text>
                                Price: {salePrice} DKK
                            </Card.Text>
                            <Card.Text className="mt-4">
                                <DecButton handleClick={event => handleRemoveFromBasket(1)}/> 
                                <span className="" style={{fontSize:"20px", paddingLeft:"10px", paddingRight:"10px", paddingBottom:"6px"}}>{amount}</span>
                                <IncButton handleClick={handleAddToBasket}/>
                            </Card.Text>
                        </Card.Body>
                    </Col>
                    <Col sm={{span:3, order:3}} xs={{order:1}} className="mb-auto">
                        <Card.Body style={{textAlign: "right", maxWidth: "100%"}}>
                            <RemoveButton handleClick={event => handleRemoveFromBasket(amount)}/>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </div>  
    )
}

function AllCartCards() {// eslint-disable-next-line
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
    // id as dependency: if user id changes, we want to update the cart context
    useEffect(() => {
        fetch(`http://localhost:3005/customers/${id}/baskets`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
        .then(response => response.json())
        .then(response => setCart(response.basket))
        .catch(error => console.log({ errorFetchingBasketForUser: error })) //eslint-disable-next-line
    }, [id])

    // to avoid page refresh of shopping cart immediately results in 
    // error we need to check that cart is defined.
    if (cart) {
        return (
            <Container fluid>
                <Row style={{justifyContent: 'center'}}>
                    <Col sm={8} className="mt-5">
                        <CartGreeting userName={user} cart={cart}/>
                    </Col>
                </Row>
                <Row style={{justifyContent: 'center'}}>
                    <Col md={{span:6, order:1}} sm={{order:2}} xs={{order:2}} className="mt-3">
                        <AllCartCards/>
                    </Col>
                    <Col md={{span:2, order:2}} sm={{order:1}} xs={{order:1}} className="mt-3" align="center">
                        <CheckoutCard/>
                    </Col>
                </Row>
            </Container>
        )
    } else {
        return <></>
    }   
}