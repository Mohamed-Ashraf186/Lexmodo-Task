const dropDownBtn=document.querySelector('.dropbtn')
const cardsContainer=document.querySelector('.cards-container')
const searchBar=document.getElementById('search-bar')
const sortAToZ=document.querySelector('.a-z')
const sortZToA=document.querySelector('.z-a')
const dropdown=document.querySelector('.dropdown')

dropDownBtn.addEventListener('click',()=>document.querySelector('.dropdown-content').classList.toggle('show'))
document.addEventListener('click',(e)=>{
    if(!dropdown.contains(e.target)){
        document.querySelector('.dropdown-content').classList.remove('show')
    }
})


fetch('https://jsonplaceholder.typicode.com/users')
.then(value=>value.json())
.then(users=>{
    renderCard(users)
    searchBar.addEventListener('change',()=>handleSearch(users))
    searchBar.addEventListener('keyup',()=>handleSearch(users))
    sortAToZ.addEventListener('click',()=>handleSortAZ(users))
    sortZToA.addEventListener('click',()=>handleSortZA(users))
})  





function renderCard(users){
    let cardHtml=''
    users.map(user=>{
        cardHtml+=`<div class="contact-card ">
            <div class="profile">
                <div class="profile-info">
                    <h2>${user.name}</h2>
                    <p class="handle">@${user.username}</p>
                    <p class="desc">"${user.company.catchPhrase}"</p>
                </div>
                <div class="profile-picture">
                    <img src= "./assets/image-${user.id}.png" />
                </div>
            </div>
            <div class="seperator"></div>
    
            <div class="contact-info">
                <div class="email info">
                <div class="info-img-container">
                    <img src="./assets/envelope.svg" alt="email">
                </div>
                    <div class="info-text">
                        ${user.email}
                    </div>
                </div>
    
                <div class="address info">
                <div class="info-img-container">
                    <img src="./assets/location-pin.svg" alt="location-pin">
                </div>
                    <div class="info-text">
                        ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}, ${user.address.geo.lat}, ${user.address.geo.lng}
                    </div>
                </div>
    
                <div class="phone info">
                <div class="info-img-container">
                    <img src="./assets/phone.svg" alt="phone">
                </div>
                    <div class="info-text">
                        ${user.phone}
                    </div>
                </div>
    
                <div class="website info">
                <div class="info-img-container">
                    <img src="./assets/website.svg" alt="website">
                </div>
                    <div class="info-text">
                        ${user.website}
                    </div>
                </div>
    
                <div class="employer info">
                <div class="info-img-container">
                    <img src="./assets/Employer.svg" alt="Employer">
                </div>
                    <div class="info-text">
                        ${user.company.name}
                    </div>
                </div>
    
                <div class="industrial info">
                <div class="info-img-container">
                    <img src="./assets/industrial 1.svg" alt="industrial 1">
                </div>
                    <div class="info-text">
                        ${user.company.bs}
                    </div>
                </div>
            </div>
        </div>
        `
    })
    cardsContainer.innerHTML=cardHtml
}



function handleSearch(users){
    let searchInput= searchBar.value.toLowerCase();
    const matchingUsers=  users.filter(user=>{
        return user.name.toLowerCase().includes(searchInput)
    })
    if(matchingUsers.length){
        renderCard(matchingUsers)
    }else{
        cardsContainer.innerHTML=`
            <h2>no customer(s) found within the
            search criteria.</h2>
        `
    }
}


function handleSortAZ(users){
    users.sort((a, b)=> {
        if (a.name < b.name) {
        return -1;
        }
        if (a.name > b.name) {
        return 1;
        }
        return 0;
    });
    renderCard(users);
}

function handleSortZA(users){
    users.sort((b, a)=> {
        if (a.name < b.name) {
        return -1;
        }
        if (a.name > b.name) {
        return 1;
        }
        return 0;
    });
    renderCard(users)
}