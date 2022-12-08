const APIURL = "https://api.github.com/users/";


const main = document.getElementById("main");
const searchButton = document.getElementById("btn");
const search = document.getElementById("search");



async function getUser(username) {
  try {
    const { data } = await axios.get(APIURL + username);
    createUserCard(data);
  } catch (err) {
    if(err.response.status == 404) {
        createErrorCard('No Profile with this username')
    }
    else if (err.response.status == 403){
        createErrorCard('Exceeded search Limit for Today')          
    }
  }
}
getUser("madhumati");

function createErrorCard(msg){
    const cardHTML = `
        <div class = "card" style="flex-direction:column; height: 300px; width: 800px; align-items:center">
            <h1>${msg}</h1>
            
        </div>
    `
    main.innerHTML = cardHTML
}


const createUserCard = (user) => {
    const userID = user.name || user.login
    const userBio = user.bio ? `<p>${user.bio}</p>` : ''
    const cardHTML = `<div class="card">
    <div>
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
    </div>
    <div class="user-info">
        <h2>${userID}</h2>
        ${userBio}
        <ul>
            <li>${user.followers}<strong>Followers</strong></li>
            <li>${user.following} <strong>Following</strong></li>
            <li>${user.public_repos}<strong>Repos</strong></li>
        </ul>

  
            
        </div>
    </div>
</div>`

main.innerHTML = cardHTML;
}

searchButton.addEventListener("click", (e) => {
  e.preventDefault();           //loding not

  const user = search.value;

  if (user) {
    getUser(user);
    search.value = "";
  }
});

