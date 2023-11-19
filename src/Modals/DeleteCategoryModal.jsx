import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const DeleteCategoryModal = ({ isOpen, toggleModal, handleEliminarCategoria, categoria }) => {
    const nombreCategoria = categoria ? categoria.nombre : '';
  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
    <ModalHeader toggle={toggleModal}>Eliminar Categoría</ModalHeader>
    <ModalBody>
      <p>¿Estás seguro de que deseas eliminar la categoría {nombreCategoria}?</p>
    </ModalBody>
    <ModalFooter>
      <Button color='danger' onClick={() => handleEliminarCategoria(categoria.idCategoriaProducto)}>
        Eliminar
      </Button>
      <Button color='secondary' onClick={toggleModal}>
        Cancelar
      </Button>
    </ModalFooter>
  </Modal>
  );
};

export default DeleteCategoryModal;