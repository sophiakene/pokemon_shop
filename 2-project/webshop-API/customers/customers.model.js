import { 
    getAllProducts, 
    findProduct,
    getIndexIfProductExists,
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
import {
    ERROR_CAUSES
    // CUSTOMER_NOT_EXISTS,
} from "../errors.js"
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

function getIndexIfCustomerExists(customers, customerId) {
    const customerIndex = findCustomer(customers, customerId)
    const customerNotExists = notExistsInCollection(customerIndex)
    if (customerNotExists) {
        throw new Error(
            `Customer with id ${customerId} does not exist`,
            { cause: ERROR_CAUSES.CUSTOMER_NOT_EXISTS },
        )
    }
    else {
        return customerIndex
    }
}

export async function addBasket(customerId) {
    try {
        let customers = await getAllCustomers()
        const customerIndex = getIndexIfCustomerExists(customers, customerId)
        let customer = customers[customerIndex]
        if (customerHasBasket(customer)) {
            throw new Error(
                `Customer with id ${customerId} already has a basket`, 
                { cause: ERROR_CAUSES.BASKET_EXISTS },
            )
        }
        customer.basket = []
        customers[customerIndex] = customer
        await saveCustomers(customers)
    } catch (error) {
        // console.log({error:error})
        throw error
    }
}

function addToBasket(basket, productId, amount) {
    const productIndex = findProduct(basket, "productId", productId)
    const productIsInBasket = existsInCollection(productIndex)
    if (productIsInBasket) {
        basket[productIndex].amount += newAmount
    }
    else {
        basket.push({productId: productId, amount: amount})
    }
    return basket
}

function removeFromBasket(basket, productId, amount) {
    const productIndex = findProduct(basket, "productId", productId)
    const productIsInBasket = existsInCollection(productIndex)
    if (productIsInBasket) {
        const newAmount = basket[productIndex].amount - amount
        if (newAmount <= 0) {
            basket.splice(productIndex, 1)
        } else {
            basket[productIndex].amount = newAmount
        }
    }
    return basket
}

function checkProductExists(products, productId) {
    return getIndexIfProductExists(products, productId)
}

export async function addProductToBasket(customerId, productId, amount) {
    try {
        if (amount <= 0) { 
            throw new Error(
                'Amount must be positive', 
                { cause: ERROR_CAUSES.AMOUNT_NOT_POSITIVE}) 
            }

        let customers = await getAllCustomers()
        const customerIndex = getIndexIfCustomerExists(customers, customerId)
        let customer = customers[customerIndex]

        const products = await getAllProducts()
        checkProductExists(products, productId)
        
        if (customerHasBasket(customer)) {
            let basket = customer.basket
            let newBasket = addToBasket(basket, productId, amount)
            customer.basket = newBasket
            customers[customerIndex] = customer
            await saveCustomers(customers)
            return getBasket(customerId)
        } else {
            throw new Error(
                `Customer with id ${customerId} does not have a basket`,
                { cause: ERROR_CAUSES.BASKET_NOT_EXISTS})
        }
    } catch(error) { 
        throw error 
    }
}

export async function removeProuductFromBasket(customerId, productId, amount) {
    try {
        if (amount < 0) { 
            throw new Error(
                'Amount must be positive', 
                { cause: ERROR_CAUSES.AMOUNT_NOT_POSITIVE}) 
            }

        const customers = await getAllCustomers()
        const customerIndex = getIndexIfCustomerExists(customers, customerId)
        const customer = customers[customerIndex]

        let products = await getAllProducts()
        checkProductExists(products, productId)

        if (customerHasBasket(customer)) {
            let basket = customer.basket
            let newBasket = removeFromBasket(basket, productId, amount)
            customer.basket = newBasket
            customers[customerIndex] = customer
            await saveCustomers(customers)
            return getBasket(customerId)
        } else {
            throw new Error(
                `Customer with id ${customerId} does not have a basket`,
                { cause: ERROR_CAUSES.BASKET_NOT_EXISTS})
        }
    } catch(error) {
        throw error
    }
}

export async function getBasket(customerId) {
    try {
        let customers = await getAllCustomers()
        const customerIndex = getIndexIfCustomerExists(customers, customerId)
        let customer = customers[customerIndex]
        if (customerHasBasket(customer)) {
            const basket = customer.basket
            const completeBasket = await getCompleteBasket(basket)
            return {
                customerId: customerId, 
                basket: completeBasket
            }
        } else {
            throw new Error(
                `Customer with id ${customerId} does not have a basket`,
                { cause: ERROR_CAUSES.BASKET_NOT_EXISTS})
        }
    }
    catch(error) {
        throw error
    }
}

async function getCompleteBasket(basket) {
    const products = await getAllProducts()
    const completeBasket = basket.map(
        basketProduct => {
            let productIndex = findProduct(products, "id", basketProduct.productId)
            return {
                amount: basketProduct.amount,
                product: products[productIndex] 
            }
    })
    return completeBasket
}
