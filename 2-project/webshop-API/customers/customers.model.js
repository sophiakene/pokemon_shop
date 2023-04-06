import * as fs from "fs/promises"
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
            throw new Error(
                `Customer with Id:${customerId} does not exist`
            )
        }
        let customer = customers[customerIndex]
        if (customer.hasOwnProperty('basket')) {
            throw new Error(
                `Customer with Id:${customerId} already has a basket`
            )
        } else {
            customer.basket = []
            customers[customerIndex] = customer
            await saveCustomers(customers)
        }

    } catch (error) {
        throw error
    }
}
