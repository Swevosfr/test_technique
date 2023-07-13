import jwt_decode from "jwt-decode";
import Error from "../utils/Error";

const AuthGuard = ({ children }) => {
  let token = localStorage.getItem("token");

  if (!token) {
    return <Error />;
  }

  const decodedToken = jwt_decode(token);

  // check if the token has expired
  let dateNow = new Date();
  if (decodedToken.exp < dateNow.getTime() / 1000) {
    // token has expired, delete it and require re-login
    localStorage.removeItem("token");
    return <Error />;
  }

  return children;
};

export default AuthGuard;
