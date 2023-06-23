const dropDownBtn=document.querySelector('.dropbtn')
const cardsContainer=document.querySelector('.cards-container')
const searchBar=document.getElementById('search-bar')
const sortAToZ=document.querySelector('.a-z')
const sortZToA=document.querySelector('.z-a')

dropDownBtn.addEventListener('click',()=>document.querySelector('.dropdown-content').classList.toggle('show'))

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
                    <img src="./assets/envelope.svg" alt="email">
                    <span>
                        ${user.email}
                    </span>
                </div>
    
                <div class="address info">
                    <img src="./assets/location-pin.svg" alt="location-pin">
                    <span>
                        ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}, ${user.address.geo.lat}, ${user.address.geo.lng}
                    </span>
                </div>
    
                <div class="phone info">
                    <img src="./assets/phone.svg" alt="phone">
                    <span>
                        ${user.phone}
                    </span>
                </div>
    
                <div class="website info">
                    <img src="./assets/website.svg" alt="website">
                    <span>
                        ${user.website}
                    </span>
                </div>
    
                <div class="employer info">
                    <img src="./assets/Employer.svg" alt="Employer">
                    <span>
                        ${user.company.name}
                    </span>
                </div>
    
                <div class="industrial info">
                    <img src="./assets/industrial 1.svg" alt="industrial 1">
                    <span>
                        ${user.company.bs}
                    </span>
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
