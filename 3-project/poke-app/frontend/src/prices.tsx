export function getSalePrice(pokemonName: string, price: number) {
    switch(pokemonName) {
        case "Pikachu": 
        case "Bulbasaur":
        case "Diglett":
            return String(price / 2) + " (reduced 50%!)"
        default: 
            return price
    }
}
