// apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

/*--------------------------- Categorias -------------------------*/

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

/*--------------------------- Inventario -------------------------*/

export const obtenerInventario = () => {
  return axios.get(`${API_BASE_URL}/Inventario`);
};

export const crearInventario = (nuevoInventario) => {
  return axios.post(`${API_BASE_URL}/Inventario`, nuevoInventario);
};

export const actualizarInventario = (id, InventarioActualizado) => {
  return axios.put(`${API_BASE_URL}/Inventario/${id}`, InventarioActualizado);
};

export const eliminarInventario = (id, state) => {
  return axios.put(`${API_BASE_URL}/Inventario/${id}`, state);
};

/*--------------------------- Lotes -------------------------*/

export const obtenerLotes = () => {
  return axios.get(`${API_BASE_URL}/Lotes`);
};

export const crearLotes = (nuevoLote) => {
  return axios.post(`${API_BASE_URL}/Lotes`, nuevoLote);
};

export const actualizarLotes = (id, LoteActualizado) => {
  return axios.put(`${API_BASE_URL}/Lotes/${id}`, LoteActualizado);
};

export const eliminarLotes = (id, state) => {
  return axios.put(`${API_BASE_URL}/Lotes/${id}`, state);
};

/*--------------------------- Productos -------------------------*/

export const obtenerProductos = () => {
  return axios.get(`${API_BASE_URL}/Productos`);
};

export const crearProductos = (nuevoProducto) => {
  return axios.post(`${API_BASE_URL}/Productos`, nuevoProducto);
};

export const actualizarProductos = (id, ProductoActualizado) => {
  return axios.put(`${API_BASE_URL}/Productos/${id}`, ProductoActualizado);
};

export const eliminarProductos = (id, state) => {
  return axios.put(`${API_BASE_URL}/Productos/${id}`, state);
};

/*--------------------------- Unidad de Medida -------------------------*/

export const obtenerUnidadMedida = () => {
  return axios.get(`${API_BASE_URL}/UnidadMedida`);
};

export const crearUnidadMedida = (nuevaUnidadMedida) => {
  return axios.post(`${API_BASE_URL}/UnidadMedida`, nuevaUnidadMedida);
};

export const actualizarUnidadMedida = (id, UnidadMedidaActualizada) => {
  return axios.put(`${API_BASE_URL}/UnidadMedida/${id}`, UnidadMedidaActualizada);
};

export const eliminarUnidadMedida = (id, state) => {
  return axios.put(`${API_BASE_URL}/UnidadMedida/${id}`, state);
};

/*--------------------------- Usuarios -------------------------*/

export const obtenerUsuarios = () => {
  return axios.get(`${API_BASE_URL}/Usuarios`);
};

export const crearUsuarios = (nuevoUsuario) => {
  return axios.post(`${API_BASE_URL}/Usuarios`, nuevoUsuario);
};

export const actualizarUsuarios = (id, UsuariosActualizado) => {
  return axios.put(`${API_BASE_URL}/Usuarios/${id}`, UsuariosActualizado);
};

export const eliminarUsuarios = (id, state) => {
  return axios.put(`${API_BASE_URL}/Usuarios/${id}`, state);
};