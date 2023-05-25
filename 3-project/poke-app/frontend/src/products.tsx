// eslint-disable-next-line
import { Container, Row, Col, Button, Nav, Card, Collapse, Form, ListGroup, Badge, Accordion, AccordionButton } from "react-bootstrap"
import  { createContext } from "react"
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import './pokecard.css'
import SidebarMenu from 'react-bootstrap-sidebar-menu'
import { useContext, useEffect, useState } from "react"
import { PokemonContext, UserContext, CartContext } from "./header"
import { Pokemon } from "./types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import 'font-awesome/css/font-awesome.min.css'
import { pokeTypes, pokeSizes, pokeColours } from "./consts"
import AccordionHeader from "react-bootstrap/esm/AccordionHeader"
import AccordionBody from "react-bootstrap/esm/AccordionBody"
//import { library } from '@fortawesome/fontawesome-svg-core'; 
//library.add(faShoppingCart)


function PokeCard({ index } : { index: number }) {
    const { pokemon } = useContext(PokemonContext)
    const { user, id } = useContext(UserContext)
    const { cart, setCart } = useContext(CartContext)

    function handleAddToBacket() {
        // Call backend to add product
        fetch(`http://localhost:3005/customers/${id}/baskets/products/${pokemon[index].id}`, {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ amount: 1})
        })
        .then(response => response.json() )
        // .then(shoppingCart => setCart(shoppingCart))
        .then(shoppingCart => setCart(shoppingCart.basket))
        .catch(error => console.log({ errorAddingProductToShoppingCart: error }))
    }

    if( pokemon.length !== 0 ) {
        // changed the url as react-router-dom uses very specific path structure for placeholders
        const detailedProduct = `/detailed_product/${index}`
        const image = `/data/poke_images/${pokemon[index].name.toLowerCase()}.avif`
        return (
            <Card bg='light' className='mb-3' // margin bottom sizing of 3
                key={'Light'}>
                <Row className='no-gutters'>
                    <Col md={3}>
                        <Card.Body>
                        <Link to={detailedProduct}>
                            <Card.Img style={{width:"90%"}} src={image} alt="Pokemon" />
                        </Link>
                        </Card.Body>
                    </Col>
                    <Col md={5}>
                        <Card.Body>
                            <Link to={detailedProduct}>
                                <Card.Title>{pokemon[index].name}</Card.Title>
                            </Link>
                            <Card.Text>Price: {pokemon[index].price} DKK</Card.Text>
                        </Card.Body>
                    </Col>
                    <Col md={4} className="mt-auto">
                        <Card.Body>
                            <Button 
                                type='submit' 
                                variant='danger'
                                onClick={handleAddToBacket}
                                id="{pokemon[index].name.toLowerCase()}"
                                style={{maxWidth:"100%"}} // so button does not overflow card borders when shrinking
                            >
                                <FontAwesomeIcon icon={faShoppingCart}/> 
                                Add to shopping cart
                            </Button>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        );
    } else { return (<div></div>) }
}

const TypeContext = createContext({
    typeCheckedState: [] as boolean[],
    setTypeCheckedState: (typeCheckedState: boolean[]) => {}
})

const SizeContext = createContext({
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
                if (typeCheckedState[index]) {
                    return pokemonType
                }
            })
            const checkedSizes = pokeSizes.filter((size, index) => {
                if (sizeCheckedState[index]) {
                    return size
                }
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

            //3rd version:
            if (typeFound || noTypesAreChecked ){
                if (sizeFound || noSizesAreChecked) {
                    return getPokeCard()
                }
            }

            //2nd version:
            // if (noTypesAreChecked && noSizesAreChecked) {
            //     return getPokeCard()
            // } else {
            //     const typeFound = checkedTypes.some(pokemonType => pokemon.type.indexOf(pokemonType) >= 0)
            //     const sizeFound = checkedSizes.includes(pokemon.sizeCategory)
            //     if (typeFound && sizeFound) { return getPokeCard() }
            // }

            //1st version:
            /*
            if (typeFound || noTypesAreChecked ){
                if (sizeFound || noSizesAreChecked) {
                    return (
                        <div key={pokemon.name}>
                            <PokeCard index={index}/>
                        </div>
                    )
                }
            } */
        })
    return (
        <Container fluid>
            <Row>
                <Col className="" sm={3}>
                    <TypeContext.Provider value={typeContext}>
                        <SizeContext.Provider value={sizeContext}>
                            <ProductsFilterBar />
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


function TypeCheckBox({name, id, color, index} : {name: string, id: string, color:string, index:number}) {
    const { typeCheckedState, setTypeCheckedState} = useContext(TypeContext)

    function handleOnChange(pos: number) {
        const updatedTypeCheckedState = typeCheckedState.map((item, i) => {
            if (i === pos) {
                return !item
            } else {
                return item
            }
        })
        setTypeCheckedState(updatedTypeCheckedState)
    }
    return (
        <Form.Check
            name={name}
            id={id} 
            // label={<Badge style={{backgroundColor:"red"}}>{id}</Badge>}
            label={
                <div className="badge" style={{backgroundColor:color}}>
                    {id}
                </div>}
            checked={typeCheckedState[index]}
            onChange={(() => handleOnChange(index))}
        >    
        </Form.Check>
    )
}

function SizeCheckBox({name, id, color, index} : {name: string, id: string, color:string, index:number}) {
    const { sizeCheckedState, setSizeCheckedState} = useContext(SizeContext)

    function handleOnChange(pos: number) {
        const updatedSizeCheckedState = sizeCheckedState.map((item, i) => {
            if (i === pos) {
                return !item
            } else {
                return item
            }
        })

        console.log({before: sizeCheckedState})  
        setSizeCheckedState(updatedSizeCheckedState)   
        console.log({after: sizeCheckedState})    
    }
    return (
        <Form.Check
            name={name}
            id={id} 
            label={<Badge>{id}</Badge>}
            checked={sizeCheckedState[index]}
            onChange={(() => handleOnChange(index))}
        >    
        </Form.Check>
    )
}

function AllTypeCheckBoxes() {
    const allTypeCheckBoxes = 
        pokeTypes.map((pokeType, index) => {
            const color = pokeColours[pokeType as keyof typeof pokeColours]
            return (
                <TypeCheckBox name={"type"} id={pokeType} color={color} index={index}/>
            )
        })
    return (
        <div>
            {allTypeCheckBoxes}
        </div>
    )
}

function AllSizeCheckBoxes() {
    const allSizeCheckBoxes = 
        pokeSizes.map((pokeSize, index) => {
            const color = "black"
            return (
                <SizeCheckBox name={"type"} id={pokeSize} color={color} index={index} />
            )
        })
    return (
        <div>
            {allSizeCheckBoxes}
        </div>
    )
}

function RemoveFilterButton() {
    const { typeCheckedState, setTypeCheckedState } = useContext(TypeContext)
    const { sizeCheckedState, setSizeCheckedState} = useContext(SizeContext)

    function resetFilters() {
        setTypeCheckedState(new Array(typeCheckedState.length).fill(false))
        setSizeCheckedState(new Array(sizeCheckedState.length).fill(false))
    }    
    return (
        <Button
            type="button"
            className="btn btn-danger"
            size="sm"
            style={{justifyContent: 'end'}}
            onClick={resetFilters}>
            Clear all
        </Button>
    )
}


function FilterAccordion() {
    return (
        <Accordion alwaysOpen style={{paddingBottom:"20px"}}>
            <Accordion.Item eventKey="0">
                <AccordionHeader>
                    <h5>
                        Type
                    </h5>
                </AccordionHeader>
                <AccordionBody>
                    <AllTypeCheckBoxes/>
                </AccordionBody>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <AccordionHeader>
                    <h5>
                        Size
                    </h5>
                </AccordionHeader>
                <AccordionBody>
                    <AllSizeCheckBoxes/>
                </AccordionBody>
            </Accordion.Item>
        </Accordion>
    )
}

export function ProductsFilterBar() {

    return (
        <SidebarMenu style={{height:"100%", textAlign:"left"}} bg="light" variant="dark" className="border">
            <SidebarMenu.Body>
                <div style={{paddingLeft:"20px", paddingRight:"20px", paddingTop:"50px"}}>
                    <h3 >
                        Filters <RemoveFilterButton/>
                    </h3>
                    <FilterAccordion/>
                </div>
            </SidebarMenu.Body>
        </SidebarMenu>
    );
}

