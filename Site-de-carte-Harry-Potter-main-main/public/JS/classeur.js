const filtreBouton = document.querySelectorAll('input[type=radio][name="maison"]') //récupérations des valeurs des boutons de filtre dans "classeur"
const deckHTML = document.getElementById("cardContainer") //récupération de l'élément HTML où on va afficher les cartes (ici dans "classeur")
const profilHTML = document.getElementsByClassName('profil') //récupération de l'élément HTML où on va afficher les profils (ici dans "profil").
const singleCardHTML = document.getElementById('triDeck')
const searchInput = document.querySelector('#search')


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

searchInput.addEventListener('input', async () => {
    let searchValue = searchInput.value.toLowerCase();
    const filteredDeck = all.filter(card => {
      return card.name.toLowerCase().includes(searchValue);
    });
    
    if (searchValue == '') {
        showDeck();
        return;
    }

    deckHTML.innerHTML = '';
    filteredDeck.forEach(card => {
        deckHTML.innerHTML += `
        <div class="deck" data-slug="${card.slug}">
            <img src = "${card.image}" alt = " ${card.name}"/>
            <div class="favoris">
                <img src="../images/coeur_non-rempli.png">
            </div>
            <div class="legendCard">
                <h3>Nom: ${card.name}</h3>
                <h3>Maison: ${card.house}</h3>
                <h3>Acteur: ${card.actor}</h3>
            </div>
        </div>
        `;
    })
    let cardProfil = document.getElementsByClassName('deck')
    for (let element of cardProfil){
        element.addEventListener('click', async (event) => {
            window.location.href = `ProfilCard.html?id=${element.dataset.slug}`;
        })
    } 
})

//Fonction pour afficher le deck
async function showDeck(){
    apiData = await fetchHP()                                                                   //On récupère les données de l'API
    let allHouses = []                                                                          //On crée un tableau vide pour trier les cartes en fonction de la maison    
    let gryf = []                                                                               //On crée un tableau vide pour trier les cartes de Gryffindor
    let huff = []                                                                               //On crée un tableau vide pour trier les cartes de Hufflepuff
    let raven = []                                                                              //On crée un tableau vide pour trier les cartes de Ravenclaw
    let slyth = []                                                                              //On crée un tableau vide pour trier les cartes de Slytherin
    apiData.forEach((chara) => {                                                                //On trie les cartes en fonction de la maison
        if (chara.house == "Gryffindor"){
            gryf.push(chara)
        }
        else if (chara.house == "Hufflepuff"){
            huff.push(chara)
        }
        else if (chara.house == "Ravenclaw"){
            raven.push(chara)
        }
        else if (chara.house == "Slytherin"){
            slyth.push(chara)
        }
        else{
            allHouses.push(chara)
        }
    })
    let CharaTriHouses = gryf.concat(huff, raven, slyth, allHouses)                                                  //On concatène les tableaux pour les afficher dans l'ordre
    deckHTML.innerHTML = ''                                                                     //On vide la div où on va afficher les cartes
    CharaTriHouses.forEach((element => {                                                              //On affiche les cartes dans la div
        deckHTML.innerHTML += `
        <div class="deck" data-slug="${element.slug}">
            <img src = "${element.image}" alt = " ${element.name}"/>
            <div class="favoris">
                <img src="../images/coeur_non-rempli.png">
            </div>
            <div class="legendCard">
                <h3>Nom: ${element.name}</h3>
                <h3>Maison: ${element.house}</h3>
                <h3>Acteur: ${element.actor}</h3>
            </div>
        </div>
        `;
    }))
    let cardProfil = document.getElementsByClassName('deck')
    for (let element of cardProfil){
        element.addEventListener('click', async (event) => {
            window.location.href = `ProfilCard.html?id=${element.dataset.slug}`;
        })
    } 
}

//On affiche le deck
if (window.location.pathname.includes('classeur.html'))
    {
        showDeck()
    }


//On récupère les valeurs des boutons de filtre 
filtreBouton.forEach((bouton) => {
    bouton.addEventListener('change', async() =>{
        const apiData = await fetchHP()
        houseChoice = bouton.id                                     //On attribue l'id du bouton à houseChoice
        let triHouse = []                                           //On crée un tableau vide pour trier les cartes en fonction de la maison
        if (houseChoice == "all"){                                  //Si le bouton "all" est sélectionné, on affiche toutes les cartes
            showDeck()
        }
        else if (houseChoice == "Sans_Maison"){                            //Si le bouton "none" est sélectionné, on affiche les cartes qui n'ont pas de maison
            apiData.forEach((chara => {
                if (!chara.house || chara.house.trim() === ""){     //On vérifie si la maison est vide ou null
                    triHouse.push(chara)
                }
            }))
        }
        else{                                                       //Si un autre bouton est sélectionné, on affiche les cartes en fonction de la maison       
            apiData.forEach((chara) => {
                if (chara.house == houseChoice){
                    triHouse.push(chara)
                }
            })
        }
        displayTriHouse(triHouse)                               //On affiche les cartes triées avec la fonction displayTriHouse (définie plus bas)
    switch (houseChoice) {                                          //On change la couleur de fond et de bordure en fonction du filtre sélectionné pour l'UX 
        case 'Gryffindor':
            deckHTML.style.backgroundColor = '#8b0000';
            deckHTML.style.border = '2px solid #740001';
            break;
        case 'Hufflepuff':
            deckHTML.style.backgroundColor = '#B88656';
            deckHTML.style.border = '2px solid #8B814F';
            break;
        case 'Ravenclaw':
            deckHTML.style.backgroundColor = '#222f5b';
            deckHTML.style.border = '2px solid #0e1a40';
            break;
        case 'Slytherin':
            deckHTML.style.backgroundColor = '#2A855A';
            deckHTML.style.border = '2px solid #1a472a';
            break;
        default:
            deckHTML.style.backgroundColor = '#0b132b';
            deckHTML.style.border = '2px solid #231ea5';
        }
    })
})


//Fonction pour afficher les cartes triées fonctionnant de la même manière que la fonction showDeck

async function displayTriHouse(triHouse){
    deckHTML.innerHTML = ''
    triHouse.forEach((element => {
        deckHTML.innerHTML += `
        <div class="triDeck" data-slug="${element.slug}">
            <img src = "${element.image}" alt = " ${element.name}"/>
            <div class="favoris">
                <img src="../images/coeur_non-rempli.png">
            </div>
            <div class="legendCard">
                <h3>Nom: ${element.name}</h3>
                <h3>Maison: ${element.house}</h3>
                <h3>Acteur: ${element.actor}</h3>
            </div>
        </div>
        `;
    }))
    let cardProfil = document.getElementsByClassName('triDeck')
    for (let element of cardProfil){
        element.addEventListener('click', async (event) => {
            window.location.href = `ProfilCard.html?id=${element.dataset.slug}`;
        })
    } 
}

async function getColor(){
    const response = await fetch('/Color');
    const data = await response.json();
    const card = data.message;
    console.log(card);
}

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