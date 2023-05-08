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


export async function getCategories() {
    const products = await getAllProducts();
    var types = [];
    var sizeCategory = [];

    products.forEach(product => product.type.forEach(type => types.push(type)));
    products.forEach(product => sizeCategory.push(product.sizeCategory));

    var types_set = [... new Set(types)]
    var sizeCategory_set = [... new Set(sizeCategory)]
    return {"type": types_set, "sizeCategory": sizeCategory_set}
}


export async function getProductsFromCategory(genericCategory, specificCategory) {
    const products = await getAllProducts();
    var productsFromCategory = [];

    if (genericCategory === "type") {
        for (var i=0; i < products.length; i++) {
            if (products[i].type.includes(specificCategory)) {
                productsFromCategory.push(products[i])
            }
        }
    }
    else if (genericCategory === "sizeCategory") {
        for (var i=0; i<products.length; i++) {
            if (products[i].sizeCategory.includes(specificCategory)) {
                productsFromCategory.push(products[i])
            }
        }
    }
    return productsFromCategory
}


export async function getProduct(productId) {
    const products = await getAllProducts();
    return products[parseInt(productId)-1]
}


