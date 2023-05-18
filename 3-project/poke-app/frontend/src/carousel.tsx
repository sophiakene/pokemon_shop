import React from 'react'
import { Carousel } from 'react-bootstrap'
import './carousel.css';

export function CarouselBanner() {
    return (
        <Carousel variant='dark'>
            <Carousel.Item>
                <img className='carousel-img'
                src='/data/poke_images/bulbasaur.avif'
                alt='Bulbasaur on offer!'
                />
                <Carousel.Caption className='justify-content-end'>
                    <h2>Special offer: Bulbasaur on sale!</h2>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className='carousel-img'
                src='/data/poke_images/diglett.avif'
                alt='Diglett on offer!'
                />
                <Carousel.Caption className='justify-content-end'>
                    <h2>Special offer: Diglett on sale!</h2>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}