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

      const li = document.createElement("li");
      li.className = "list-group-item d-flex align-items-center gap-3";
      li.innerHTML = `
        <img src="${image}" alt="${trackName}" width="64" height="64" class="rounded">
        <div>
          <strong>${trackName}</strong><br>
          <small>Artiest: ${artists}</small><br>
          <small>Album: ${albumName}</small><br>
          <small><a href="${trackUrl}" target="_blank" class="text-decoration-none">Luister op Spotify</a></small><br>
          <small>Toegevoegd door: ${addedBy}</small><br>
          <small>Toegevoegd op: ${addedAt}</small>
        </div>
      `;
      list.appendChild(li);
    });
  })
  .catch(err => console.error("Fout bij laden JSON:", err));
