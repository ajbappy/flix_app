const global = {
  currentPage: window.location.pathname,
};

// active route

const activeRoute = () => {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
};
// fetch api from tmdb

async function fetchAPIData(endpoint) {
  const API_KEY = "5465c6830686d79250a9728080b1efea";
  const API_URL = "https://api.themoviedb.org/3/";

  showSpiner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();
  hideSpiner();

  return data;
}

// show and hide spinner

function showSpiner() {
  document.querySelector(".spinner").classList.add("show");
}
function hideSpiner() {
  document.querySelector(".spinner").classList.remove("show");
}

// disply popular movie
async function displayPopularMovie() {
  const { results } = await fetchAPIData("movie/popular");
  console.log(results);

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
  ${
    movie.poster_path
      ? `<img
    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
    class="card-img-top"
    alt="${movie.title}"
  />`
      : `
  <img
  src="../images/no-image.jpg"
  class="card-img-top"
  alt="${movie.title}"
/>

  `
  }
  </a>
  <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <p class="card-text">
      <small class="text-muted">Release: ${movie.release_date}</small>
    </p>
  </div>
    `;
    document.querySelector("#popular-movies").appendChild(div);
  });
}

// display movie details

async function displayMovieDetails() {
  const movieId = window.location.search.split("=")[1];
  const result = await fetchAPIData(`movie/${movieId}`);

  const div = document.querySelector("#movie-details");
  div.innerHTML = `
<div class="details-top">
<div>
${
  result.poster_path
    ? `<img
  src="https://image.tmdb.org/t/p/w500${result.poster_path}"
  class="card-img-top"
  alt="${result.title}"
/>`
    : `
<img
src="../images/no-image.jpg"
class="card-img-top"
alt="${result.title}"
/>

`
}
</div>
<div>
  <h2>${result.title}</h2>
  <p>
    <i class="fas fa-star text-primary"></i>
    ${result.vote_average.toFixed(1)} / 10
  </p>
  <p class="text-muted">Release Date:${result.release_date}</p>
  <p>
  ${result.overview}
  </p>
  <h5>Genres</h5>
  <ul class="list-group">
    ${result.genres.map((gener) => `<li>${gener.name}</li>`).join(" ")}
  </ul>
  <a href="${
    result.homepage
  }" target="_blank" class="btn">Visit Movie Homepage</a>
</div>
</div>
<div class="details-bottom">
<h2>Movie Info</h2>
<ul>
  <li><span class="text-secondary">Budget:</span> $${numberWithCommas(
    result.budget
  )}</li>
  <li><span class="text-secondary">Revenue:</span> $${numberWithCommas(
    result.revenue
  )}</li>
  <li><span class="text-secondary">Runtime:</span> ${
    result.runtime
  } minutes</li>
  <li><span class="text-secondary">Status:</span> ${result.status}</li>
</ul>
<h4>Production Companies</h4>
<div class="list-group">${result.production_companies
    .map((company) => `<span>${company.name}</span>`)
    .join(",")}</div>
</div>
`;
  //  display background image
  ovarlayBackground("movies", result.backdrop_path);
}

// display background overlay for details pages

function ovarlayBackground(type, backgroundPath) {
  const overlayDiv = document.createElement("div");

  overlayDiv.innerHTML = `<h2>hellow there</h2>`;

  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-reapet";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.1";
  if (type === "movies") {
    document.getElementById("movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}

// display tv-shows

async function displayTvShows() {
  const { results } = await fetchAPIData("tv/popular");
  console.log(results);
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
  <a href="tv-details.html?id=${show.id}">
 ${
   show.poster_path
     ? `
  <img
  src="https://image.tmdb.org/t/p/w500${show.poster_path}"
  class="card-img-top"
  alt="${show.title}"
/>`
     : `
<img
src="../images/no-image.jpg"
class="card-img-top"
alt="${show.title}"
/>`
 }
</a>
<div class="card-body">
  <h5 class="card-title">${show.name}</h5>
  <p class="card-text">
    <small class="text-muted">Aired:${show.first_air_date}</small>
  </p>
</div>

  `;
    document.querySelector("#popular-shows").appendChild(div);
  });
}

// display tv details

async function displayTvDetails() {
  const showId = window.location.search.split("=")[1];
  const result = await fetchAPIData(`tv/${showId}`);

  console.log(result);

  const div = document.getElementById("show-details");
  div.innerHTML = `
  <div class="details-top">
<div>
${
  result.poster_path
    ? `<img
  src="https://image.tmdb.org/t/p/w500${result.poster_path}"
  class="card-img-top"
  alt="${result.title}"
/>`
    : `
<img
src="../images/no-image.jpg"
class="card-img-top"
alt="${result.title}"
/>

`
}
</div>
<div>
  <h2>${result.title}</h2>
  <p>
    <i class="fas fa-star text-primary"></i>
    ${result.vote_average.toFixed(1)} / 10
  </p>
  <p class="text-muted">Last air date Date:${result.last_air_date}</p>
  <p>
  ${result.overview}
  </p>
  <h5>Genres</h5>
  <ul class="list-group">
    ${result.genres.map((gener) => `<li>${gener.name}</li>`).join(" ")}
  </ul>
  <a href="${
    result.homepage
  }" target="_blank" class="btn">Visit Movie Homepage</a>
</div>
</div>
<div class="details-bottom">
<h2>Movie Info</h2>

<ul>
  <li><span class="text-secondary">Episodes:</span> ${
    result.number_of_episodes
  }</li>
  <li><span class="text-secondary">Last Epsode to Air:</span> ${
    result.last_episode_to_air.name
  }</li>
  <li><span class="text-secondary">Status:</span> ${result.status}</li>
</ul>

<h4>Production Companies</h4>
<div class="list-group">${result.production_companies
    .map((company) => `<span>${company.name}</span>`)
    .join(",")}</div>
</div>
  `;
  ovarlayBackground("tv", result.backdrop_path);
}

// add commas to number

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// init function

const init = () => {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovie();
      break;

    case "/shows.html":
      displayTvShows();
      break;

    case "/movie-details.html":
      displayMovieDetails();
      break;

    case "/tv-details.html":
      displayTvDetails();
      break;
    case "/search.html":
      console.log("search");
      break;
  }

  activeRoute();
};

document.addEventListener("DOMContentLoaded", init);
