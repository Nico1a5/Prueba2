// Función para obtener el carrito desde localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Función para guardar el carrito en localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para agregar productos al carrito
function addToCart(name, price, description) {
    const cart = getCart();
    cart.push({ name, price, description, selected: false });
    saveCart(cart);
    alert(`${name} ha sido añadido al carrito.`);
}

// Función para comprar ahora
function buyNow(name, price) {
    alert(`Gracias por su compra de: ${name} por $${price.toFixed(2)}`);
}

// Función para actualizar el carrito en la página del carrito
function updateCart() {
    const cart = getCart();
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        
        // Checkbox para seleccionar el producto
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.selected;
        checkbox.onchange = () => toggleSelection(index);
        li.appendChild(checkbox);

        // Información del producto
        li.appendChild(document.createTextNode(`${item.name} - $${item.price.toFixed(2)} - ${item.description}`));

        // Botón para eliminar el producto
        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.onclick = () => removeFromCart(index);
        li.appendChild(removeButton);

        cartItems.appendChild(li);

        // Calcular el total solo de los productos seleccionados
        if (item.selected) {
            total += item.price;
        }
    });

    cartTotal.textContent = total.toFixed(2);
}

// Función para alternar la selección de productos
function toggleSelection(index) {
    const cart = getCart();
    cart[index].selected = !cart[index].selected;
    saveCart(cart);
    updateCart();
}

// Función para eliminar productos del carrito
function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    updateCart();
}

// Función para comprar los productos seleccionados
function checkout() {
    const cart = getCart();
    const selectedItems = cart.filter(item => item.selected);
    if (selectedItems.length === 0) {
        alert('Por favor, selecciona al menos un producto para comprar.');
        return;
    }
    alert('Gracias por su compra!');
    const remainingItems = cart.filter(item => !item.selected);
    saveCart(remainingItems);
    updateCart();
}

// Actualizar el carrito al cargar la página del carrito
if (window.location.pathname.includes('cart.html')) {
    updateCart();
}