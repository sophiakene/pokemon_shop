import * as fs from "fs/promises"
const PRODUCTS_FILE = "./products/products.json"
import { 
    saveToFile,
    getAllJsonData,
} from "../utilities/files.js"
import {
    getElementIndexWithId,
    notExistsInCollection,
    existsInCollection,
} from "../utilities/arrays.js"

export async function getAllProducts() {
    return getAllJsonData(PRODUCTS_FILE)
}

async function saveProducts(products) {
    saveToFile(PRODUCTS_FILE, products)
}

export function findProduct(products, property, productId) {
    return getElementIndexWithId(products, property, productId)
}

export function getIndexIfProductExists(products, productId) {
    const productIndex = findProduct(products, "id", productId)
    const productNotExists = notExistsInCollection(productIndex)
    if (productNotExists) {
        throw new Error(`Product with id ${productId} does not exist`)
    }
    return productIndex
}