import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { Cart } from "../types"


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

export function CartGreeting( { userName, cart } : { userName: string, cart: Cart}) {
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