import {
    getAllProducts,
    getProductIndex,
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
import { errorCauses } from "../errors.js"
const CUSTOMERS_FILE = "./customers/customers.json"


export async function getAllCustomers() {
    return getAllJsonData(CUSTOMERS_FILE)
}

async function saveCustomers(customers) {
    return saveToFile(CUSTOMERS_FILE, customers)
}

function getCustomerIndex(customers, customerId) {
    return getElementIndexWithId(customers, "id", customerId)
}

function customerHasBasket(customer) {
    return customer.hasOwnProperty('basket')
}

function getIndexIfCustomerExists(customers, customerId) {
    const customerIndex = getCustomerIndex(customers, customerId)
    const customerNotExists = notExistsInCollection(customerIndex)
    if (customerNotExists) {
        throw new Error(
            `Customer with id ${customerId} does not exist`,
            { cause: errorCauses.CUSTOMER_NOT_EXISTS },
        )
    }
    else {
        return customerIndex
    }
}

export async function getCustomerFromMail(mail) {
    const customers = await getAllCustomers()
    const customerIndex = getElementIndexWithId(customers, 'mail', mail)
    const customerNotExists = notExistsInCollection(customerIndex)
    if (customerNotExists) {
        throw new Error(
            `Customer with mail ${mail} does not exist`,
            { cause: errorCauses.CUSTOMER_NOT_EXISTS },
        )
    }
    else {
        return customers[customerIndex]
    }
}

export async function cleanUpBasket(mail) {
    const customers = await getAllCustomers()
    const customerIndex = getElementIndexWithId(customers, 'mail', mail)
    const customerExists = existsInCollection(customerIndex)
    if (customerExists) {
        let customer = customers[customerIndex]
        customer.basket = []
        customers[customerIndex] = customer
        await saveCustomers(customers)
        return customer
    } else {
        throw new Error(
            `Customer with mail ${mail} does not exist`,
            { cause: errorCauses.CUSTOMER_NOT_EXISTS },
        ) 
    }
}

export async function addCustomer(firstName, lastName, mail) {
    try {
        let customers = await getAllCustomers()
        const mailIsInUse = getElementIndexWithId(customers, 'mail', mail)
        if (existsInCollection(mailIsInUse)) { 
            throw new Error(
                `Mail ${mail} is already in use`,
                { cause: errorCauses.MAIL_ALREADY_IN_USE },
            )
        }
        const customer = {
            id: customers.length,
            firstName: firstName,
            lastName: lastName,
            mail: mail,
        }
        customers.push(customer)
        await saveCustomers(customers)
        return customer
    } catch(error) { throw error }
}

export async function addBasket(customerId) {
    try {
        let customers = await getAllCustomers()
        const customerIndex = getIndexIfCustomerExists(customers, customerId)
        let customer = customers[customerIndex]
        if (customerHasBasket(customer)) {
            throw new Error(
                `Customer with id ${customerId} already has a basket`,
                { cause: errorCauses.BASKET_EXISTS },
            )
        }
        customer.basket = []
        customers[customerIndex] = customer
        await saveCustomers(customers)
    } catch (error) {
        throw error
    }
}

function addToBasket(basket, productId, amount) {
    const productIndex = getProductIndex(basket, "productId", productId)
    const productIsInBasket = existsInCollection(productIndex)
    if (productIsInBasket) {
        basket[productIndex].amount += amount
    }
    else {
        basket.push({productId: productId, amount: amount})
    }
    return basket
}

function removeFromBasket(basket, productId, amount) {
    const productIndex = getProductIndex(basket, "productId", productId)
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
                { cause: errorCauses.AMOUNT_NOT_POSITIVE}
            )
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
                { cause: errorCauses.BASKET_NOT_EXISTS}
            )
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
                { cause: errorCauses.AMOUNT_NOT_POSITIVE}
            )
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
                { cause: errorCauses.BASKET_NOT_EXISTS}
            )
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
                { cause: errorCauses.BASKET_NOT_EXISTS}
            )
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
            let productIndex = getProductIndex(products, "id", basketProduct.productId)
            return {
                amount: basketProduct.amount,
                product: products[productIndex]
            }
    })
    return completeBasket
}
