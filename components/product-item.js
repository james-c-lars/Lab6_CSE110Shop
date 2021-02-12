// product-item.js

const cartCount = document.getElementById('cart-count');

function manipulateCart(id) {
	cart = JSON.parse(localStorage.getItem('cart'));
	
	cart[id] = !cart[id];

	localStorage.setItem('cart', JSON.stringify(cart));

	return cart[id];
}

class ProductItem extends HTMLElement {
  // TODO
  constructor(productElement) {
  	super();

	this.attachShadow({mode: 'open'});

  	// Initialize the HTML elements
  	const listItem = document.createElement('li');
  	const productImg = listItem.appendChild(document.createElement('img'));
  	const productTitle = listItem.appendChild(document.createElement('p'));
  	const productPrice = listItem.appendChild(document.createElement('p'));
  	const productButton = listItem.appendChild(document.createElement('button'));

  	// Add the attributes
  	listItem.setAttribute('class', 'product');
  	productImg.setAttribute('src', productElement['image']);
  	productImg.setAttribute('alt', productElement['title']);
  	productImg.setAttribute('width', 200);
  	productTitle.setAttribute('class', 'title');
  	productPrice.setAttribute('class', 'price');

  	// Setting the text content
  	productTitle.textContent = productElement['title'];
  	productPrice.textContent = productElement['price'];
  	productButton.textContent = 'Add to Cart';


  	// Button initialization
  	let inCart = JSON.parse(localStorage.getItem('cart'))[productElement['id']];
  	if(inCart) {
  		cartCount.textContent = Number(cartCount.textContent) + 1;
  		productButton.textContent = 'Remove from Cart';
  	} else {
  		productButton.textContent = 'Add to Cart';
  	}


  	// Button logic
  	productButton.addEventListener('click', function() {
	  	if(manipulateCart(productElement['id'])) {
	  		alert('Added to Cart!');
	  		cartCount.textContent = Number(cartCount.textContent) + 1;
	  		productButton.textContent = 'Remove from Cart';
	  	} else {
	  		alert('Removed from Cart!');
	  		cartCount.textContent = Number(cartCount.textContent) - 1;
	  		productButton.textContent = 'Add to Cart';
	  	}

  	});


  	// Applying the styling from the given CSS sheet
  	const linkElem = document.createElement('link');
  	linkElem.setAttribute('rel', 'stylesheet');
  	linkElem.setAttribute('href', 'styles/styles.css')


  	// Adding our HTML elements to the shadow DOM
  	this.shadowRoot.append(linkElem, listItem);
  }
}

customElements.define('product-item', ProductItem);