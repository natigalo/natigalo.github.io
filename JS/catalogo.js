const menuHamIcon = document.querySelector('.menu');
const mobileMenu = document.querySelector('.mobile-menu');
const cardsContainer = document.getElementById('cards-container');
const productDetailContainer = document.querySelector('#productDetail');
const productDetailCloseIcon = document.querySelector('.product-detail-close');
const buttonAddedProductDetail = productDetailContainer.querySelector('button');
const sendArrayProductAdded = document.querySelector('.navbar-shopping-cart');
const formSelectCategories = document.querySelector('.categories');
const formSelectupward = document.querySelector('.upward');
const price = document.getElementById('price');
const filter = document.getElementById('filter');
let countProduct = sendArrayProductAdded.querySelector('div');

let prductAded = [];

let allProducts = DataPlaticeros;

if (JSON.parse(localStorage.getItem('productAdded')) != null) {
    prductAded = JSON.parse(localStorage.getItem('productAdded'));
    allProducts = discountsAvailables(prductAded, allProducts);
}

countProduct.textContent = prductAded.length;

let isUpward = () => { return JSON.parse(formSelectupward.value) };
let isCategory = () => { return formSelectCategories.value != 'All' };
let isPrice = () => { return parseInt(price.value) != 0 };

insertCategory();
validation();

function validation() {
    createCard(filters(allProducts));
}

function createCard(Data) {
    for (let i = 0; i < Data.length; i++) {
        const nameCard = Data[i].Name;
        const imgCard = parseFloat(Data[i].Img);
        const priceCard = Data[i].Price;
        const availableCard = Data[i].Available;
        const category = Data[i].category;
        let card = cardProduct(nameCard, imgCard, priceCard, availableCard, category, Data[i].Details);
        cardsContainer.appendChild(card);
    }
}

function cardProduct(nameCard, imgCard, priceCard, availableCard, category, details) {
    let content = document.createElement('div');
    content.className = "product-card";
    let card = '<img src="../assets/images/imagenesCatalogo/' + imgCard + '.png">\n' +
        '<div class="product-info">\n' +
        '<div>\n' +
        '<p>' + priceCard.toLocaleString(loadLocal(), loadCurrency())  + '</p>\n' +
        '<p>' + nameCard + '</p>\n' +
        '<p>' + "Available: " + availableCard + '</p>\n' +
        '<p>' + "Category: " + category + '</p>\n' +
        '</div>\n' +

        '</div>\n';
    content.innerHTML += card;
    content.addEventListener('click', () => {
        sessionStorage.setItem('Name', nameCard);
        sessionStorage.setItem('Image', imgCard);
        sessionStorage.setItem('Price', priceCard);
        viewDestails(nameCard, imgCard, priceCard, availableCard, category, details);
    });
    return content;
}

function viewDestails(nameCard, imgCard, priceCard, availableCard, category, details) {
    let setImage = productDetailContainer.querySelector('.image');
    setImage.setAttribute('src', '../assets/images/imagenesCatalogo/' + imgCard + '.png');
    let setPrice = productDetailContainer.querySelector('.price');
    setPrice.textContent = 'Price: ' + priceCard.toLocaleString(loadLocal(), loadCurrency()) ;
    let setName = productDetailContainer.querySelector('.name');
    setName.textContent = 'Name: ' + nameCard;
    let setDetails = productDetailContainer.querySelector('.details');
    setDetails.textContent = details;
    let setAvaible = productDetailContainer.querySelector('.avaible');
    setAvaible.textContent = availableCard;
    let setCategory = productDetailContainer.querySelector('.category');
    setCategory.textContent = 'Category: ' + category;
    openProductDetailAside();
}

productDetailCloseIcon.addEventListener('click', closeProductDetailAside);

buttonAddedProductDetail.addEventListener('click', () => {
    let Name = sessionStorage.getItem('Name');
    let Image = sessionStorage.getItem('Image');
    let Price = sessionStorage.getItem('Price');
    addedProduct(Name, Image, Price);
});

sendArrayProductAdded.addEventListener('click', () => {
    localStorage.setItem('productAdded', JSON.stringify(prductAded));
    window.location.href = '../pages/cart.html';
})

menuHamIcon.addEventListener('click', openMenu);

function openMenu() {
    closeProductDetailAside();
    mobileMenu.classList.toggle('inactive');
}

function openProductDetailAside() {
    productDetailContainer.classList.remove('inactive');
}

function closeProductDetailAside() {
    productDetailContainer.classList.add('inactive');
}

function addedProduct(nameCard, imgCard, priceCard) {
    let product = { Name: nameCard, Image: imgCard, Price: priceCard };
    prductAded.push(product);
    countProduct.textContent = prductAded.length;
    localStorage.setItem('productAdded', JSON.stringify(prductAded));
    removeElementsCard();
    createCard(filters(discountsAvailables(prductAded)));
}

function discountsAvailables(producstsAddeds) {
    let newArray = [];
    for (let i = 0; i < DataPlaticeros.length; i++) {
        const data = DataPlaticeros[i];
        let avaible = data.Available;
        for (let j = 0; j < producstsAddeds.length; j++) {
            const addeds = producstsAddeds[j];
            if (data.Name == addeds.Name) {
                avaible--;
            }
        }
        let product = { Img: data.Img, Name: data.Name, Price: data.Price, Details: data.Details, Available: avaible, category: data.category, };
        newArray.push(product);
    }
    return newArray;
}

let validatePrice = (getPrice, dataPrice) => { return dataPrice.Price <= getPrice };

let validateCategory = (getCategory, dataCategory) => { return getCategory == dataCategory.category };

function filters(list) {
    let getPrice = parseInt(price.value);
    let getCategory = formSelectCategories.value;

    if (isUpward()) {
        return validations(list, getCategory, getPrice).sort((a, b) => a.Price - b.Price);
    } else {
        return validations(list, getCategory, getPrice).sort((a, b) => b.Price - a.Price);
    }
}

function validations(list, getCategory, getPrice) {
    if (isCategory()) {
        if (isPrice()) {
            return list.filter(data => {
                return validateCategory(getCategory, data) && validatePrice(getPrice, data);
            })
        } else {
            return list.filter(data => {
                return validateCategory(getCategory, data);
            });
        }
    } else {
        if (isPrice()) {
            return list.filter(data => {
                return validatePrice(getPrice, data);
            })
        } else {
            return list;
        }
    }
}

filter.addEventListener('click', () => {
    removeElementsCard();
    createCard(filters(allProducts));
})

function getCategories() {
    let categories = [];
    for (let i = 0; i < DataPlaticeros.length; i++) {
        const element = DataPlaticeros[i];
        if (!categories.includes(element.category)) {
            categories.push(element.category);
        }
    }
    return categories;
}

function insertCategory() {
    getCategories().forEach(category => {
        let option = '<option value="' + category + '"> ' + category + ' </option>';
        formSelectCategories.innerHTML += option;
    })
}

function removeElementsCard() {
    let elements = cardsContainer.children;
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        element.remove();
        i--;
    }
}