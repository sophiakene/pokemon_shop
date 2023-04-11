import * as customerModel from "./customers.model.js"
import {
    ERROR_CAUSES
} from "../errors.js"

export async function getBasket(req, res) {
    try {
        const customerId = parseInt(req.params.customerId)
        const basket = await customerModel.getBasket(customerId)
        res.json(basket)
    }
    catch(error) {
        if (error.cause === ERROR_CAUSES.CUSTOMER_NOT_EXISTS ||
            error.cause === ERROR_CAUSES.BASKET_NOT_EXISTS) {
            res.status(404).send({ error: error.message })
        }
        else {
            res.status(400).send({ error: error.message })
        }
    }
}

export async function createBasketForCustomer(req, res) {
    try {
        const customerId = parseInt(req.params.customerId)
        await customerModel.addBasket(customerId)
        res.end()
    } catch(error) {
        if (error.cause === ERROR_CAUSES.CUSTOMER_NOT_EXISTS ||
            error.cause === ERROR_CAUSES.BASKET_EXISTS)  {
            res.status(404).send({ error: error.message })
        }
        else {
            res.status(400).send({ error: error.message })
        }
        
    }
}

export async function addProductToBasket(req, res) {
    try {
        const customerId = parseInt(req.params.customerId)
        const productId = parseInt(req.params.productId)
        const amount = req.body.amount
        const basket = await customerModel.addProductToBasket(customerId, productId, amount)
        res.json(basket)
    } catch(error) {
        if (error.cause === ERROR_CAUSES.CUSTOMER_NOT_EXISTS ||
            error.cause === ERROR_CAUSES.BASKET_NOT_EXISTS ||
            error.cause === ERROR_CAUSES.AMOUNT_NOT_POSITIVE ||
            error.cause === ERROR_CAUSES.PRODUCT_NOT_EXISTS) {
            res.status(404).send({ error: error.message })
        }
        else {
            res.status(400).send({ error: error.message })
        }
        
    }
}

export async function removeProductFromBasket(req, res) {
    try {
        const customerId = parseInt(req.params.customerId)
        const productId = parseInt(req.params.productId)
        const amount = req.body.amount
        const basket = await customerModel.removeProuductFromBasket(customerId, productId, amount)
        res.json(basket)
    } catch(error) {
        if (error.cause === ERROR_CAUSES.CUSTOMER_NOT_EXISTS ||
            error.cause === ERROR_CAUSES.BASKET_NOT_EXISTS ||
            error.cause === ERROR_CAUSES.AMOUNT_NOT_POSITIVE,
            error.cause === ERROR_CAUSES.PRODUCT_NOT_EXISTS) {
            res.status(404).send({ error: error.message })
        }
        else {
            res.status(400).send({ error: error.message })
        }
    }
}