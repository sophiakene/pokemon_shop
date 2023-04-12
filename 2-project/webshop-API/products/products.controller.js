import * as productsModel from "./products.model.js"
import { errorCauses } from "../errors.js"

export async function getAllProducts(req, res) {
    try {
        const products = await productsModel.getAllProducts()
        res.json(products)
    }

    catch (error) {
        if (error.cause === errorCauses.PRODUCTS_NOT_EXIST) {
            res.status(404).send({ error: error.message })
        }
        else {
            res.status(400).send({ error: error.message })

    }
}
}

///
export async function getProductCategories(req, res) {
    try {
        const categories = await productsModel.getCategories()
        res.json(categories)
    }

    catch (error) {
        if (error.cause === errorCauses.CATEGORIES_NOT_EXIST) {
            res.status(404).send({ error: error.message })
        }
        else {
            res.status(400).send({ error: error.message })

    }
}
}


export async function getProductsFromCategory(req, res) {
    try {
        const productsFromCategory = await productsModel.getProductsFromCategory()
        res.json(productsFromCategory)
    }

    catch (error) {
        if (error.cause === errorCauses.CATEGORIY_NOT_EXISTS) {
            res.status(404).send({ error: error.message })
        }
        else {
            res.status(400).send({ error: error.message })

    }
}
}


export async function getProduct(req, res) {
    try {
        const productId = req.params.productId
        const product = await productsModel.getProduct(productId)
        res.json(product)
    }

    catch (error) {
        if (error.cause === errorCauses.PRODUCT_NOT_EXISTS) {
            res.status(404).send({ error: error.message })
        }
        else {
            res.status(400).send({ error: error.message })

    }
}
}
