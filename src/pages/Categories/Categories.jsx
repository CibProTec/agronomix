import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  FormGroup,
  Input,
  Modal,
  Col,
  Row,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import deleteIcon from "../../assets/icons/delete-icon.png";
import editIcon from "../../assets/icons/edit-icon.png";
import {
  obtenerCategorias,
  crearCategoria,
  actualizarCategoria,
} from "../../apiService/apiService"; // Ajusta la ruta según la ubicación real de tu apiService
import DeleteCategoryModal from "../../Modals/DeleteModal";
import { Form } from "react-router-dom";

export const Categories = () => {
  const [categorias, setCategorias] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [modalEliminar, setModalEliminar] = useState(false);

  useEffect(() => {
    obtenerCategorias()
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const actualizarLista =()=>{
    obtenerCategorias()
    .then((response) => {
      setCategorias(response.data);
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
    });
  }


  const toggleModal = () => {
    setModal(!modal);
    // Calcular automáticamente el próximo ID cuando se abre el modal para agregar categoría
    const proximoId =
      categorias.length > 0
        ? categorias[categorias.length - 1].idCategoriaProducto + 1
        : 1;
    setIdCategoria(proximoId);
  };

  const toggleModalEditar = (categoria, nombre) => {
    setCategoriaSeleccionada(categoria);
    setNombreCategoria(nombre);
    setModalEditar(!modalEditar);
  };

  const toggleModalEliminar = (categoria, nombre) => {
    setCategoriaSeleccionada(categoria);
    setNombreCategoria(nombre);
    console.log(categoria);
    console.log(nombre);
    setModalEliminar(!modalEliminar);
  };

  const handleCrearCategoria = () => {
    const nuevaCategoria = {
      idCategoriaProducto: idCategoria,
      nombre: nombreCategoria,
    };

    // Lógica para agregar una nueva categoría
    crearCategoria(nuevaCategoria)
      .then((response) => {
        console.log(response.data);
        // Actualizar la lista de categorías después de agregar una nueva categoría
        actualizarLista();
      })
      .catch((error) => {
        console.error("Error creating category:", error);
      });

    // Cierra el modal después de agregar la categoría
    toggleModal();
  };

  const handleEditarCategoria = () => {

    // Lógica para actualizar la categoría seleccionada
    if (categoriaSeleccionada) {
      const categoriaActualizada = { nombre: nombreCategoria};
      const idCategoria = categoriaSeleccionada;

      actualizarCategoria(idCategoria, categoriaActualizada)
        .then((response) => {
          console.log(response.data);
          // Actualizar la lista de categorías después de actualizar la categoría
          actualizarLista();
        })
        .catch((error) => {
          console.error("Error updating category:", error);
        });

      // Cierra el modal después de la edición
      toggleModalEditar(null);
    }
  };


  return (
    <Container>
      <h4 className="mt-3 ms-1">Categorías</h4>
      <div className="d-flex justify-content-end">
        {/* Botón para abrir el modal de creación de categoría */}
        <Button
          onClick={toggleModal}
          className="bg-verde-bosque px-5 float-right me-2 mb-5"
        >
          Crear Categoría
        </Button>
      </div>

      <Table className="table-striped table-responsive">
        <thead>
          <tr>
            <th className="ps-4">ID</th>
            <th>Nombre</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => 
            {if(categoria.state === 'A')
            return(
            <tr key={categoria.idCategoriaProducto}>
              <th scope="row" className="ps-4">
                {categoria.idCategoriaProducto}
              </th>
              <th scope="row" className="ps-4">
                {categoria.nombre}
              </th>
              <td>
                <img
                  src={editIcon}
                  alt={categoria.idCategoriaProducto}
                  className="table-icon me-2 ms-1"
                  onClick={() => toggleModalEditar(categoria.idCategoriaProducto, categoria.nombre)}
                />
                <img
                  src={deleteIcon}
                  alt={categoria.idCategoriaProducto}
                  className="table-icon me-2 ms-1"
                  onClick={() =>
                    toggleModalEliminar(categoria.idCategoriaProducto, categoria.nombre)
                  }
                />
              </td>
            </tr>
          )})}
        </tbody>
      </Table>

      {/* Modal para editar categoría */}
      <Modal isOpen={modalEditar} toggle={toggleModalEditar}>
        <ModalHeader toggle={toggleModalEditar}>Editar Categoría</ModalHeader>
        <ModalBody>
          {/* Formulario para editar el nombre de la categoría */}
          <FormGroup>
            <label htmlFor="nombre">Nombre:</label>
            <Input
              type="text"
              name="nombre"
              id="nombre"
              value={nombreCategoria}
              onChange={(e) => setNombreCategoria(e.target.value)}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleEditarCategoria}>
            Guardar Cambios
          </Button>
          <Button color="secondary" onClick={toggleModalEditar}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal para agregar categoría */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Agregar Categoría</ModalHeader>
        <ModalBody>
          {/* Formulario para agregar categoría */}
          <FormGroup>
            <label htmlFor="idCategoria">ID:</label>
            <Input
              type="text"
              name="idCategoria"
              value={idCategoria}
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="nombreCategoria">Nombre:</label>
            <Input
              type="text"
              name="nombreCategoria"
              value={nombreCategoria}
              onChange={(e) => setNombreCategoria(e.target.value)}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleCrearCategoria}>
            Agregar Categoría
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal para eliminar categoría */}
      <DeleteCategoryModal
        isOpen={modalEliminar}
        toggleModalDel={toggleModalEliminar}
        id={categoriaSeleccionada}
        table={"categorias"}
        objeto={nombreCategoria}
        actualizarLista={actualizarLista()}
      />
    </Container>
  );
};
