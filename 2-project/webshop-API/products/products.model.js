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
import { errorCauses } from "../errors.js"

export async function getAllProducts() {
    return getAllJsonData(PRODUCTS_FILE)
}

async function saveProducts(products) {
    saveToFile(PRODUCTS_FILE, products)
}

export function getProductIndex(products, property, productId) {
    return getElementIndexWithId(products, property, productId)
}

export function getIndexIfProductExists(products, productId) {
    const productIndex = getProductIndex(products, "id", productId)
    const productNotExists = notExistsInCollection(productIndex)
    if (productNotExists) {
        throw new Error(
            `Product with id ${productId} does not exist`,
            { cause: errorCauses.PRODUCT_NOT_EXISTS}
        )
    }
    return productIndex
}