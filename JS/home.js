const containerCount = document.querySelector('.navbar-shopping-cart');
const countProducts = containerCount.querySelector('div');
let productAddeds = JSON.parse(localStorage.getItem('productAdded'));
countProducts.textContent = productAddeds.length;

const menuHamIcon = document.querySelector('.menu');
const mobileMenu = document.querySelector('.mobile-menu');

menuHamIcon.addEventListener('click', openMenu);

function openMenu() {
  mobileMenu.classList.toggle('inactive');
}