
export type Pokemon = {
    id: string
    name: string
    size: number
    price: number
    sizeCategory: string
    type: string[]
    info: string
}

export type CartElement = {
    amount: number
    pokemon: Pokemon
}

export type Cart = CartElement[]
