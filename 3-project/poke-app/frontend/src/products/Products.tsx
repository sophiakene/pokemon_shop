// eslint-disable-next-line
import { Container, Row, Col} from "react-bootstrap"
import  { createContext } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import './pokecard.css'
import { useContext, useState } from "react"
import { PokemonContext} from "../header"
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
    
    const pokemonCards = 
        pokemon.map((pokemon, index) => { 

            const checkedTypes = pokeTypes.filter((pokemonType, index) => {
                return typeCheckedState[index]
            })

            const checkedSizes = pokeSizes.filter((size, index) => {
                return sizeCheckedState[index]
            })

            function getPokeCard() {
                return (
                    <div key={pokemon.name}>
                        <PokeCard index={index}/>
                    </div>
                )
            }

            const noTypesAreChecked = typeCheckedState.every(typeIsChecked => !typeIsChecked)
            const noSizesAreChecked = sizeCheckedState.every(sizeIsChecked => !sizeIsChecked)

            const typeFound = checkedTypes.some(pokemonType => pokemon.type.indexOf(pokemonType) >= 0)
            const sizeFound = checkedSizes.includes(pokemon.sizeCategory)

            //changed back to the first version of the logic, the other one 
            // (ie 2nd version below) did not filter the right way 
            if ( (typeFound || noTypesAreChecked) && (sizeFound || noSizesAreChecked) ){
                    return getPokeCard()
            } else {
                return <></>
            }

            //2nd version:
            // if (noTypesAreChecked && noSizesAreChecked) {
            //     return getPokeCard()
            // } else {
            //     const typeFound = checkedTypes.some(pokemonType => pokemon.type.indexOf(pokemonType) >= 0)
            //     const sizeFound = checkedSizes.includes(pokemon.sizeCategory)
            //     if (typeFound && sizeFound) { return getPokeCard() }
            // }

        })
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
                    {pokemonCards}
                </Col>
                <Col sm={3}>
                </Col>
            </Row>
        </Container>
    );
}



















