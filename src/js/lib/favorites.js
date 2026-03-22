const FAVORITES = "favorites";

const getAll = () => JSON.parse(localStorage.getItem(FAVORITES)) || {};

export const addFavorite = (id, song) => {
  const favorites = getAll();
  favorites[id] = JSON.parse(song); // ← id comme clé, song comme valeur
  localStorage.setItem(FAVORITES, JSON.stringify(favorites));
};

export const removeFavorite = (id) => {
  const favorites = getAll();
  delete favorites[id];
  localStorage.setItem(FAVORITES, JSON.stringify(favorites));
};

export const getFavorite = (id) => {
  const favorites = getAll();
  return favorites[id] || null;
};