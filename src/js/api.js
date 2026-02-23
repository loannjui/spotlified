const BASEURL = "https://webmob-ui-22-spotlified.herokuapp.com";
// Artists
const artistURL = "/api/artists/";
export async function getArtists() {
  return fetch(`${BASEURL}${artistURL}`).then((response) => response.json());
}
//Search
const searchURL = "/api/songs/search/";
export async function getSearchQuery(query) {
  let urlSongs = `${BASEURL}${searchURL}${query}`;
  return fetch(urlSongs).then((response) => response.json());
}
//Songs list 
const songsURL ="/songs";
export async function getSongs(artistID) {
  let urlSongs = `${BASEURL}${artistURL}${artistID}${songsURL}`;
  return fetch(urlSongs).then((response) => response.json());
}