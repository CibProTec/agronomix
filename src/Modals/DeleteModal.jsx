import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { eliminarCategoria } from '../apiService/apiService';

const DeleteCategoryModal = ({ isOpen, toggleModalDel, id, table}) => {
  
  // Lógica para eliminar la categoría
  const handleEliminar = (id) => {
  switch(table){
    case "productos":
      console.log("eliminando producto nro: "+ id)
      break
    case "inventorio":
      console.log("eliminando producto del inventario nro: "+ id)
      break
    case "usuarios":
      console.log("eliminando categoria nro: "+ id)
      break
    case "lotes":
      console.log("eliminando lote nro: "+ id)
      break
    case "medidas":
      console.log("eliminando medida nro: "+ id)
      break
    case "categorias":
      console.log("eliminando categoria nro: "+ id)
          eliminarCategoria(id, "I")
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error deleting category:", error);
          });
    
        toggleModalDel();
        break
        default:
        }
          console.log("no estas apuntando a ninguna tabla")
      };
        

  return (
    <Modal isOpen={isOpen} toggle={toggleModalDel}>
    <ModalHeader toggle={toggleModalDel}>Eliminar de la tabla {table} </ModalHeader>
    <ModalBody>
      <p>¿Estás seguro?</p>
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