import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { eliminarCategoria,
         eliminarProductos,
         eliminarInventario,
         eliminarUsuarios,
         eliminarLotes,
         eliminarUnidadMedida,
          } from '../apiService/apiService';

const DeleteCategoryModal = ({ isOpen, toggleModalDel, id, objeto, table, actualizarLista}) => {

  
  // Lógica para eliminar la categoría
  const handleEliminar = (id) => {
  switch(table){
    case "productos":
      console.log("eliminando producto nro: "+ id)
      var estadoI = { state: 'I'}
      eliminarProductos(id, estadoI)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });

      toggleModalDel();
      break
    case "inventario":
      console.log("eliminando producto del inventario nro: "+ id)
      var estadoI = { state: 'I'}
      eliminarInventario(id, estadoI)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });

      toggleModalDel();
      break
    case "usuarios":
      console.log("eliminando categoria nro: "+ id)
      var estadoI = { state: 'I'}
      eliminarUsuarios(id, estadoI)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
      actualizarLista();
      toggleModalDel();
      break
    case "lotes":
      console.log("eliminando lote nro: "+ id)
      var estadoI = { state: 'I'}
      eliminarLotes(id, estadoI)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });

      toggleModalDel();
      break
    case "medidas":
      console.log("eliminando medida nro: "+ id)
      var estadoI = { state: 'I'}
      eliminarUnidadMedida(id, estadoI)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });

      toggleModalDel();
      break
    case "categorias":
      console.log("eliminando categoria nro: "+ id)
          var estadoI = { state: 'I'}
          eliminarCategoria(id, estadoI)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error deleting category:", error);
          });
    
        toggleModalDel();
        break
        default:
          console.log("no estas apuntando a ninguna tabla")
        break
        }
      };
        

  return (
    <Modal isOpen={isOpen} toggle={toggleModalDel}>
    <ModalHeader toggle={toggleModalDel}>Eliminar de la tabla {table} </ModalHeader>
    <ModalBody>
      <p>¿Estás seguro de eliminar {objeto} de id: {id}?</p>
    </ModalBody>
    <ModalFooter>
      <Button color='danger' onClick={() => handleEliminar(id)}>
        Eliminar
      </Button>
      <Button color='secondary' onClick={toggleModalDel}>
        Cancelar
      </Button>
    </ModalFooter>
  </Modal>
  );
};

export default DeleteCategoryModal;