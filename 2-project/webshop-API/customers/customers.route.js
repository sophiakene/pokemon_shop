import express from 'express'
import { 
    getBasketContent, 
    createBasketForCustomer, 
    addProductToBasket, 
    removeProductFromBasket 
} from './customers.controller.js'


export const customersRouter = express.Router()


customersRouter.get("/customers/:customerId/baskets", getBasketContent)

customersRouter.post("/customers/:customerId/baskets", createBasketForCustomer)

customersRouter.put("/customers/:customerId/baskets/products/:productId", addProductToBasket)

customersRouter.delete("/customers/:customerId/baskets/products/:productId", removeProductFromBasket)

