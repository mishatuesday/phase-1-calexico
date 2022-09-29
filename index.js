// <1> fetch all menu items, create span and add to #menu-items
menuUrl = 'http://localhost:3000/menu/'
let dishSelected;

fetch(menuUrl)
.then(resp => resp.json())
.then(resp => initializeMenu(resp))
.catch(err => alert(err))

function initializeMenu(menu) {
    menu.forEach((dish) => addToMenu(dish))
    displayDishDetail(menu[0])
    dishSelected = 1
    document.getElementById("menu").addEventListener("click", (e) => handleMenuClick(e, menu))
    document.getElementById("cart-form").addEventListener("submit", (e) => addToCart(e, menu))
}

function addToMenu(dish) {
    const newMenuSpan = document.createElement("span")
    newMenuSpan.textContent = dish.name
    newMenuSpan.id = dish.id
    document.getElementById("menu-items").appendChild(newMenuSpan)
}


// <2> display first menu item on page load in #dish section
function displayDishDetail(dish) {
    document.getElementById("dish-image").src = dish.image
    document.getElementById("dish-name").textContent = dish.name
    document.getElementById("dish-description").textContent = dish.description
    document.getElementById("dish-price").textContent = dish.price
    document.getElementById("number-in-cart").textContent = dish.number_in_bag
    dishSelected = dish.id - 1
}

// <3> click on menu item, see in detail section
function handleMenuClick(e, menu) {
    if (e.target.localName === "span") {
        displayDishDetail(menu[parseInt(e.target.id)-1])
    }
}

// <4> add menu items to their card with add to cart button
//     and add to how many of that item are in the cart
//     it is ok if the value resets inbetween clicking menu items
function addToCart(e, menu) {
    e.preventDefault()
    let amtToAdd = parseInt(document.getElementById("cart-amount").value)
    amtToAdd += menu[dishSelected].number_in_bag
    // display only in browser
    document.getElementById("number-in-cart").textContent = amtToAdd
    e.target.reset()
}
