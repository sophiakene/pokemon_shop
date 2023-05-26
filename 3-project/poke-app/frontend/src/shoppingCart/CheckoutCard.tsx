import { Button, Card } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext} from "react"
import { CartContext } from "../header"
import 'font-awesome/css/font-awesome.min.css'


export function CheckoutCard() {// eslint-disable-next-line
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