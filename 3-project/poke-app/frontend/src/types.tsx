
export type Pokemon = {
    id: number
    name: string
    size: number
    price: number
    sizeCategory: string
    type: string[]
    info: string
}

export type CartElement = {
    amount: number
    product: Pokemon
}

export type Cart = CartElement[]
