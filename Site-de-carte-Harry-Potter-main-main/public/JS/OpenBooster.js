const resultatCartes = document.getElementById('AllContainer')


async function GetProfile(){
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3000/getMyProfile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    const data = await response.json()
    let id = data.id
    return id
}

async function Ouverture(){
    let id = await GetProfile()
    // const token = localStorage.getItem('token')
    // if (!token) {
    //     alert("Token inexistant. Veuillez vous connecter.")
    //     return
    // }
    const response = await fetch('http://localhost:3000/openBooster', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: id })
    })
    const data = await response.json()
    if (data.message) {
        alert(data.message)
        return
    }
    resultatCartes.innerHTML = ""
    for (let i = 0; i < 5; i++){
        resultatCartes.innerHTML += `
        <div id="carteContainer" >
            <img src="${data[i].image}" alt="${data[i].name}">
            <div id ="legendeHTML">
                <div id="nomHTML"><h2>${data[i].name}</h2></div>
            </div>
        </div>
        `
    }
}
async function Reset(){
    let id = await GetProfile()
    await fetch('http://localhost:3000/resetBooster', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: id })
    })    
}


