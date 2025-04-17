//Targets the profile section//
const overview = document.querySelector(".overview");
const username = "Raider-WilliamsEarl";
const repoList = document.querySelector(".repo-list");
const reposClass = document.querySelector(".repos");
const repoDataClass = document.querySelector(".repo-data");
const backToRepo = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos")

//Targets unordered list//


//Fetches GitHub Profile//
const gitData = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    fetchedGit(data);
};

gitData();

const fetchedGit = function (data) {
    let divItem = document.createElement("div");
    divItem.classList.add("user-info");
    divItem.innerHTML = `<figure>
        <img alt="user avatar" src = ${data.avatar_url}/>
    </figure >
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    overview.append(divItem);
    gitRepoData()
}

//Fetches Repo Data//
const gitRepoData = async function () {
    const repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoRes.json();
    fetchedRepos(repoData);
}

const fetchedRepos = function (repos) {
    filterInput.classList.remove("hide")
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repos-repoList.append(repoItem);
    }
}

repoList.addEventListener("click", function (e){
    if (e.target.matches("h3")) {
       const  repoName = e.target. innerText;
       getRepoName(repoName);
    }
});

const getRepoName = async function (repoName) {
    const specRepoRes = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const specRepoData = await specRepoRes.json();

    //Get Languages//
    const fetchLanguages = await fetch (specRepoData.languages_url)
    const languageData = await fetchLanguages.json();
    console.log(languageData)

    //List of languages//
    const languages = []
    for (const language in languageData) {
        languages.push(language);
    }
    displayRepoInfo(specRepoData, languages);
};

//Displays Languages//
const displayRepoInfo = async function (specRepoData, languages) {
    repoDataClass.innerHTML="";
    repoDataClass.classList.remove("hide");
    reposClass.classList.add("hide");
    backToRepo.classList.remove("hide");
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${specRepoData.name}</h3>
    <p>Description: ${specRepoData.description}</p>
    <p>Default Branch: ${specRepoData.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${specRepoData.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoDataClass.append(div);
};

backToRepo.addEventListener("click", function(){
    reposClass.classList.remove("hide");
    repoDataClass.classList.add("hide");
    backToRepo.classList.add("hide")
})

filterInput.addEventListener("input", function(e) {
   const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchLowerText = searchText.toLowerCase();

    for (const repo of repos) {
        const repoLowerText =repo.innerText.toLowerCase();
        if (repoLowerText.includes(searchLowerText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});