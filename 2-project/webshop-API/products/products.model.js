import * as fs from "fs/promises"
const PRODUCTS_FILE = "./products/products.json"

function fileNotExists(errorCode) {
    return errorCode === "ENOENT"
}

export async function getAllProducts() {
    try {
        let productsTxt = await fs.readFile(PRODUCTS_FILE)
        let products = JSON.parse(productsTxt)
        return products
    } 
    catch (error) {
        if (fileNotExists(error.code)) {
            await saveProducts([]) // create a new file with ampty array
            return []
        }
        else throw error
    }
  }

  async function saveProducts(products = []) {
    const productsJSON = JSON.stringify(products)
    await fs.writeFile(PRODUCTS_FILE, productsJSON)
  }

  export function findProduct(products, productId) {
    return products.findIndex(
        currentProduct => currentProduct.id === productId
    )
  }