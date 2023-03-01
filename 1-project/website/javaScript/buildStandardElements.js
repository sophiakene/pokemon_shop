// Top navbar present on all pages
function makeNavBar() {
    // Implementation missing { ^ o ^ }
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
