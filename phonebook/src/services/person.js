import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

function getAll() {
  return axios.get(baseUrl);
}

function postPerson(person) {
  return axios.post(`${baseUrl}`, person);
}

function getPersonById(id) {
  return axios.get(`${baseUrl}/${id}`);
}

function getPersonByName(name) {
  return axios.get(`${baseUrl}?name=${name}`);
}

function deletePerson(id) {
  return axios.delete(`${baseUrl}/${id}`);
}

function updatePerson(person) {
  return axios.put(`${baseUrl}/${person.id}`, person);
}

export default {
  getAll,
  postPerson,
  getPersonByName,
  getPersonById,
  deletePerson,
  updatePerson,
};
