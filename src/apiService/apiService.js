// apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const obtenerCategorias = () => {
  return axios.get(`${API_BASE_URL}/categorias`);
};

export const crearCategoria = (nuevaCategoria) => {
  return axios.post(`${API_BASE_URL}/categorias`, nuevaCategoria);
};

export const actualizarCategoria = (id, categoriaActualizada) => {
  return axios.put(`${API_BASE_URL}/categorias/${id}`, categoriaActualizada);
};

export const eliminarCategoria = (id, state) => {
  return axios.put(`${API_BASE_URL}/categorias/${id}`, state);
};