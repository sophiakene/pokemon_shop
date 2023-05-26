import { Row, Col, Button, Card} from "react-bootstrap"
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import './pokecard.css'
import { useContext } from "react"
import { PokemonContext, UserContext, CartContext } from "../Header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import 'font-awesome/css/font-awesome.min.css'
import { getSalePrice } from "../shoppingCart/ShoppingCart"

export function PokeCard({ index } : { index: number }) {
    const { pokemon } = useContext(PokemonContext) 
    const { user, id } = useContext(UserContext) // eslint-disable-line
    const { cart, setCart } = useContext(CartContext) // eslint-disable-line

    function handleAddToBacket() {
        // Call backend to add product
        fetch(`http://localhost:3005/customers/${id}/baskets/products/${pokemon[index].id}`, {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ amount: 1})
        })
        .then(response => response.json() )
        .then(shoppingCart => setCart(shoppingCart.basket))
        .catch(error => console.log({ errorAddingProductToShoppingCart: error }))
    }

    if(pokemon.length !== 0) {
        // changed the url as react-router-dom uses very specific path structure for placeholders
        const detailedProduct = `/detailed_product/${index}`
        const image = `/data/poke_images/${pokemon[index].name.toLowerCase()}.avif`
        return (
            <Card 
                bg='light' 
                className='mb-3' // margin bottom sizing of 3
                key={'Light'}
            >
                <Row className='no-gutters'>
                    <Col lg={3}>
                        <Card.Body>
                            <Link to={detailedProduct}>
                                <Card.Img style={{width:"90%"}} src={image} alt="Pokemon" />
                            </Link>
                        </Card.Body>
                    </Col>
                    <Col lg={5}>
                        <Card.Body>
                            <Link to={detailedProduct}>
                                <Card.Title>{pokemon[index].name}</Card.Title>
                            </Link>
                            <Card.Text>Price: {getSalePrice(pokemon[index].name, pokemon[index].price)} DKK</Card.Text>
                        </Card.Body>
                    </Col>
                    <Col lg={4} className="mt-auto">
                        <Card.Body>
                            <Button 
                                type='submit' 
                                variant='danger'
                                onClick={handleAddToBacket}
                                id="{pokemon[index].name.toLowerCase()}"
                                style={{maxWidth:"100%"}} // so button does not overflow card borders when shrinking
                            >
                                <FontAwesomeIcon icon={faShoppingCart}/> 
                                Add to shopping cart
                            </Button>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        );
    } else { return (<div></div>) }
}