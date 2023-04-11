import * as fs from "fs/promises"
import { 
    getAllProducts, 
    findProduct 
} from "../products/products.model.js"
const CUSTOMERS_FILE = "./customers/customers.json"


export async function getAllCustomers() {
    try {
        let customersTxt = await fs.readFile(CUSTOMERS_FILE)
        let customers = JSON.parse(customersTxt)
        return customers
        } catch (error) {
        // file does not exits
        if (error.code === "ENOENT") {
            await saveCustomers([]) // create a new file with ampty array
            return []
        } // cannot handle this exception, so rethrow
        else throw error
    }
  }

async function saveCustomers(customers = []) {
    const customersJSON = JSON.stringify(customers)
    await fs.writeFile(CUSTOMERS_FILE, customersJSON)
  }

function findCustomer(customers, customerId) {
    return customers.findIndex(
        currentCustomer => currentCustomer.id === customerId
    )
  }

export async function addBasket(customerId) {
    try {
        let customers = await getAllCustomers()
        const customerIndex = findCustomer(customers, customerId)
        const customerNotExists = customerIndex === -1
        if (customerNotExists) {
            throw new Error(`Customer with id ${customerId} does not exist`)
        }
        let customer = customers[customerIndex]
        if (customer.hasOwnProperty('basket')) {
            throw new Error(`Customer with id ${customerId} already has a basket`)
        } else {
            customer.basket = []
            customers[customerIndex] = customer
            await saveCustomers(customers)
        }

    } catch (error) {
        throw error
    }
}

function updateBasket(basket, productId, amount) {
    const productIndex = basket.findIndex(
        currentProduct => currentProduct.productId === productId
    )

    if (productIndex === -1) {
        basket.push({productId: productId, amount: amount})
    }
    else {
        basket[productIndex].amount += amount
    }

    
    return basket
}

export async function addProductToBasket(customerId, productId, amount) {
    try {
        if (amount <= 0) {
            throw new Error('Cannot buy zero or negative amount of pokémon')
        }
        let customers = await getAllCustomers()
        const customerIndex = findCustomer(customers, customerId)
        const customerNotExists = customerIndex === -1
        if (customerNotExists) {
            throw new Error(`Customer with id ${customerId} does not exist`)
        }
        let products = await getAllProducts()
        const productIndex = findProduct(products, productId)
        const productNotExists = productIndex === -1
        if (productNotExists) {
            throw new Error(`Product with id ${productId} does not exist`)
        }
        let customer = customers[customerIndex]
        if (customer.hasOwnProperty('basket')) {
            let basket = customer.basket
            let newBasket = updateBasket(basket, productId, amount)
            customer.basket = newBasket
            console.log({newBasket: newBasket})
            customers[customerIndex] = customer
            await saveCustomers(customers)
        } else {
            throw new Error(`Customer with id ${customerId} already has a basket`)
        }

    } catch(error) {
        throw error
    }
}
