import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import deleteIcon from "../../assets/icons/delete-icon.png";
import editIcon from "../../assets/icons/edit-icon.png";

import {
  obtenerInventario,
  crearInventario,
  actualizarInventario,
} from "../../apiService/apiService";

export const Inventory = () => {
  const [inventario, setInventario] = useState([]);
  const [idInventario, setIdInventario] = useState("");
  const [cantidadInventario, setCantidadInventario] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const [idProducto, setIdProducto] = useState("");
  const [fechaRegistro, setFechaRegistro] = useState("");
  const [fechaExpiracion, setFechaExpiracion] = useState("");
  const [idUnidadMedida, setIdUnidadMedida] = useState("");
  const [modal, setModal] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [inventarioSeleccionado, setInventarioSeleccionado] = useState(null);

  useEffect(() => {
    obtenerInventario()
      .then((response) => {
        setInventario(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
      });
  }, []);

  const toggleModal = () => {
    setModal(!modal);
    // Calcular automáticamente el próximo ID cuando se abre el modal para agregar inventario
    const proximoId =
      inventario.length > 0
        ? inventario[inventario.length - 1].idInventario + 1
        : 1;
    setIdInventario(proximoId);
    // Restablecer los campos al abrir el modal
    setCantidadInventario("");
    setIdUsuario("");
    setIdProducto("");
    setFechaRegistro("");
    setFechaExpiracion("");
    setIdUnidadMedida("");
  };

  const toggleModalEditar = (item) => {
    setInventarioSeleccionado(item);
    setCantidadInventario(item.cantidad);
    setIdUsuario(item.idUsuario);
    setIdProducto(item.idProducto);
    setFechaRegistro(item.fecha_registro);
    setFechaExpiracion(item.fecha_expiracion);
    setIdUnidadMedida(item.idUnidadMedida);
    setModalEditar(!modalEditar);
  };

  const handleCrearInventario = () => {
    const nuevoInventario = {
      idInventario,
      idProducto,
      cantidad: cantidadInventario,
      idUsuario,
      fecha_registro: fechaRegistro,
      fecha_expiracion: fechaExpiracion,
      idUnidadMedida,
    };

    // Lógica para agregar un nuevo elemento al inventario
    crearInventario(nuevoInventario)
      .then((response) => {
        console.log(response.data);
        // Actualizar la lista de inventario después de agregar uno nuevo
        obtenerInventario()
          .then((response) => {
            setInventario(response.data);
          })
          .catch((error) => {
            console.error("Error fetching inventory:", error);
          });
      })
      .catch((error) => {
        console.error("Error creating inventory item:", error);
      });

    // Cierra el modal después de agregar un elemento al inventario
    toggleModal();
  };

  const handleEditarInventario = () => {
    // Lógica para actualizar el inventario seleccionado
    if (inventarioSeleccionado) {
      const inventarioActualizado = {
        idProducto,
        cantidad: cantidadInventario,
        idUsuario,
        fecha_registro: fechaRegistro,
        fecha_expiracion: fechaExpiracion,
        idUnidadMedida,
      };
      const idInventario = inventarioSeleccionado.idInventario;

      actualizarInventario(idInventario, inventarioActualizado)
        .then((response) => {
          console.log(response.data);
          // Actualizar la lista de inventario después de la edición
          obtenerInventario()
            .then((response) => {
              setInventario(response.data);
            })
            .catch((error) => {
              console.error("Error fetching inventory:", error);
            });
        })
        .catch((error) => {
          console.error("Error updating inventory item:", error);
        });

      // Cierra el modal después de la edición
      toggleModalEditar(null);
    }
  };

  return (
    <Container>
      <h4 className="mt-3 ms-1">Inventario</h4>
      <div className="d-flex justify-content-end">
        <Button
          className="bg-verde-bosque px-5 float-right me-2 mb-5"
          onClick={toggleModal}
        >
          Crear Inventario
        </Button>
      </div>
      <Table className="table-striped table-responsive">
        <thead>
          <tr>
            <th className="ps-4">ID</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Usuario</th>
            <th>F. Registro</th>
            <th>F. Expiración</th>
            <th>Unidad de Medida</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {inventario.map((item) => (
            <tr key={item.idInventario}>
              <th scope="row" className="ps-4">
                {item.idInventario}
              </th>
              <td>{item.nombreProducto}</td>
              <td>{item.cantidad}</td>
              <td>{item.nombreUsuario}</td>
              <td>{item.fecha_registro}</td>
              <td>{item.fecha_expiracion}</td>
              <td>{item.nombreUnidadMedida}</td>
              <td>
                <img
                  src={editIcon}
                  alt={item.idInventario}
                  className="table-icon me-2 ms-1"
                  onClick={() => toggleModalEditar(item)}
                />
                <img
                  src={deleteIcon}
                  alt={item.idInventario}
                  className="table-icon me-2 ms-1"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para agregar Inventario */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Agregar Inventario</ModalHeader>
        <ModalBody>
          {/* Formulario para agregar Inventario */}
          <FormGroup>
            <label htmlFor="idInventario">ID:</label>
            <Input
              type="text"
              name="idInventario"
              value={idInventario}
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="idProducto">Producto:</label>
            <Input
              type="text"
              name="idProducto"
              value={idProducto}
              onChange={(e) => setIdProducto(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="cantidadInventario">Cantidad de producto:</label>
            <Input
              type="text"
              name="cantidadInventario"
              value={cantidadInventario}
              onChange={(e) => setCantidadInventario(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="idUsuario">Usuario:</label>
            <Input
              type="text"
              name="idUsuario"
              value={idUsuario}
              onChange={(e) => setIdUsuario(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="fechaRegistro">Fecha de registro:</label>
            <Input
              type="text"
              name="fechaRegistro"
              value={fechaRegistro}
              onChange={(e) => setFechaRegistro(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="fechaExpiracion">Fecha de expiración:</label>
            <Input
              type="text"
              name="fechaExpiracion"
              value={fechaExpiracion}
              onChange={(e) => setFechaExpiracion(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="idUnidadMedida">Unidad de medida:</label>
            <Input
              type="text"
              name="idUnidadMedida"
              value={idUnidadMedida}
              onChange={(e) => setIdUnidadMedida(e.target.value)}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleCrearInventario}>
            Agregar Inventario
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal para editar Inventario */}
      <Modal isOpen={modalEditar} toggle={toggleModalEditar}>
        <ModalHeader toggle={toggleModalEditar}>Editar Inventario</ModalHeader>
        <ModalBody>
          {/* Formulario para editar Inventario */}
          <FormGroup>
            <label htmlFor="idProducto">Producto:</label>
            <Input
              type="text"
              name="idProducto"
              value={
                inventarioSeleccionado
                  ? inventarioSeleccionado.nombreProducto
                  : ""
              }
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="cantidadInventario">Cantidad de producto:</label>
            <Input
              type="text"
              name="cantidadInventario"
              value={cantidadInventario}
              onChange={(e) => setCantidadInventario(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="idUsuario">Usuario:</label>
            <Input
              type="text"
              name="idUsuario"
              value={idUsuario}
              onChange={(e) => setIdUsuario(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="fechaRegistro">Fecha de registro:</label>
            <Input
              type="text"
              name="fechaRegistro"
              value={fechaRegistro}
              onChange={(e) => setFechaRegistro(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="fechaExpiracion">Fecha de expiración:</label>
            <Input
              type="text"
              name="fechaExpiracion"
              value={fechaExpiracion}
              onChange={(e) => setFechaExpiracion(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="idUnidadMedida">Unidad de medida:</label>
            <Input
              type="text"
              name="idUnidadMedida"
              value={idUnidadMedida}
              onChange={(e) => setIdUnidadMedida(e.target.value)}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleEditarInventario}>
            Guardar Cambios
          </Button>
          <Button color="secondary" onClick={toggleModalEditar}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};
