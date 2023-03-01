const pokemon_all = [
    {name:"Bulbasaur", type:["Grass", "Poison"], size: 0.7, price: 40000, info: "Your new best friend. A basic grass pokemon who will follow you through thick and thin"},
    {name:"Charmander", type:["Fire"], size: 0.6, price: 10000, info: "Your new best friend. A basic fire pokemon who will follow you through thick and thin"},
    {name:"Squirtle", type:["Water"], size: 0.5, price: 10000 },
    {name:"Pikachu", type:["Electric"], size: 0.4, price: 10000 },
    {name:"Nidoqueen", type:["Poison", "Ground"], size: 1.3, price: 20000},
    // need to add the rest   
]


pokemon_cart = []


// In the products page, each pokemon is listed as a card created by this function.
// Takes an element id and a single pokemon object as input and appends the html before the element ends. 
// See example of how to call it in product.html
function createCard(pokemon, elm_id) {

    // I was too lazy to change format of the Bulbasaur image
    let img_path = ""
    if (pokemon.name == "Bulbasaur") {
      img_path = "../poke-images/" + pokemon.name.toLowerCase() + ".jpg";
    }
    else {
      img_path = "../poke-images/" + pokemon.name.toLowerCase() + ".avif";
    }
    console.log(pokemon)

    // Row no-gutters make it so the card becomes horizontal instead of vertical
    document.getElementById(elm_id).insertAdjacentHTML("beforeend",
      `
      <div class="card mb-3" style="max-width: 1000px;">
      <div class="row no-gutters"> 
    <div class="col-md-3">
      <img src=${img_path} class="card-img" alt="...">
    </div>
    <div class="col-md-6">
      <div class="card-body">
        <h5 class="card-title">${pokemon.name}</h5>
        <p class="card-text">${pokemon.info}</p>
        <p class="card-text">Price: ${pokemon.price}kr.</p>
      </div>
    </div>
    <div class="col-md-3 mt-auto">
      <div class="card-body">
        <button class="btn btn-danger" onclick="addToShoppingCart('${pokemon.name}')" id="${pokemon.name.toLowerCase()}">Add to shopping cart</button>
      </div>
    </div>
  </div>
  </div>
      `)
  }
  
  function addToShoppingCart(pokemonName) {
    console.log("inside addToShoppingCart:")
    console.log("the pokemon added is", pokemonName)

    cart = JSON.parse(localStorage.getItem("cart") || "[]")

    const isName = (element) => element.name == pokemonName
    let index = cart.findIndex(isName)
    
    if (index < 0) {
      cart.push({"name": pokemonName, "amount":1})
      localStorage.setItem("cart", JSON.stringify(cart) )
    }
    else {
      cart[index].amount++
      localStorage.setItem("cart", JSON.stringify(cart))
    }

    console.log(cart)  
  }




