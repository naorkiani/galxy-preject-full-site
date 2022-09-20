import http from "./httpService";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

axios.defaults.headers.common["token"] = localStorage.getItem("token");

export const getCard = (cardId) => http.get(`${apiUrl}/cards/card/${cardId}`);

export const getCards = () => http.get(`${apiUrl}cards/cards`);

export const getMyCards = () => http.get(`${apiUrl}cards/my-cards`);

export const getfavCards = (id) => http.get(`${apiUrl}cards/myfavlanch`);

export const createCard = (card) => http.post(`${apiUrl}cards/`, card);

export const deleteCard = (cardId) => http.delete(`${apiUrl}cards/${cardId}`);

export const editCard = (card) => http.put(`${apiUrl}/cards/${card._id}`, card);

export const changeLikeStatus = async (cardId) =>
  http.patch(`${apiUrl}cards/card-like/${cardId}`);
