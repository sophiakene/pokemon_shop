import * as fs from "fs/promises"
const PRODUCTS_FILE = "./products/products.json"
import { 
    saveToFile,
    getAllJsonData,
} from "../utilities/files.js"
import {
    getElementIndexWithId
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

