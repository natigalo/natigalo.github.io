
const DataPlaticeros = [
    {
        Img: 17,
        Name: "Platycerium Superbum 1",
        Price: 150000,
        Details: "Canasta de alambre 30 cm, altura 60 cm",
        Available: 15,
        category: "planta",
    },

    {
        Img: 33,
        Name: "Platycerium Wallichii 1",
        Price: 130000,
        Details: "Matera No. 10",
        Available: 5,
        category: "planta",
    },

    {
        Img: 32,
        Name: "Platycerium Ridleyi",
        Price: 130000,
        Details: "Matera No. 10",
        Available: 10,
        category: "planta",
    },

    {
        Img: 31,
        Name: "Platycerium Madagascariense",
        Price: 130000,
        Details: "Matera No. 10",
        Available: 5,
        category: "planta",
    },

    {
        Img: 30,
        Name: "Platycerium Grande",
        Price: 130000,
        Details: "Matera No. 10",
        Available: 15,
        category: "planta",
    },

    {
        Img: 22,
        Name: "Platycerium Bifurcatum",
        Price: 60000,
        Details: "Canasta de alambre 30 cm",
        Available: 20,
        category: "planta",
    },

    {
        Img: 20,
        Name: "Platycerium Veitchii",
        Price: 100000,
        Details: "Canasta de alambre 30 cm",
        Available: 30,
        category: "planta",
    },

    {
        Img: 16,
        Name: "Platycerium superbum",
        Price: 150000,
        Details: "cuadro en PVC 30x40",
        Available: 12,
        category: "planta",
    },

    {
        Img: 6,
        Name: "Platycerium Elephantotis",
        Price: 90000,
        Details: "Canasta de alambre 30 cm, altura 50 cm",
        Available: 30,
        category: "planta",
    },

    {
        Img: 4,
        Name: "Platycerium Dawboy",
        Price: 80000,
        Details: "Canasta de alambre 30 cm, hibrido",
        Available: 12,
        category: "planta",
    },

    {
        Img: 14,
        Name: "Platycerium Stemaria",
        Price: 80000,
        Details: "Canasta de alambre 30 cm",
        Available: 15,
        category: "planta",
    },

    {
        Img: 3,
        Name: "Platycerium Coronarium",
        Price: 120000,
        Details: "Canasta de alambre 30 cm",
        Available: 18,
        category: "planta",
    },

    {
        Img: 28,
        Name: "Platycerium Wandae",
        Price: 250000,
        Details: "Canasta de alambre 30 cm, altura 70 cm",
        Available: 10,
        category: "planta",
    },
    {
        Img: 19,
        Name: "Platycerium Superbum",
        Price: 450000,
        Details: "Canasta de alambre 30 cm, altura 110 cm",
        Available: 8,
        category: "planta",
    },
    {
        Img: 29,
        Name: "Platycerium Willinckii",
        Price: 150000,
        Details: "Canasta de alambre 30 cm, variaciones en precio segun tamaño",
        Available: 10,
        category: "planta",
    },{
        Img: 10,
        Name: "Platycerium Hillii",
        Price: 150000,
        Details: "Canasta de alambre 30 cm",
        Available: 20,
        category: "planta",
    },
    {
        Img: 2,
        Name: "Platycerium Hillii/ Elephantotis",
        Price: 40000,
        Details: "Canastilla plastica 10x10 cm",
        Available: 10,
        category: "planta",
    },
    {
        Img: 38,
        Name: "Fungicida organico",
        Price: 65000,
        Details: "Oxitom: restaurador fisico quimico de suelos x 1 litro",
        Available: 20,
        category: "producto organico",
    },
    {
        Img: 38,
        Name: "Silicio soluble",
        Price: 50000,
        Details: "SiliPot: silicio + potasio soluble x 1 litro",
        Available: 20,
        category: "producto organico",
    },
    {
        Img: 38,
        Name: "Insecticida organico",
        Price: 44000,
        Details: "Biocida ecologico, acción efectiva contra insectos de caparazón blanda, hongos y bacterias",
        Available: 20,
        category: "producto organico",
    },
    {
        Img: 38,
        Name: "Fertilizante organico",
        Price: 75000,
        Details: "SM- BioAbono Liquido",
        Available: 20,
        category: "producto organico",
    },
    {
        Img: 39,
        Name: "Esporas P. Superbum",
        Price: 10000,
        Details: "2 gr ",
        Available: 20,
        category: "esporas",
    },
    {
        Img: 40,
        Name: "Esporas P. Coronarium",
        Price: 10000,
        Details: "2 gr",
        Available: 20,
        category: "esporas",
    },
];


// Hacer una solicitud HTTP para obtener información sobre la dirección IP del usuario
fetch('https://ipapi.co/json/', {
    mode: 'cors'
})
    .then(response => response.json())
    .then(data => {
        let currency = data.currency;
        let local = data.languages;
        localStorage.setItem('local', local);
        localStorage.setItem('currency', currency);
        // Acceder a la información de la dirección IP del usuario desde el objeto de respuesta
        const country = data.country_code.toLowerCase();

        const flagURL = 'https://www.worldometers.info/img/flags/' + country + '-flag.gif';

        const flagimage = document.getElementById('flag-image');

        flagimage.src = flagURL;
    })
    .catch(error => console.error(error));

function loadCurrency() {
    return {
        style: 'currency',
        currency: localStorage.getItem('currency'),
        currencyDisplay: 'symbol'
    }
    
}

function loadLocal() {
    return localStorage.getItem('local');
}