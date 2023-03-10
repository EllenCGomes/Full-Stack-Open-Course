import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => { return axios.get(baseUrl).then(response => response.data) };

const getPerson = (id) => { return axios.get(`${baseUrl}/${id}`) };

const create = (newObject) => { return axios.post(baseUrl, newObject).then(response => response.data) };

const update = (id, newObject) => { return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data) };

const deletePerson = (id) => { return axios.delete(`${baseUrl}/${id}`) }

export default { getAll, getPerson, create, update, deletePerson }