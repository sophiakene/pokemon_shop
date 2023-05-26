import React from 'react'
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './../css/carousel.css';

export function CarouselBanner() {
    return (
        <Carousel variant='dark' indicators={false}>
            <Carousel.Item>
                <Link to='/detailed_product/0'>
                <img 
                    className='carousel-img'
                    src='/data/poke_images/bulbasaur.avif'
                    alt='Bulbasaur on offer!'
                />
                <Carousel.Caption className='carousel-caption justify-content-end'>
                    <h2>Bulbasaur on sale!</h2>
                </Carousel.Caption>
                </Link>
            </Carousel.Item>
            <Carousel.Item>
                <Link to='/detailed_product/8'>
                <img 
                    className='carousel-img'
                    src='/data/poke_images/diglett.avif'
                    alt='Diglett on offer!'
                />
                <Carousel.Caption className='carousel-caption justify-content-end'>
                    <h2>Diglett on sale!</h2>
                </Carousel.Caption>
                </Link>
            </Carousel.Item>
            <Carousel.Item>
                <Link to='/detailed_product/3'>
                <img 
                    className='carousel-img'
                    src='/data/poke_images/pikachu.avif'
                    alt='Pikachu on offer!'
                />
                <Carousel.Caption className='carousel-caption justify-content-end'>
                    <h2>Pikachu on sale!</h2>
                </Carousel.Caption>
                </Link>
            </Carousel.Item>
        </Carousel>
    )
}