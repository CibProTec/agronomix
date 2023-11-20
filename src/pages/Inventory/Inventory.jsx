import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Form,
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
  obtenerInventario,
  crearInventario,
} from "../../apiService/apiService";

export const Inventory = () => {
  const [inventario, setInventario] = useState([]);
  const [idInventario, setIdInventario] = useState([]);
  const [cantidadinventario, setCantidadinventario] = useState(0);
  const [idUsuario, setIdUsuario] = useState(0);
  const [idProducto, setIdProducto] = useState(0);
  const [fechaRegistro, setFechaRegistro] = useState("");
  const [fechaExpiracion, setFechaExpiracion] = useState("");
  const [idUnidadMedida, setIdUnidadMedida] = useState(0);
  const [modal, setModal] = useState("");

  // Filtros
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroUsuario, setFiltroUsuario] = useState("");
  const [filtroLote, setFiltroLote] = useState("");

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
    // Calcular automáticamente el próximo ID cuando se abre el modal para agregar categoría
    const proximoId =
      inventario.length > 0
        ? inventario[inventario.length - 1].idInventario + 1
        : 1;
    setIdInventario(proximoId);
    setCantidadinventario("");
    setIdUsuario("");
    setFechaRegistro("");
    setFechaExpiracion("");
    setIdUnidadMedida("");
  };

  const handleCrearInventario = () => {
    const nuevoInventario = {
      idInventario: idInventario,
      idProducto: idProducto,
      cantidad: cantidadinventario,
      idUsuario: idUsuario,
      fecha_registro: fechaRegistro,
      fecha_expiracion: fechaExpiracion,
      idUnidadMedida: idUnidadMedida,
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
    // Restablece los filtros después de agregar un elemento al inventario
    setFiltroNombre("");
    setFiltroCategoria("");
    setFiltroUsuario("");
    setFiltroLote("");
  };

  const filtrarInventario = () => {
    // Aplicar filtros solo si al menos uno de ellos está activo
    if (filtroNombre || filtroCategoria || filtroUsuario || filtroLote) {
      const inventarioFiltrado = inventario.filter((item) => {
        const cumpleFiltros =
          (!filtroNombre ||
            item.nombreProducto
              .toLowerCase()
              .includes(filtroNombre.toLowerCase())) &&
          (!filtroCategoria ||
            item.nombreCategoria
              .toLowerCase()
              .includes(filtroCategoria.toLowerCase())) &&
          (!filtroUsuario ||
            item.nombreUsuario
              .toLowerCase()
              .includes(filtroUsuario.toLowerCase())) &&
          (!filtroLote ||
            item.nombreLote.toLowerCase().includes(filtroLote.toLowerCase()));
        return cumpleFiltros;
      });

      setInventario(inventarioFiltrado);
    } else {
      // Si todos los campos de filtro están vacíos, cargar todos los elementos del inventario
      obtenerInventario()
        .then((response) => {
          setInventario(response.data);
        })
        .catch((error) => {
          console.error("Error fetching inventory:", error);
        });
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
      <Form>
        <Row>
          <Col className="mx-2">
            <FormGroup>
              <Input
                type="text"
                name="filtroNombre"
                placeholder="Buscar por nombre"
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col className="me-2">
            <FormGroup>
              <Input
                type="text"
                name="filtroCategoria"
                placeholder="Buscar por categoría"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col className="me-2">
            <FormGroup>
              <Input
                type="text"
                name="filtroUsuario"
                placeholder="Buscar por usuario"
                value={filtroUsuario}
                onChange={(e) => setFiltroUsuario(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col className="me-2">
            <FormGroup>
              <Input
                type="text"
                name="filtroLote"
                placeholder="Buscar por lote"
                value={filtroLote}
                onChange={(e) => setFiltroLote(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col className="me-2">
            <FormGroup>
              <Button
                type="button"
                className="bg-verde-bosque w-100 border-0"
                onClick={filtrarInventario}
              >
                Filtrar
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
      <Table className="table-striped table-responsive">
        <thead>
          <tr>
            <th className="ps-4">ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Cantidad</th>
            <th>Lote</th>
            <th>F. Registro</th>
            <th>F. Expiración</th>
            <th>Responsable</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {inventario.map((item) => (
            <tr key={item.idInventario}>
              <th scope="row" className="ps-4">
                {item.idInventario}
              </th>
              <td>{item.imagen}</td>
              <td>{item.nombreProducto}</td>
              <td>{item.nombreCategoria}</td>
              <td>{item.cantidad}</td>
              <td>{item.nombreLote}</td>
              <td>{item.fecha_registro}</td>
              <td>{item.fecha_expiracion}</td>
              <td>{item.nombreUsuario}</td>
              <td>
                <img
                  src={editIcon}
                  alt={item.idInventario}
                  className="table-icon me-2 ms-1"
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
            <label htmlFor="cantidad">Cantidad de producto:</label>
            <Input
              type="text"
              name="cantidad"
              value={cantidadinventario}
              onChange={(e) => setCantidadinventario(e.target.value)}
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
    </Container>
  );
};
