import { 
    getAllProducts, 
    findProduct,
} from "../products/products.model.js"
import { 
    saveToFile,
    getAllJsonData,
} from "../utilities/files.js"
import {
    existsInCollection,
    notExistsInCollection,
    getElementIndexWithId,
} from "../utilities/arrays.js"
const CUSTOMERS_FILE = "./customers/customers.json"

export async function getAllCustomers() {
    return getAllJsonData(CUSTOMERS_FILE)
}

async function saveCustomers(customers) {
    saveToFile(CUSTOMERS_FILE, customers)
}

function findCustomer(customers, customerId) {
    return getElementIndexWithId(customers, "id", customerId)
}

function customerHasBasket(customer) {
    return customer.hasOwnProperty('basket')
}

function getCustomerIfExists(customers, customerId) {
    const customerIndex = findCustomer(customers, customerId)
    const customerNotExists = notExistsInCollection(customerIndex)
    if (customerNotExists) {
        throw new Error(`Customer with id ${customerId} does not exist`)
    }
    else {
        return customerIndex
    }
}

export async function addBasket(customerId) {
    try {
        let customers = await getAllCustomers()
        const customerIndex = getCustomerIfExists(customers, customerId)
        let customer = customers[customerIndex]
        if (customerHasBasket(customer)) {
            throw new Error(`Customer with id ${customerId} already has a basket`)
        }
        customer.basket = []
        customers[customerIndex] = customer
        await saveCustomers(customers)
    } catch (error) {
        throw error
    }
}


function updateBasket(basket, productId, amount) {
    const productIndex = findProduct(basket, "productId", productId)
    const productIsInBasket = existsInCollection(productIndex)
    if (productIsInBasket) {
        basket[productIndex].amount += amount
    }
    else {
        basket.push({productId: productId, amount: amount})
    }
    return basket
}

export async function addProductToBasket(customerId, productId, amount) {
    try {
        if (amount <= 0) {
            throw new Error('Cannot buy zero or negative amount of pokémon')
        }
        let customers = await getAllCustomers()
        const customerIndex = getCustomerIfExists(customers, customerId)
        let customer = customers[customerIndex]

        let products = await getAllProducts()
        const productIndex = findProduct(products, "id", productId)
        const productNotExists = notExistsInCollection(productIndex)
        if (productNotExists) {
            throw new Error(`Product with id ${productId} does not exist`)
        }
        if (customerHasBasket(customer)) {
            let basket = customer.basket
            let newBasket = updateBasket(basket, productId, amount)
            customer.basket = newBasket
            customers[customerIndex] = customer
            await saveCustomers(customers)
        } else {
            throw new Error(`Customer with id ${customerId} does not have a basket`)
        }

    } catch(error) {
        throw error
    }
}

export async function getBasket(customerId) {
    try {
        let customers = await getAllCustomers()
        const customerIndex = getCustomerIfExists(customers, customerId)
        let customer = customers[customerIndex]
        if (customerHasBasket(customer)) {
            const basket = customer.basket
            const completeBasket = await getCompleteBasket(basket)
            return {
                customerId: customerId, 
                basket: completeBasket
            }
        } else {
            throw new Error(`Customer with id ${customerId} does not have a basket`)
        }
    }
    catch(error) {
        throw error
    }
}

async function getCompleteBasket(basket) {
    const products = await getAllProducts()
    const completeBasket = basket.map(basketProduct => {
        let productIndex = findProduct(products, "id", basketProduct.productId)
        return {
            amount: basketProduct.amount,
            product: products[productIndex] 
        }
    })
    return completeBasket
}
