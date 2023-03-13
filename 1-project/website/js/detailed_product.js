function displayDetails() {
    let params = new URLSearchParams(window.location.search)
    const pokemon = pokemonAll.find(p => p.name===params.get('name') )

    let imgPath = ""
    if (pokemon.name == "Bulbasaur") {
      imgPath = "data/poke_images/" + pokemon.name.toLowerCase() + ".jpg";
    }
    else {
      imgPath = "data/poke_images/" + pokemon.name.toLowerCase() + ".avif";
    }

    const sizeCategory = getSize(pokemon).toUpperCase()

    document.title = pokemon.name
    document.getElementById("img").src = imgPath
    document.getElementById("name").innerHTML=pokemon.name
    document.getElementById("price").innerHTML=pokemon.price + "kr"
    document.getElementById("size").innerHTML= pokemon.size + " m / " + sizeCategory 
    document.getElementById("info").innerHTML=pokemon.info
    document.getElementById("btn").onclick = function() {addToShoppingCart(pokemon.name)}

    for (type of pokemon.type) {
        createBadge(document.getElementById("type"), type)
    }
}

function createBadge(typeElm, type) {
    typeElm.insertAdjacentHTML('beforeend',
    `
    <div class="badge" style="display: inline-block; width:6em; background-color: ${pokeColours[type]}!important;color: #fff">
        ${type}
    </div>
    `)
}

