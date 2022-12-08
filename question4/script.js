const APIURL = "https://api.github.com/users/";

// html_url: "https://github.com/Thahsina"

const main = document.getElementById("main");
const searchButton = document.getElementById("btn");
const search = document.getElementById("search");

getUser("thahsina");

async function getUser(username) {
  // const res = await axios.get(APIURL + username)
  // console.log(res);
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

async function getRepos(username){
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created')
        addReposToCard(data)
    } catch (err) {
        createErrorCard('Problem fetching repos')
    }

}









function createErrorCard(msg){
    const cardHTML = `
        <div class = "card" style="flex-direction:column; height: 500px; width: 800px; align-items:center">
            <h1>${msg}</h1>
            <img src="404 Page Not Found.png"  width="400" height="600" />
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

        <div id="repos">
            
        </div>
    </div>
</div>`

main.innerHTML = cardHTML;
}

searchButton.addEventListener("click", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);
    search.value = "";
  }
});


function addReposToCard(repos){
    const reposEl = document.getElementById('repos')

    repos
        .slice(0.5)
        .forEach(repo => {
            const repoEl= document.createElement('a')
            repoEl.classList.add('repo')
            repoEl.href = repo.html_url
            repoEl.target = '_blank'
            repoEl.innerText = repo.name

            reposEl.appendChild(repoEl)
        })
}