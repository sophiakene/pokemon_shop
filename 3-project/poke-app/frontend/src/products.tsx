// eslint-disable-next-line
import { Container, Row, Col, Button, Nav, Card } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import './pokecard.css'
import SidebarMenu from 'react-bootstrap-sidebar-menu'
import { useContext, useEffect } from "react"
import { PokemonContext, UserContext, CartContext } from "./header"
import { Pokemon } from "./types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import 'font-awesome/css/font-awesome.min.css'
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
        .then(shoppingCart => setCart(shoppingCart))
        .catch(error => console.log({ errorAddingProductToShoppingCart: error }))
    }

    if( pokemon.length !== 0 ) {
        const detailedProduct = `/detailed_product.html?name=/${pokemon[index].name}`
        const image = `/data/poke_images/${pokemon[index].name.toLowerCase()}.avif`
        return (
            <Container fluid>
            <Card bg='light' className='mb-3' // margin bottom sizing of 3
                key={'Light'}>
                <Row className='no-gutters'>
                    <Col sm={3}>
                        <a href={detailedProduct}>
                            <Card.Img src={image} alt="Pokemon" />
                        </a>
                    </Col>
                    <Col sm={6}>
                        <a href={detailedProduct}>
                            <Card.Title>{pokemon[index].name}</Card.Title>
                        </a>
                        <Card.Text>{pokemon[index].info}</Card.Text>
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
            </Container>
        );
    } else { return (<div></div>) }
}

export function Products() {
    const { pokemon } = useContext(PokemonContext)
    const pokemonCards = 
        pokemon.map((pokemon, index) => { return (
            <Row key={pokemon.name}>
                <Col sm={3}></Col>
                <Col sm={8}>
                    <PokeCard index={index}/>
                </Col>
            </Row>
        )})
    return (
        <div>
            <Col sm={8} className="mt-5" style={{ padding: 0 }} id="card-box">
                <h2>Pokémon</h2>
                {pokemonCards}
            </Col>
        </div>
    );
}


//// Not working. not doing anything
export function ProductsFilterBar() {
    return (
        <SidebarMenu>
            <h3>Browse</h3>
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