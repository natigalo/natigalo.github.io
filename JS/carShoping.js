const menuHamIcon = document.querySelector('.menu');
const mobileMenu = document.querySelector('.mobile-menu');
const containerOrdersAndTotal = document.querySelector('.container');
const buttonCheck = containerOrdersAndTotal.querySelector('.primary-button');
const container = document.querySelector('.my-order-content');
const total = document.querySelector('.total');
const containerCount = document.querySelector('.navbar-shopping-cart');
const countProducts = containerCount.querySelector('div');
let operation = 0;
let productAddeds = JSON.parse(localStorage.getItem('productAdded'));
countProducts.textContent = productAddeds.length;
let productsCheck = [];
if (JSON.parse(localStorage.getItem('productsCheck')) != null) {
	productsCheck = JSON.parse(localStorage.getItem('productsCheck'));
}

function creatProductCart(nameCard, imgCard, priceCard, position) {
	const shoppingCart = document.createElement('div');
	shoppingCart.classList.add('shopping-cart');

	const figure = document.createElement('figure');
	const image = document.createElement('img');
	image.setAttribute('src', "../assets/images/imagenesCatalogo/" + imgCard + ".png");
	figure.appendChild(image);
	shoppingCart.appendChild(figure);

	const name = document.createElement('p');
	name.textContent = nameCard;
	shoppingCart.appendChild(name);

	const price = document.createElement('p');
	price.textContent = priceCard.toLocaleString(loadLocal(), loadCurrency());
	shoppingCart.appendChild(price);

	const closeButton = document.createElement('img');
	closeButton.setAttribute('src', '../assets/icons/icon_close.png');
	closeButton.setAttribute('alt', 'close');
	shoppingCart.appendChild(closeButton);
	operation += parseInt(priceCard);
	shoppingCart.addEventListener('click', () => {
		removeProduct(position, priceCard);
	})
	return shoppingCart;
}

function insertProductAddeds(Data) {
	for (let i = 0; i < Data.length; i++) {
		let product = creatProductCart(Data[i].Name, Data[i].Image, parseInt(Data[i].Price), i);
		container.appendChild(product);
	}
	total.textContent = operation.toLocaleString(loadLocal(), loadCurrency());
}

insertProductAddeds(productAddeds);

function removeProduct(position, priceCard) {
	console.log(operation, priceCard);
	operation = 0;
	total.textContent = operation.toLocaleString(loadLocal(), loadCurrency());
	productAddeds.splice(position, 1);
	countProducts.textContent = productAddeds.length;
	removeElementsCart();
	localStorage.setItem('productAdded', JSON.stringify(productAddeds));
	insertProductAddeds(productAddeds);
}

buttonCheck.addEventListener('click', () => {
	checkButton();
});

menuHamIcon.addEventListener('click', openMenu);

function openMenu() {
	mobileMenu.classList.toggle('inactive');
}

function checkButton() {
	removeElementsCart();
	for (let i = 0; i < productAddeds.length; i++) {
		operation = 0;
		total.textContent =  operation.toLocaleString(loadLocal(), loadCurrency());
		countProducts.textContent = 0;
		productAddeds.splice(i, 1);
		i--;
	}
	localStorage.setItem('productAdded', JSON.stringify(productAddeds));
}

function removeElementsCart() {
	let elements = container.children
	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];
		element.remove();
		i--;
	}
}