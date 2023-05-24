// eslint-disable-next-line
import { Container, Row, Col, Button, Nav, Card, Collapse, Form, ListGroup, Badge } from "react-bootstrap"
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
import { pokeTypes, pokeSizes, pokeColors } from "./consts"
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
        // const detailedProduct = `/detailed_product.html?name=/${pokemon[index].name}`
        // changed the url as react-router-dom uses very specific path structure for placeholders
        const detailedProduct = `/detailed_product/${index}`
        const image = `/data/poke_images/${pokemon[index].name.toLowerCase()}.avif`
        return (
            <Card bg='light' className='mb-3' // margin bottom sizing of 3
                key={'Light'}>
                <Row className='no-gutters'>
                    <Col sm={3}>
                        <Link to={detailedProduct}>
                            <Card.Img src={image} alt="Pokemon" />
                        </Link>
                    </Col>
                    <Col sm={6}>
                        <Link to={detailedProduct}>
                            <Card.Title>{pokemon[index].name}</Card.Title>
                        </Link>
                        {/* <Card.Text>{pokemon[index].info}</Card.Text> */}
                        <Card.Text>Price: {pokemon[index].price} DKK</Card.Text>
                    </Col>
                    <Col sm={3}>
                        <Card.Body>
                            <Button 
                                type='submit' 
                                variant='danger'
                                onClick={handleAddToBacket}
                                id="{pokemon[index].name.toLowerCase()}"
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
            
            const checkedTypes = pokeTypes.filter((t, index) => {
                if (typeCheckedState[index]) {
                    return t
                }
            })
            const checkedSizes = pokeSizes.filter((s, index) => {
                if (sizeCheckedState[index]) {
                    return s
                }
            })
            const typeFound = checkedTypes.some(r => pokemon.type.indexOf(r) >= 0)
            const sizeFound = checkedSizes.includes(pokemon.sizeCategory)

            const noTypesChecked = typeCheckedState.every(elm => elm === false)
            const noSizesChecked = sizeCheckedState.every(elm => elm === false)
            
            
            if (typeFound || noTypesChecked){
                if ( sizeFound || noSizesChecked) {
                    return (
                        <div key={pokemon.name}>
                            <PokeCard index={index}/>
                        </div>)
                }
            } 
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
            const color = pokeColors[pokeType as keyof typeof pokeColors]
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

export function ProductsFilterBar() {
    const [openTypeFilter, setOpenTypeFilter] = useState(false)
    const [openSizeFilter, setOpenSizeFilter] = useState(false)
    // const {typeCheckedState, setTypeCheckedState} = useContext(TypeContext)
    // console.log({typeCheckedState: typeCheckedState})

    return (
        <SidebarMenu style={{height:"100%", textAlign:"left"}} bg="light" variant="dark" className="">
            <SidebarMenu.Body>
                <br></br>
                <br></br>
                <h3 className="borderBottomWidth">
                    Filters 
                </h3>
                <br></br>
                <h5
                onClick={() => {
                    console.log({poketypes: pokeTypes})
                    setOpenTypeFilter(!openTypeFilter)}}>
                        <Button variant="text" size="lg">
                            Type
                        </Button>
                </h5>
                <Collapse in={openTypeFilter}>
                    <div>
                        <AllTypeCheckBoxes/>
                    </div>
                </Collapse>
                <h5 
                    onClick={() => setOpenSizeFilter(!openSizeFilter)}>
                        <Button variant="text" size="lg">
                            Size
                        </Button>
                </h5>
                <Collapse in={openSizeFilter}>
                    <div>
                        <AllSizeCheckBoxes/>
                    </div>
                </Collapse>
            </SidebarMenu.Body>
        </SidebarMenu>
    );
}

// // Not working. not doing anything
export function ProductsFilterBar1() {
    return (
    <Container fluid className="h-100 px-0">
  <Row className="no-gutters h-100">
    <Col sm={4}>
      <div className="wrapper">
        <Nav className="bg-light" id="sidebar">
          <div className="sidebar-header">
            <h3>Browse</h3>
          </div>
          <Row className="justify-content-center">
            <div className="col-10">
              <h5>Type</h5>
            </div>
          </Row>
          <Row className="justify-content-end">
            <div className="col-10">
              <div className="type-buttons">
                <div
                  className="type-buttons btn-group-vertical"
                  id="type-buttons"
                />
              </div>
            </div>
          </Row>
          <Row className="justify-content-center">
            <div className="col-10">
              <h5>Size</h5>
            </div>
          </Row>
          <Row className="justify-content-end">
            <div className="col-10">
              <div className="size-buttons">
                <div className="size-buttons btn-group-vertical">
                  <button
                    type="button"
                    id="s"
                    className="btn btn-secondary btn-outline"
                    value="s"
                  >
                    S
                  </button>
                  <button
                    type="button"
                    id="m"
                    className="btn btn-light"
                    value="m"
                  >
                    M
                  </button>
                  <button
                    type="button"
                    id="l"
                    className="btn btn-secondary"
                    value="l"
                  >
                    L
                  </button>
                  <button
                    type="button"
                    id="xl"
                    className="btn btn-light"
                    value="xl"
                  >
                    XL
                  </button>
                  <button
                    type="button"
                    id="xxl"
                    className="btn btn-secondary"
                    value="xxl"
                  >
                    XXL
                  </button>
                </div>
              </div>
            </div>
          </Row>
          <Row className="justify-content-start">
            <div className="col-10">
              <h4>Sort by</h4>
            </div>
          </Row>
          <Row className="justify-content-center">
            <div className="col-10">
              <h5>Price</h5>
            </div>
          </Row>
          <Row className="justify-content-end">
            <div className="col-10">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  defaultValue=""
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Ascending
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  defaultValue=""
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Descending
                </label>
              </div>
            </div>
            <Row className="row justify-content-end">
              <div className="col-10"></div>
            </Row>
          </Row>
        </Nav>
        <button type="button" id="sidebarCollapse" className="btn bg-dark">
          <i className="fa fa-angle-double-left fa-3x fa-inverse" />
        </button>
      </div>
    </Col>
    <div className="col-8 mt-5" style={{ padding: 0 }} id="card-box">
      <h2>Pokémon</h2> <div id="cards" />
    </div>
  </Row>
</Container>
    );
}

// Not working. not doing anything
export function ProductsFilterBar2() {
    return (
        <nav className="bg-light" id="sidebar">
            <div className="sidebar-header">
                <h3>Browse</h3>
            </div>
            <div className="row justify-content-center">
                <div className="col-10">
                    <h5>Type</h5>
                </div>
            </div>
            <div className="row justify-content-end">
                <div className="col-10">
                    <div className="type-buttons">
                        <div className="type-buttons btn-group-vertical" id="type-buttons" />
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-10">
                    <h5>Size</h5>
                </div>
            </div>
            <div className="row justify-content-end">
                <div className="col-10">
                    <div className="size-buttons">
                        <div className="size-buttons btn-group-vertical">
                        <button
                            type="button"
                            id="s"
                            className="btn btn-secondary btn-outline"
                            value="s"
                        >
                            S
                        </button>
                        <button type="button" id="m" className="btn btn-light" value="m">
                            M
                        </button>
                        <button type="button" id="l" className="btn btn-secondary" value="l">
                            L
                        </button>
                        <button type="button" id="xl" className="btn btn-light" value="xl">
                            XL
                        </button>
                        <button
                            type="button"
                            id="xxl"
                            className="btn btn-secondary"
                            value="xxl"
                        >
                            XXL
                        </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-start">
                <div className="col-10">
                <h4>Sort by</h4>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-10">
                <h5>Price</h5>
                </div>
            </div>
            <div className="row justify-content-end">
                <div className="col-10">
                <div className="form-check">
                    <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    defaultValue=""
                    />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                    Ascending
                    </label>
                </div>
                <div className="form-check">
                    <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    defaultValue=""
                    />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                    Descending
                    </label>
                </div>
                </div>
                <div className="row justify-content-end">
                <div className="col-10"></div>
                </div>
            </div>
        </nav>
    );
}