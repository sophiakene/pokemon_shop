import { Row, Col, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext} from "react"
import { UserContext, CartContext } from "../Header"
import 'font-awesome/css/font-awesome.min.css'
import { IncButton } from "./IncButton"
import { DecButton } from "./DecButton"
import { RemoveButton } from "./RemoveButton"
import { getSalePrice } from "./ShoppingCart"

export function CartCard({index} : {index: number}) {
    const { cart, setCart } = useContext(CartContext)
    const { user, id } = useContext(UserContext) // eslint-disable-line

    const product = cart[index].product
    const amount = cart[index].amount
    const pokeName = product.name
    const price = product.price
    //discrepancy between product id and index used for pokemon context list used in detailed products page, below is a hacky fix:
    const detailedProductIndex = product.id - 1 
    const detailedProduct = `/detailed_product/${detailedProductIndex}`
    const image = `/data/poke_images/${pokeName.toLowerCase()}.avif`

    function handleRemoveFromBasket(amountToRemove:number) {
        // call backend to remove the specified amount of a product
        fetch(`http://localhost:3005/customers/${id}/baskets/products/${product.id}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({amount: amountToRemove})
        })
        .then(response => response.json())
        .then(response => setCart(response.basket))
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
                                Price: {getSalePrice(pokeName, price)} DKK
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