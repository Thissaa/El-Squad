document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("spotify_access_token");

  if (!token) {
    console.warn("Nog geen Spotify token gevonden.");
    return;
  }

  fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", {
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log("Top tracks:", data);
      toonTopTracks(data.items);
    })
    .catch(err => {
      console.error("Fout bij ophalen top artiesten:", err);
    });
});



function haalTopTracksOp() {
  const token = localStorage.getItem("spotify_access_token");
  if (!token) return;

  fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", {
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(res => res.json())
    .then(data => {
      toonTopTracks(data.items);
    })
    .catch(err => {
      console.error("Fout bij ophalen top tracks:", err);
    });
}


function toonTopTracks(tracks) {
  const container = document.querySelector(".top-tracks-container");
  if (!container) return;

  container.innerHTML = "";

  tracks.forEach(track => {
    const artists = track.artists.map(a => a.name).join(", ");
    const html = `
      <div class="col">
        <div class="card h-100 shadow">
          <img src="${track.album.images[0].url}" class="card-img-top" alt="${track.name}">
          <div class="card-body">
            <h5 class="card-title">${track.name}</h5>
            <p class="card-text text-muted">${artists}</p>
          </div>
          <div class="card-footer text-center">
            <a href="${track.external_urls.spotify}" target="_blank" class="btn btn-success btn-sm">Open in Spotify</a>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += html;
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (!localStorage.getItem("spotify_access_token")) {
    console.warn("Geen toegangstoken gevonden");
    return;
  }

  // Als we op de juiste pagina zitten: voer de functie uit
  if (path.includes("top-nummers.html")) {
    haalTopTracksOp();
  }
});

