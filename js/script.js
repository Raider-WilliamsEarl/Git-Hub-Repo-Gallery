//Targets the profile section//
const overview = document.querySelector(".overview");
const username = "Raider-WilliamsEarl";
const reposClass = document.querySelector(".repos");
const repoDataClass = document.querySelector(".repo-data")

//Targets unordered list//
const repoList = document.querySelector("ul");

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

const gitRepoData = async function () {
    const repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoRes.json();
    fetchedRepos(repoData);
}

const fetchedRepos = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repos-repoList.append(repoItem);
    }
}

