const audioURL = window.location.search.substring(1);
console.log(audioURL);

const player = document.querySelector("#music");

player.innerHTML = `<audio controls src="${audioURL}"></audio>`;