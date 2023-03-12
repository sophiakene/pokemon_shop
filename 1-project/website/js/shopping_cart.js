function createBasketCard(pokemon, elmId, cartPokemon) {
    // I was too lazy to change format of the Bulbasaur image
    let imgPath = ""
    if (pokemon.name == "Bulbasaur") {
      imgPath = "data/poke_images/" + pokemon.name.toLowerCase() + ".jpg";
    }
    else {
      imgPath = "data/poke_images/" + pokemon.name.toLowerCase() + ".avif";
    }
    console.log(pokemon)
    cardID = pokemon.name
  
    // Row no-gutters make it so the card becomes horizontal instead of vertical and removes the "gutters" between columns
    document.getElementById(elmId).insertAdjacentHTML("beforeend",
      `
      <div class="card mb-3" id=${cardID} style="max-width: 800px;">
        <div class="row no-gutters"> 
          <div class="col-md-3">
            <img src=${imgPath} class="card-img" alt="...">
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <h5 class="card-title">${pokemon.name}</h5>
              <p class="card-text">${pokemon.info}</p>
              <p class="card-text">Price: ${pokemon.price}kr.</p>
              <p class="card-text">Quantity: ${cartPokemon.amount}</p>
            </div>
        </div>
        <div class="col-md-3 mb-auto">
          <div class="card-body" style="text-align: right">
              <button type="button" name="removeButton" class="btn btn-dark" onclick="removeFromCart('${cardID}')">
                  <i class="fa fa-close fa-2x fa-inverse"></i>
              </button>
          </div>
        </div>
       </div>
    </div>
    `
    )
}

function removeFromCart(cardID){
  console.log(cardID)
  const cardElm = document.getElementById(cardID);
  cardElm.remove();

  cart = JSON.parse(localStorage.getItem("cart"))
  console.log("cart: ", cart)

  newCart = cart.filter(function( obj ) {
    return obj.name !== cardID;
  });

  console.log("newCart: ", newCart)
  localStorage.setItem("cart", JSON.stringify(newCart))
  displaySummary("summary-items", "summary-total")

  // if (newCart.length < 1) {

  // }
}

// function createCartText(customerName, )

  
function displayBasketCards(elmID) {
  cart = JSON.parse(localStorage.getItem("cart") || "[]")

  const customerName = sessionStorage.newName
  console.log("customerName is: ", customerName)
  let cartEmptyText = ""
  let cartContentText = ""
  
  if (customerName != undefined) {
    cartEmptyText = "What are you waiting for, " + customerName + "! Go buy some pokemon!"
    cartContentText = "Shopping cart contents for " + customerName
  } 
  else {
    cartEmptyText = "What are you waiting for, go buy some pokemon!"
    cartContentText = "Shopping cart contents"
  }

  if (cart.length > 0) {
      document.getElementById("shopping-cart-title").insertAdjacentHTML("afterbegin", 
          `
          <h1>${cartContentText}</h1>
          `) 
      cart.forEach(cartPokemon => {
          pokemonObject = pokemonAll.find(p => p.name === cartPokemon.name)
          createBasketCard(pokemonObject, elmID, cartPokemon)
      })
  }
  else {

      document.getElementById("shopping-cart-title").insertAdjacentHTML("afterbegin", 
          `
          <h1>${cartEmptyText}</h1>
          `) 
  }
}

// function getTotal() {
//     cart = JSON.parse(localStorage.getItem("cart") || "[]")
    
//     totalItems = cart.reduce((acc, cartPokemon) => {
//         pokemonObject = pokemonAll.find(p => p.name === cartPokemon.name)
//         return acc + (cartPokemon.amount)
//     },0);
//     subtotal = cart.reduce((acc, cartPokemon) => {
//         pokemonObject = pokemonAll.find(p => p.name === cartPokemon.name)
//         return acc + (cartPokemon.amount * pokemonObject.price)
//     },0);

//     return [totalItems, subtotal];
// }

function displaySummary(itemsID, totalID) {
    [totalItems, subtotal] = getTotal()
    summaryItems = document.getElementById(itemsID)
    summaryTotal = document.getElementById(totalID)
    summaryItems.innerHTML = ""
    summaryTotal.innerHTML = ""
    summaryItems.insertAdjacentHTML("beforeend",`
    Total number of items: ${totalItems}`)
    summaryTotal.insertAdjacentHTML("beforeend",`
    Subtotal: ${subtotal}kr`)
}
