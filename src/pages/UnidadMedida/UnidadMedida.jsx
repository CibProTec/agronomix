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
  obtenerUnidadMedida,
  crearUnidadMedida,
} from "../../apiService/apiService";

export const UnidadMedida = () => {
  const [unidadMedida, setUnidadMedida] = useState([]);
  const [nombre, setNombre] = useState('');
  const [idUnidadMedida, setIdUnidadMedida] = useState(0);
  const [modal, setModal] = useState('');

  // Filtro
  const [filtroNombre, setFiltroNombre] = useState('');

  useEffect(() => {
    obtenerUnidadMedida()
      .then((response) => {
        setUnidadMedida(response.data);
      })
      .catch((error) => {
        console.error('Error fetching UnidadMedidas:', error);
      });
  }, []);

  const toggleModal = () => {
    // Calcular automáticamente el próximo ID solo si no hay unidades de medida existentes
    const proximoId =
      unidadMedida.length > 0 ? unidadMedida[unidadMedida.length - 1].idUnidadMedida + 1 : 1;

    setModal(!modal);
    setIdUnidadMedida(proximoId);
    setNombre('');
  };

  const handleCrearUnidadMedida = () => {
    const nuevaUnidadMedida = {
      idUnidadMedida: idUnidadMedida,
      nombre: nombre,
    };

    // Lógica para agregar una nueva unidad de medida
    crearUnidadMedida(nuevaUnidadMedida)
      .then((response) => {
        console.log(response.data);
        // Actualizar la lista de unidades de medida después de agregar una nueva
        obtenerUnidadMedida()
          .then((response) => {
            setUnidadMedida(response.data);
          })
          .catch((error) => {
            console.error('Error fetching units of measure:', error);
          });
      })
      .catch((error) => {
        console.error('Error creating unit of measure:', error);
      });

    // Cierra el modal después de agregar la unidad de medida
    toggleModal();
    // Restablece el filtro después de agregar una nueva unidad de medida
    setFiltroNombre('');
  };

  const filtrarUnidades = () => {
    if (filtroNombre.trim() === '') {
      // Si el campo de búsqueda está vacío, cargar todos los elementos
      obtenerUnidadMedida()
        .then((response) => {
          setUnidadMedida(response.data);
        })
        .catch((error) => {
          console.error('Error fetching units of measure:', error);
        });
    } else {
      // Filtrar solo si el campo de búsqueda no está vacío
      const unidadesFiltradas = unidadMedida.filter((unidad) =>
        unidad.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
      );

      setUnidadMedida(unidadesFiltradas);
    }
  };

  return (
    <Container>
      <h4 className="mt-3 ms-1">Unidades de medida</h4>
      <div className="d-flex justify-content-end">
        <Button
          className="bg-verde-bosque px-5 float-right me-2 mb-5"
          onClick={toggleModal}
        >
          Crear Unidad de Medida
        </Button>
      </div>
      <Form>
        <Row className="d-flex justify-content-between">
          <Col lg="5">
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
          <Col lg="5">
            <Button
              type="button"
              className="bg-verde-bosque w-100 border-0"
              onClick={filtrarUnidades}
            >
              Filtrar
            </Button>
          </Col>
        </Row>
      </Form>
      <Table className="table-striped table-responsive">
        <thead>
          <tr>
            <th className="ps-4">ID</th>
            <th>Nombre</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {unidadMedida.map((unidad) => (
            <tr key={unidad.idUnidadMedida}>
              <th scope="row" className="ps-4">
                {unidad.idUnidadMedida}
              </th>
              <td>{unidad.nombre}</td>
              <td>
                <img
                  src={editIcon}
                  alt={unidad.idUnidadMedida}
                  className="table-icon me-2 ms-1"
                />
                <img
                  src={deleteIcon}
                  alt={unidad.idUnidadMedida}
                  className="table-icon me-2 ms-1"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para agregar Producto */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Agregar Lote</ModalHeader>
        <ModalBody>
          {/* Formulario para agregar Producto */}
          <FormGroup>
            <label htmlFor="idUnidadMedida">ID:</label>
            <Input
              type="text"
              name="idUnidadMedida"
              value={idUnidadMedida}
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="Nombre">Nombre:</label>
            <Input
              type="text"
              name="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleCrearUnidadMedida}>
            Agregar Unidad de Medida
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};
