// eslint-disable-next-line
import { Container, Row, Col, Button, Nav, Card } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import SidebarMenu from 'react-bootstrap-sidebar-menu'
import { useContext, useEffect } from "react"
import { PokemonContext, Pokemon } from "./App"
import { faCoffee } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'font-awesome/css/font-awesome.min.css'

/*function createCard(pokemon, elmId) {
    const img_path = "data/poke_images/" + pokemon.name.toLowerCase() + ".avif";
    const detailLink = "detailed_product.html?name=" + pokemon.name
    // Row no-gutters make it so the card becomes horizontal instead of vertical and removes the "gutters" between columns
    document.getElementById(elmId).insertAdjacentHTML("beforeend",
      `
      <div class="card mb-3 bg-light" style="max-width: 1000px;">
        <Row class="row no-gutters"> 
          <div class="col-md-3">1
            <a href=${detailLink}><img src=${img_path} class="card-img" alt="..."></a>
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <h5 class="card-title"><a href=${detailLink}>${pokemon.name}</a></h5>
              <p class="card-text">${pokemon.info}</p>
              <p class="card-text">Price: ${pokemon.price}kr.</p>
            </div>
          </div>
          <Col class="col-md-3 mt-auto">
            <Card.Body>
              <button class="btn btn-danger" onclick="addToShoppingCart('${pokemon.name}')" id="${pokemon.name.toLowerCase()}">
                    <i class="fa fa-shopping-cart fa-lg"></i> 
                    Add to shopping cart
              </button>
            </Card.Body>
          </Col>
        </Row>
      </div>
      `) } */

function PokeCard({ index } : { index: number }) {
    const { pokemon, setPokemon } = useContext(PokemonContext)
    if( pokemon.length !== 0 ) {
        console.log({pokecardpokemon:pokemon})
        const detailedProduct = `/detailed_product.html?name=` //${pokemon.name}`
        const picture = '/data/poke_images/ditto.avif' //${pokemon.name.toLowerCase()}.avif`
        return (
            <Card 
                className='mb-3' // margin bottom sizing of 3
                bg='light'
                key={'Light'} // max-width : does not work
            >
                <Row className='no-gutters'>
                    <Col sm={3}>
                        <a href={detailedProduct}>
                            <Card.Img src='/data/poke_images/ditto.avif' // {picture} 
                            alt="Pokemon"/>
                        </a>
                    </Col>
                    <Col sm={6}>
                        <Card.Body>
                            <a href={detailedProduct}>
                                <Card.Title>{pokemon[index].name}</Card.Title>
                            </a>
                            <Card.Text>{pokemon[index].info}</Card.Text>

                            <Card.Text>Price: {pokemon[index].price} kr.</Card.Text>
                        </Card.Body>
                    </Col>
                    <Col sm={3}>
                        <Card.Body>
                            <Button type='submit' variant='danger'>
                                <FontAwesomeIcon icon='shopping-cart'/> 
                                Add to shopping cart
                            </Button>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        );
    } else { return (<div></div>) }
}

export function Products() {
    const { pokemon, setPokemon } = useContext(PokemonContext)
    console.log({products:pokemon[0]})
    const po = pokemon.map((poke : Pokemon) => <li key={poke.id}>{poke.name}</li>)
    const picture = `../data/poke_images/ditto.avif` //${pokemon.name.toLowerCase()}.avif`

    return (
        <div>
            <ul>{po}</ul>
            <img src={picture}/>

            <PokeCard index={0}/>
        </div>
    );
}


/*function displayCards(pokemonForDisplay, elmID) {
  pokemonForDisplay.forEach(pokemon => createCard(pokemon, elmID))
}*/

export function ProductsFilterBar() {
    return (
        <SidebarMenu>
            <h3>Browse</h3>
        </SidebarMenu>
    );
}
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