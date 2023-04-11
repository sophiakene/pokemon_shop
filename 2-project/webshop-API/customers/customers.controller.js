import * as customerModel from "./customers.model.js"

export async function getBasketContent(req, res) {

}

export async function createBasketForCustomer(req, res) {
    try {
        const customerId = parseInt(req.params.customerId)
        await customerModel.addBasket(customerId)
        res.end()

    } catch(error) {
        res.status(400).send(error.message)
    }
    
}

export async function addProductToBasket(req, res) {
    try {
        const customerId = parseInt(req.params.customerId)
        const productId = parseInt(req.params.productId)
        const amount = req.body.amount
        console.log({cid: customerId, pid: productId, amount: amount})
        await customerModel.addProductToBasket(customerId, productId, amount)
        res.end()

    } catch(error) {
        res.status(400).send(error.message)
    }
    
}

export async function removeProductFromBasket(req, res) {
    
}