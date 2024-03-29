import { Container, Row, Col } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'

import { useContext, useEffect } from "react"
import { UserContext, CartContext } from "../Header"

import 'font-awesome/css/font-awesome.min.css'
import { CheckoutCard } from "./CheckoutCard"
import { CartCard } from "./CartCard"
import { CartGreeting } from "./CartGreeting"

function AllCartCards() {
    const { cart, setCart } = useContext(CartContext) // eslint-disable-line

    if (cart.length !== 0) {
        const allCartCards = 
            cart.map((cartElement, index) => { 
                return (
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
        return <div></div>
    }
}

export function ShoppingCart() {
    const { user, id } = useContext(UserContext)
    const { cart, setCart } = useContext(CartContext)

    // Update the CartContext
    // id as dependency: if user id changes, we want to update the cart context
    useEffect(() => {
        fetch(`http://localhost:3005/customers/${id}/baskets`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
        .then(response => response.json())
        .then(response => setCart(response.basket))
        .catch(error => console.log({ errorFetchingBasketForUser: error }))
    }, [id]) //eslint-disable-line

    // To avoid page refresh of shopping cart immediately results in error
    // we need to check that cart is defined.
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