import jwtDecode from "jwt-decode";

/**
 * Permet de savoir si on est authentifié ou pas
 */
function isAuthenticated() {
  const token = window.localStorage.getItem("token");

  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      return true;
    } else {
      window.localStorage.removeItem("token");
      return false;
    }
  }
  return false;
}


export default {
  isAuthenticated
};
