fetch("JSON/script.json")
  .then(r => r.json())
  .then(data => {
    const items = data.items || [];
    const list = document.getElementById("playlist");
    if (!list) return console.warn("Element #playlist niet gevonden");
    list.innerHTML = "";

    items.forEach(item => {
      const track = item.track;
      if (!track) return;

      const trackName = track.name || "";
      const artists = (track.artists || []).map(a => a.name).join(", ");
      const albumName = track.album?.name || "";
      const addedBy = item.added_by?.id || "Onbekend";
      const addedAt = item.added_at 
        ? new Date(item.added_at).toLocaleString("nl-NL", {
            dateStyle: "medium",
            timeStyle: "short"
          })
        : "";
      const image = track.album?.images?.[0]?.url || "";
      const trackUrl = track.external_urls?.spotify || "#";

      const div = document.createElement("div");
      div.className = "col-md-4";

      div.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${image}" class="card-img-top" alt="${trackName}">
          <div class="card-body">
            <h6 class="card-title">${trackName}</h6>
            <p class="card-text mb-1"><small>Artiest: ${artists}</small></p>
            <p class="card-text mb-1"><small>Album: ${albumName}</small></p>
            <p class="card-text mb-1">
              <a href="${trackUrl}" target="_blank" class="text-decoration-none">Luister op Spotify</a>
            </p>
            <p class="card-text mb-1"><small>Toegevoegd door: ${addedBy}</small></p>
            <p class="card-text"><small>Toegevoegd op: ${addedAt}</small></p>
          </div>
        </div>
      `;

      list.appendChild(div);
    });
  })
  .catch(err => console.error("Fout bij laden JSON:", err));
