//Targets the profile section//
const overview = document.querySelector(".overview");
const username = "Raider-WilliamsEarl";

const gitData = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    fetchedGit(data);
};

gitData();

const fetchedGit = function (data) {
    let divItem = document.createElement("div");
    divItem.classList.add("user-info")
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
}