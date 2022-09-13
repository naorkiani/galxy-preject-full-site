import http from "./httpService";
import JWTDecode from "jwt-decode";
const apiUrl = process.env.REACT_APP_API_URL;

export const register = (user) => http.post(`${apiUrl}user/register`, user);

export const login = async (user) => {
  const {
    data: { token },
  } = await http.post(`${apiUrl}user/login`, user);
  localStorage.setItem("token", token);
};

export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem("token");
    return JWTDecode(token);
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  return (window.location = "/");
};

export const getJWT = () => localStorage.getItem("token");

export const restPassword = (email) =>
  http.get(`${apiUrl}/user/rest?email=` + email);

export const newPassword = (email, newPass) =>
  http.post(`${apiUrl}/user/rest?email=${email}&newPass=${newPass}`);
