import express from 'express'

export const productsRouter = express.Router();



import { 
getAllProducts, 
getProductCategories, 
getProductsFromCategory, 
getProduct 
} from './products.controller.js'



productsRouter.get("/products", getAllProducts)

productsRouter.get("/products/categories", getProductCategories)

productsRouter.get("/products/categories/:categoryName", getProductsFromCategory)

productsRouter.get("/products/:productId", getProduct)