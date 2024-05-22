document.getElementById('icone_menu').addEventListener('click', function() {             //Fonction pour ouvrir et fermer le menu
    let menu = document.querySelector('.menu')                                           //On récupère le menu
    menu.classList.toggle('show')                                                        //On ajoute ou on enlève la classe show afin d'ouvrir ou fermer le menu                      
    this.style.left = menu.classList.contains('show') ? '250px' : '0px'                 //On change la position de l'icone du menu en fonction de si le menu est ouvert ou fermé
})

document.getElementById('icone_echange').addEventListener('click', function() {             //Fonction pour ouvrir et fermer le menu
    let popup = document.querySelector('#popup-content')                                           //On récupère le menu
    popup.classList.toggle('show')                                                        //On ajoute ou on enlève la classe show afin d'ouvrir ou fermer le menu                      
})

async function fetchMyCards(){
    const token = localStorage.getItem('token');
    const response = await fetch("http://localhost:3000/getUserCards",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })
    const data = await response.json();
    return data;
}

async function DisplayMyCards(){
    const datacards = await fetchMyCards();
    console.log(datacards);
    const cardContainer = document.getElementById("cartesUser");
    const cards = datacards.cards;
    cardContainer.innerHTML = "";
    cards.forEach(card => {
        cardContainer.innerHTML += `
            <div class="deck" data-slug="${card.slug}">
            <img src = "${card.imageUrl}" alt = " ${card.name}"/>
            <div class="legendCard">
                <h3>Nom: ${card.name}</h3>
                <h3>Maison: ${card.house}</h3>
                <h3>Acteur: ${card.actor}</h3>
                <h3>Quantité: ${card.quantity}</h3>
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
}

DisplayMyCards();

async function logout(){
    localStorage.removeItem('token');
    window.location.href = 'Users_Profiles.html';
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