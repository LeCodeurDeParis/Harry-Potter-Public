//On initialise les variables

let nbrCarteBooster = 0 //Nombre de cartes dans le booster (on incrémente dans la boucle)
let deck = [] //Deck de cartes
let favorits = [] //Deck de cartes favorites
let all = [] //Deck de toutes les cartes

let indexContainer = document.getElementById('AllContainer')


//Fonction pour récupérer les données de l'API
function fetchHP(){
    return fetch('https://hp-api.lainocs.fr/characters')
    .then((response) => response.json())
}

async function fetchHPCard(){
    all = await fetchHP()
}
fetchHPCard()

document.getElementById('icone_menu').addEventListener('click', function() {             //Fonction pour ouvrir et fermer le menu
    let menu = document.querySelector('.menu')                                           //On récupère le menu
    menu.classList.toggle('show')                                                        //On ajoute ou on enlève la classe show afin d'ouvrir ou fermer le menu                      
    this.style.left = menu.classList.contains('show') ? '250px' : '0px'                 //On change la position de l'icone du menu en fonction de si le menu est ouvert ou fermé
})

document.getElementById('icone_echange').addEventListener('click', function() {             //Fonction pour ouvrir et fermer le menu
    let popup = document.querySelector('#popup-content')                                           //On récupère le menu
    popup.classList.toggle('show')                                                        //On ajoute ou on enlève la classe show afin d'ouvrir ou fermer le menu                      
})

setInterval(() => {
    if (indexContainer.children.length == 0){ 
        indexContainer.classList.add('empty')
    } else {
        indexContainer.classList.remove('empty')
    }
}, 100)

async function goProfil(){
    const tokenUser = localStorage.getItem('token');
    console.log(tokenUser);
    if(tokenUser){
        window.location.href = 'users_DisplayProfile.html'
    }
    else{
        window.location.href = 'Users_Profiles.html';
    }
}