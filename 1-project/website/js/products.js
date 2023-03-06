// In the products page, each pokemon is listed as a card created by this function.
// Takes an element id and a single pokemon object as input and appends the html before the element ends. 
// See example of how to call it in product.html
function createCard(pokemon, elmId) {
    // I was too lazy to change format of the Bulbasaur image
    let img_path = ""
    if (pokemon.name == "Bulbasaur") {
      img_path = "data/poke_images/" + pokemon.name.toLowerCase() + ".jpg";
    }
    else {
      img_path = "data/poke_images/" + pokemon.name.toLowerCase() + ".avif";
    }
    console.log(pokemon)

    // Row no-gutters make it so the card becomes horizontal instead of vertical and removes the "gutters" between columns
    document.getElementById(elmId).insertAdjacentHTML("beforeend",
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

  function displayCards(pokemonForDisplay, elmID) {
    pokemonForDisplay.forEach(pokemon => createCard(pokemon, elmID))
  }

  // listening for each type button click and filtering accordingly
  function browse(){
    const typeButtons = document.querySelectorAll(".type-buttons button");
    const sizeButtons = document.querySelectorAll(".size-buttons button");
    console.log("number of typebuttons found: ", typeButtons.length)
    console.log("number of sizebuttons found: ", sizeButtons.length)

    for (i of typeButtons) {
        i.addEventListener('click', function() {
            let pokemonFiltered = pokemonAll.filter(pokemon => pokemon.type.includes(this.value))
            document.getElementById("cards").innerHTML = ""
            console.log(pokemonFiltered)
            displayCards(pokemonFiltered, 'cards')

        })
    }
    for (i of sizeButtons) {
      i.addEventListener('click', function() {
          let pokemonFiltered = pokemonAll.filter(pokemon => pokemon.type.includes(this.value))
          document.getElementById("cards").innerHTML = ""
          console.log(pokemonFiltered)
          displayCards(pokemonFiltered, 'cards')

      })
  }}

  function getSize(pokemon){
    switch (pokemon.size) {
      case 
    }
  }
  
  function addToShoppingCart(pokemonName) {
    console.log("inside addToShoppingCart:")
    console.log("the pokemon added is", pokemonName)

    cart = JSON.parse(localStorage.getItem("cart") || "[]")

    const isName = (element) => element.name == pokemonName
    let index = cart.findIndex(isName)
    
    if (index < 0) {
      cart.push({"name": pokemonName, "amount": 1})
    }
    else {
      cart[index].amount++
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    console.log(cart)
  }

  function displayTypeButtons(){}
