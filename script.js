// script.js

async function getUser() {
  const username = document.getElementById("username").value.trim();
  const cardContainer = document.getElementById("card-container");
  const loader = document.getElementById("loader");
  const error = document.getElementById("error");

  // Reset UI
  cardContainer.innerHTML = "";
  error.textContent = "";

  if (!username) {
    error.textContent = "⚠️ Please enter a GitHub username";
    return;
  }

  // Show loader
  loader.classList.remove("d-none");

  try {
    //  GitHub API
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();

    // Build user card HTML
    const cardHTML = `
      <div class="github-card">
        <img src="${data.avatar_url}" alt="${data.login} profile picture">
        <h3>${data.name || data.login}</h3>
        <p>${data.bio || "No bio available"}</p>
        <div class="stats">
          <div class="stat">Repos: <strong>${data.public_repos}</strong></div>
          <div class="stat">Followers: <strong>${data.followers}</strong></div>
          <div class="stat">Following: <strong>${data.following}</strong></div>
        </div>
        <a href="${data.html_url}" target="_blank" class="btn btn-sm btn-dark mt-3">
          Visit Profile
        </a>
      </div>
    `;

    cardContainer.innerHTML = cardHTML;

  } catch (err) {
    error.textContent = "❌ " + err.message;
  } finally {
    loader.classList.add("d-none"); // Hide loader
  }
}
