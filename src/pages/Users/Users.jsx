import React, { useEffect, useState } from 'react';
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
  ModalFooter
} from 'reactstrap';
import deleteIcon from '../../assets/icons/delete-icon.png';
import editIcon from '../../assets/icons/edit-icon.png';
import { obtenerUsuarios, crearUsuarios } from '../../apiService/apiService';

export const Users = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [idUsuario, setIdUsuario] = useState(0);
  const [imagen, setImagen] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    obtenerUsuarios()
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const toggleModal = () => {
    setModal(!modal);
    // Calcular automáticamente el próximo ID cuando se abre el modal para agregar usuario
    const proximoId =
      usuarios.length > 0 ? usuarios[usuarios.length - 1].idUsuario + 1 : 1;
    setIdUsuario(proximoId);
    setImagen('');
    setNombre('');
    setEmail('');
    setContrasenia('');
  };

  const handleCrearUsuario = () => {
    const nuevoUsuario = {
      idUsuario: idUsuario,
      imagen: imagen,
      nombre: nombre,
      email: email,
      contrasenia: contrasenia
    };

    // Lógica para agregar un nuevo usuario
    crearUsuarios(nuevoUsuario)
      .then((response) => {
        console.log(response.data);
        // Actualizar la lista de usuarios después de agregar un nuevo usuario
        obtenerUsuarios()
          .then((response) => {
            setUsuarios(response.data);
          })
          .catch((error) => {
            console.error('Error fetching users:', error);
          });
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });

    // Cierra el modal después de agregar el usuario
    toggleModal();
  };

  const handleFiltrar = (e) => {
    e.preventDefault();
    // Lógica para filtrar usuarios por nombre y/o email
    const usuariosFiltrados = usuarios.filter(
      (usuario) =>
        usuario.nombre.toLowerCase().includes(nombre.toLowerCase()) &&
        usuario.email.toLowerCase().includes(email.toLowerCase())
    );
    setUsuarios(usuariosFiltrados);
  };

  return (
    <Container>
      <h4 className="mt-3 ms-1">Usuarios</h4>
      <div className="d-flex justify-content-end">
        <Button
          className="bg-verde-bosque px-5 float-right me-2 mb-5"
          onClick={toggleModal}
        >
          Crear Usuario
        </Button>
      </div>
      <Form onSubmit={handleFiltrar}>
        <Row>
          <Col className="mx-2">
            <FormGroup>
              <Input
                type="text"
                name="nombre"
                placeholder="Buscar por nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col className="me-2">
            <FormGroup>
              <Input
                type="text"
                name="email"
                placeholder="Buscar por email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col className="me-2">
            <FormGroup>
              <Button
                type="submit"
                className="bg-verde-bosque w-100 border-0"
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
            <th>Email</th>
            <th>Contraseña</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.idUsuario}>
              <th scope="row" className="ps-4">
                {usuario.idUsuario}
              </th>
              <td>{usuario.imagen}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.contrasenia}</td>
              <td>
                <img
                  src={editIcon}
                  alt={usuario.idUsuario}
                  className="table-icon me-2 ms-1"
                />
                <img
                  src={deleteIcon}
                  alt={usuario.idUsuario}
                  className="table-icon me-2 ms-1"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para agregar Usuario */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Agregar Usuario</ModalHeader>
        <ModalBody>
          {/* Formulario para agregar Usuario */}
          <FormGroup>
            <label htmlFor="idUsuario">ID:</label>
            <Input
              type="text"
              name="idUsuario"
              value={idUsuario}
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="imagen">Imagen del usuario:</label>
            <Input
              type="text"
              name="imagen"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="nombre">Nombre:</label>
            <Input
              type="text"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="email">Email:</label>
            <Input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="contrasenia">Contraseña:</label>
            <Input
              type="text"
              name="contrasenia"
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleCrearUsuario}>
            Agregar Usuario
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
            </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};