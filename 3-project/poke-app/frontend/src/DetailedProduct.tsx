import * as React from 'react'
import { useContext, useEffect } from "react"
import Button from "react-bootstrap/Button"
import { Container, Form, Row, Col, Card } from "react-bootstrap"
import { PokemonContext } from "./header"
import { useParams } from 'react-router-dom'


export function DetailedProductPage() {
    const { index } = useParams() as { index: string}
    const { pokemon } = useContext(PokemonContext)

    const productImage = `/data/poke_images/${pokemon[Number(index)].name.toLowerCase()}.avif` 

    return (
        <div className="d-flex flex-column min-vh-100">
        <div className="container">
        <div className="card-deck mt-5"><div className="card-body"></div>
            <Card className="bg-light">
            <Card.Body>
            <Card.Img src={productImage} alt="Pokemon"/>
            </Card.Body>
            </Card>
            <div className="card bg-light">
                <div className="card-body d-flex flex-column">
                    <div className="card-title">
                        <h3 id="name"></h3>
                    </div>
                    <p className="card-text">
                        <div>Price:</div>
                        <h5 id="price"></h5>
                    </p>
                    <p className="card-text">
                        <div>Type:</div>
                        <h5 id="type">
                        </h5>
                    </p>
                <p className="card-text">
                    <div>Size:</div>
                <h5 id="size">
                </h5>
                </p>
                <p className="card-text">
                    <div>Info:</div>
                <h5 id="info">
                </h5>
                </p>           
                </div>
            </div>
        </div>
    </div>
    </div>
    )
}; 


