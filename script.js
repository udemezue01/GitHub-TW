document.getElementById("search-btn").addEventListener("click", () => {
    const username = document.getElementById("search-input").value;
    if (username) {
        fetchGitHubUser(username);
    }
});

function fetchGitHubUser(username) {
    const apiUrl = `https://api.github.com/users/${username}`;

    fetch(apiUrl)
        .then((response) => {
            if (response.status === 404) {
                displayError("User not found");
                document.getElementById("user-profile").classList.add("hidden");
            } else {
                return response.json();
            }
        })
        .then((data) => {
            if (data) {
                displayUserProfile(data);
            }
        })
        .catch((error) => {
            displayError("An error occurred while fetching user data.");
        });
}

function displayUserProfile(user) {
    document.getElementById("avatar").src = user.avatar_url;
    document.getElementById("username").textContent = user.name || "No Name";
    document.getElementById("bio").textContent = user.bio || "No bio available";
    document.getElementById("repos").textContent = user.public_repos;
    document.getElementById("followers").textContent = user.followers;
    document.getElementById("following").textContent = user.following;
    document.getElementById("profile-link").href = user.html_url;

    document.getElementById("user-profile").classList.remove("hidden");
    document.getElementById("error-message").classList.add("hidden");
}

function displayError(message) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}
