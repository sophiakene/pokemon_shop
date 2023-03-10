// Top navbar present on all pages
function makeNavBar() {
    const header = document.createElement('header')
    header.setAttribute("class", 'sticky-top')
    header.innerHTML =` 
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="index.html">PokéShop</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                    <li class="nav-item">
                        <a class="nav-link" href="products.html">Products</a>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="login.html">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="shopping_cart.html">Shopping Cart</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    `
    document.body.insertAdjacentElement("afterbegin", header)
}

// Footer present on all pages
function makeFooter() {
    // Mail Node
    const mail = 'poke@shop.com'
    const mailText = document.createTextNode(mail)
    const a = document.createElement('a')
    a.setAttribute('href', 'mailto:poke@shop.com')
    a.setAttribute('class', 'footer-flexItem')

    // Address Node
    const address = 'Poké Valley 42, Los Angeles'
    const addressText = document.createTextNode(address)
    const div = document.createElement('div')
    div.setAttribute('class', 'footer-flexItem')

    // Footer node
    const footer = document.createElement('footer')
    footer.setAttribute("class", 'footer-flexContainer')

    // Extend DOM node graph
    // Footer is parent to Mail and Address elements
    a.appendChild(mailText)
    div.appendChild(addressText)
    footer.appendChild(a)
    footer.appendChild(div)
    document.body.insertAdjacentElement("afterend", footer)
}


