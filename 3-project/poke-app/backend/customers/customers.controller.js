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
        res.status(201).send()
    } catch(error) {
        if (error.cause === errorCauses.CUSTOMER_NOT_EXISTS ||
            error.cause === errorCauses.BASKET_EXISTS)  {
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
        if (error.cause === errorCauses.CUSTOMER_NOT_EXISTS ||
            error.cause === errorCauses.BASKET_NOT_EXISTS ||
            error.cause === errorCauses.AMOUNT_NOT_POSITIVE ||
            error.cause === errorCauses.PRODUCT_NOT_EXISTS) {
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
        if (error.cause === errorCauses.CUSTOMER_NOT_EXISTS ||
            error.cause === errorCauses.BASKET_NOT_EXISTS ||
            error.cause === errorCauses.AMOUNT_NOT_POSITIVE,
            error.cause === errorCauses.PRODUCT_NOT_EXISTS) {
            res.status(404).send({ error: error.message })
        }
        else {
            res.status(400).send({ error: error.message })
        }
    }
}

export async function cleanUpBasket(req, res) {
    try {
    const mail = req.params.mail
    const customer = await customerModel.cleanUpBasket(mail)
    res.json(customer)
    } catch(error) {
        res.status(400).send({ error: error.message})
    }
}

export async function addCustomer(req, res) {
    try {
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const mail = req.body.mail
        const customer = await customerModel.addCustomer(firstName, lastName, mail)
        res.json(customer)
    } catch(error) {
        error.cause === errorCauses.CUSTOMER_EXISTS
        ? res.status(404).send({ error: error.message })
        : res.status(400).send({ error: error.message })
    }
}

export async function getCustomerFromMail(req, res) {
    try {
        const mail = req.params.mail
        const customer = await customerModel.getCustomerFromMail(mail)
        res.json(customer)
    } catch(error) {
        error.cause === errorCauses.CUSTOMER_NOT_EXISTS
        ? res.status(404).send({ error: error.message })
        : res.status(400).send({ error: error.message })
    }
}

