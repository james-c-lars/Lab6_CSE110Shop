// Script.js
window.addEventListener('DOMContentLoaded', () => {
  	if('products' in localStorage) {
		addProductsToPage();
	} else {
		fetch('https://fakestoreapi.com/products')
			.then(response => response.json())
			.then(data => {
				localStorage.setItem('products', JSON.stringify(data));
				addProductsToPage();
			});
	}

	if(!('cart' in localStorage)) {
		let products = JSON.parse(localStorage.getItem('products'));
		cart = {};

		for(product of products) {
			cart[product['id']] = false;
		}

		localStorage.setItem('cart', JSON.stringify(cart));
	}
});

const productList = document.getElementById('product-list');

function addProductsToPage() {
	let products = JSON.parse(localStorage.getItem('products'));

	for(product of products) {
		productList.appendChild(new ProductItem(product));
	}
}