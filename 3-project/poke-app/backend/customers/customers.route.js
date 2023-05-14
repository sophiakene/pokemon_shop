import express from 'express'
import {
    getBasket,
    createBasketForCustomer,
    addProductToBasket,
    removeProductFromBasket,
    addCustomer
} from './customers.controller.js'


export const customersRouter = express.Router()

customersRouter.post("/customers", addCustomer)

customersRouter.get("/customers/:customerId/baskets", getBasket)

customersRouter.post("/customers/:customerId/baskets", createBasketForCustomer)

customersRouter.patch("/customers/:customerId/baskets/products/:productId", addProductToBasket)

customersRouter.delete("/customers/:customerId/baskets/products/:productId", removeProductFromBasket)

