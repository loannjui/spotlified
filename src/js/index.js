import "normalize.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const songsContainer = document.querySelector("#favorites");

async function displaySongs() {
  songsContainer.innerHTML = "";
  getArtists().then((artists) => {
    artists.forEach((artist) => {
      getArtistsSongs(artist.id).then((songs) => {
        console.log(songs);
        songs.forEach((song) => {
          displaySong(song);
        });
      });
    });
  });
}

function displaySong(song) {
  songsContainer.innerHTML += `<li>
            <h3>${song.title}</h3>
            <div class="options">
              <button class="sml-btn">
                <i class="fa-solid fa-heart"></i>
              </button>
              <a class="sml-btn">
                <i class="fa-solid fa-play"></i>
              </a>
            </div>
          </li>`;
}

async function getArtistsSongs(id) {
  let urlSongs = `https://webmob-ui-22-spotlified.herokuapp.com/api/artists/${id}/songs`;
  return fetch(urlSongs).then((response) => response.json());
}



displayArtists();
displaySongs();
