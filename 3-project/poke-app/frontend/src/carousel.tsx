import React from 'react'
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './carousel.css';

export function CarouselBanner() {
    return (
        <Carousel variant='dark'>
            <Carousel.Item>
                <Link to='/detailed_product/Bulbasaur'>
                <img className='carousel-img'
                src='/data/poke_images/bulbasaur.avif'
                alt='Bulbasaur on offer!'
                />
                <Carousel.Caption className='justify-content-end'>
                    <h2>Special offer: Bulbasaur on sale!</h2>
                </Carousel.Caption>
                </Link>
            </Carousel.Item>
            <Carousel.Item>
                <Link to='/detailed_product/Diglett'>
                <img className='carousel-img'
                src='/data/poke_images/diglett.avif'
                alt='Diglett on offer!'
                />
                <Carousel.Caption className='justify-content-end'>
                    <h2>Special offer: Diglett on sale!</h2>
                </Carousel.Caption>
                </Link>
            </Carousel.Item>
        </Carousel>
    )
}