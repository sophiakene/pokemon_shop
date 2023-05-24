import * as React from 'react'
import { useContext, useEffect } from "react"
//import Button from "react-bootstrap/Button"
//import Badge from 'react-bootstrap/Badge'
import "./css/detailed-product.css"
import { Container, Form, Row, Col, Card } from "react-bootstrap"
import { PokemonContext } from "./header"
import { useParams } from 'react-router-dom'
import { pokeColours } from './pokemon'

export function DetailedProductPage() {
    const { index } = useParams() as { index: string}
    const { pokemon } = useContext(PokemonContext)

    const productImage = `/data/poke_images/${pokemon[Number(index)].name.toLowerCase()}.avif` 

    return (            
            <Container>
            <Row>
            <Card className="bg-light" style={{width:"45%", margin:"10px"}}>
            <Card.Body>
            <Card.Img src={productImage} alt="Pokemon"/>
            </Card.Body>
            </Card>
            <Card className="bg-light" style={{width:"45%", margin:"10px"}}>
                <div className="card-body d-flex flex-column">
                    <div className="card-title">
                        <h3 id="name"></h3>
                    </div>
                    <p className="card-text">
                        <div>Price: {pokemon[Number(index)].price} DKK</div>
                        <h5 id="price"></h5>
                    </p>
                    <p className="card-text">

                        <div>
                            Type:
                            <ol style={{ listStyle: 'none' }}>
                            {pokemon[Number(index)].type.map((item,index) => 
                                <>
                                <div className="badge" style={{background:pokeColours[item as keyof typeof pokeColours]}}>
                                <li key={index}>{item}</li>
                                </div>
                                <br/>
                                </>
                            )}
                            </ol>
                        </div>

                        <h5 id="type">
                        </h5>
                    </p>
                <p className="card-text">
                    <div>Size: {pokemon[Number(index)].size} </div>
                <h5 id="size">
                </h5>
                </p>
                <p className="card-text">
                    <div>Info: {pokemon[Number(index)].info} </div>
                <h5 id="info">
                </h5>
                </p>           
                </div>
            </Card>
            </Row>
            </Container>
    )
}; 


