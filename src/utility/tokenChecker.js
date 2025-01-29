export const checkJwtExpiration = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return;

  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const expirationTime = decodedToken.exp * 1000;

  if (Date.now() >= expirationTime) {
    localStorage.removeItem("shiftStatus");
    localStorage.removeItem("breakStatus");
    localStorage.removeItem("user");
    localStorage.removeItem("startingTime");
    localStorage.removeItem("authToken");
    localStorage.removeItem("dataToken");
    window.location.href = "/login";
  }
};
