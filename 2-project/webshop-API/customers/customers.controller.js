import * as customerModel from "./customers.model.js"
import { errorCauses } from "../errors.js"

export async function getBasket(req, res) {
    try {
        const customerId = parseInt(req.params.customerId)
        const basket = await customerModel.getBasket(customerId)
        res.json(basket)
    }
    catch(error) {
        if (error.cause === errorCauses.CUSTOMER_NOT_EXISTS ||
            error.cause === errorCauses.BASKET_NOT_EXISTS) {
            res.status(404).send(error.message)
        }
        else {
            res.status(400).send(error.message)
        }
    }
}

export async function createBasketForCustomer(req, res) {
    try {
        const customerId = parseInt(req.params.customerId)
        await customerModel.addBasket(customerId)
        res.end()
    } catch(error) {
        if (error.cause === errorCauses.CUSTOMER_NOT_EXISTS ||
            error.cause === errorCauses.BASKET_EXISTS)  {
            res.status(404).send(error.message)
        }
        else {
            res.status(400).send(error.message)
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
        if (error.cause === errorCauses.CUSTOMER_NOT_EXISTS ||
            error.cause === errorCauses.BASKET_NOT_EXISTS ||
            error.cause === errorCauses.AMOUNT_NOT_POSITIVE ||
            error.cause === errorCauses.PRODUCT_NOT_EXISTS) {
            res.status(404).send(error.message)
        }
        else {
            res.status(400).send(error.message)
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
        if (error.cause === errorCauses.CUSTOMER_NOT_EXISTS ||
            error.cause === errorCauses.BASKET_NOT_EXISTS ||
            error.cause === errorCauses.AMOUNT_NOT_POSITIVE,
            error.cause === errorCauses.PRODUCT_NOT_EXISTS) {
            res.status(404).send(error.message)
        }
        else {
            res.status(400).send(error.message)
        }
    }
}