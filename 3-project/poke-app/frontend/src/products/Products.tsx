import { Container, Row, Col} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import './../css/pokecard.css'
import { useContext, useState, createContext } from "react"
import { PokemonContext} from "../Header"
import 'font-awesome/css/font-awesome.min.css'
import { pokeTypes, pokeSizes} from "../consts"
import { PokeCard } from "./PokeCard"
import { FilterSideBar } from "./filterSideBar/FilterSideBar"


export const TypeContext = createContext({
    typeCheckedState: [] as boolean[],
    setTypeCheckedState: (typeCheckedState: boolean[]) => {}
})

export const SizeContext = createContext({
    sizeCheckedState: [] as boolean[],
    setSizeCheckedState: (sizeCheckedState: boolean[]) => {}
})

export function Products() {
    const { pokemon } = useContext(PokemonContext)

    const [typeCheckedState, setTypeCheckedState] = useState(new Array(pokeTypes.length).fill(false))
    const [sizeCheckedState, setSizeCheckedState] = useState(new Array(pokeSizes.length).fill(false))
    
    const typeContext = { typeCheckedState, setTypeCheckedState }
    const sizeContext = { sizeCheckedState, setSizeCheckedState }
    
    function getPokemonCards() {
        const checkedTypes = pokeTypes.filter((type, index) => typeCheckedState[index])
        const checkedSizes = pokeSizes.filter((size, index) => sizeCheckedState[index])
        const noTypesAreChecked = typeCheckedState.every(typeIsChecked => !typeIsChecked)
        const noSizesAreChecked = sizeCheckedState.every(sizeIsChecked => !sizeIsChecked)

        const pokemonCards =
            pokemon.map((pokemon, index) => { 
                const typeFound = checkedTypes.some(pokemonType => pokemon.type.indexOf(pokemonType) >= 0)
                const sizeFound = checkedSizes.includes(pokemon.sizeCategory)

                if ((typeFound || noTypesAreChecked) && (sizeFound || noSizesAreChecked)) {
                    return (
                        <div key={pokemon.name}>
                            <PokeCard index={index}/>
                        </div>
                    )
                } else {
                    return <></>
                }
            })
        return pokemonCards
    }

    return (
        <Container fluid>
            <Row>
                <Col className="" sm={3}>
                    <TypeContext.Provider value={typeContext}>
                        <SizeContext.Provider value={sizeContext}>
                            <FilterSideBar />
                        </SizeContext.Provider>
                    </TypeContext.Provider>
                </Col>
                <Col sm={1}></Col>
                <Col sm={5} className="mt-5" style={{ padding: 0 }} id="card-box">
                    <h2>Pokémon</h2>
                    {getPokemonCards()}
                </Col>
                <Col sm={3}>
                </Col>
            </Row>
        </Container>
    );
}



















