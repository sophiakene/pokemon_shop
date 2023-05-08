import express from "express";

import {productsRouter} from "./products/products.route.js";
import {customersRouter} from "./customers/customers.route.js";
const app = express();
const PORT = 3005;

// This is a built-in middleware function in Express. It parses incoming requests with JSON payloads.
app.use(express.json());

// paths '/products' are handled by productsRouter
app.use(productsRouter)
// paths '/customers' are handled by customersRouter
app.use(customersRouter)

app.get("/", (req, res) => res.send("Server 3: Hello World!"));


// For invalid routes
app.get("*", (req, res) => {
  res.send("404! This is an invalid URL.");
});

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
