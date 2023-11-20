import React, { useEffect, useState } from 'react'
import { Container,
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
    ModalFooter } from 'reactstrap';
import deleteIcon from "../../assets/icons/delete-icon.png"
import editIcon from "../../assets/icons/edit-icon.png"

import { obtenerInventario, crearInventario } from "../../apiService/apiService";

export const Inventory = () => {

    const [inventario, setInventario] = useState([]);
    const [idInventario, setIdInventario] = useState([]);
    const [cantidadinventario, setCantidadinventario] = useState(0);
    const [idUsuario, setIdUsuario] = useState(0);
    const [idProducto, setIdProducto] = useState(0);
    const [fechaRegistro, setFechaRegistro] = useState("");
    const [fechaExpiracion, setFechaExpiracion] = useState("");
    const [idUnidadMedida, setIdUnidadMedida] = useState(0);
    const [modal, setModal] = useState(false);


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
          idProducto : idProducto,
          cantidad: cantidadinventario,
          idUsuario: idUsuario,
          fecha_registro: fechaRegistro,
          fecha_expiracion: fechaExpiracion,
          idUnidadMedida : idUnidadMedida,
        };
    
        // Lógica para agregar una nueva categoría
        crearInventario(nuevoInventario)
          .then((response) => {
            console.log(response.data);
            // Actualizar la lista de categorías después de agregar una nueva categoría
            obtenerInventario()
              .then((response) => {
                setInventario(response.data);
              })
              .catch((error) => {
                console.error("Error fetching categories:", error);
              });
          })
          .catch((error) => {
            console.error("Error creating category:", error);
          });
    
        // Cierra el modal después de agregar la categoría
        toggleModal();
      };
    

  return (
    <Container>
        <h4 className='mt-3 ms-1'>Inventario</h4>
        <div className='d-flex justify-content-end'>
            <Button className='bg-verde-bosque px-5 float-right me-2 mb-5' onClick={handleCrearInventario}>Crear Inventario</Button>
        </div>
        <Form>
            <Row>
                <Col className='mx-2'>
                    <FormGroup>
                        <Input type='text' name='nombre' placeholder='Buscar por nombre'></Input>
                    </FormGroup>
                </Col>
                <Col className='me-2'>
                    <FormGroup>
                        <Input type='text' name='nombre' placeholder='Buscar por categoría'></Input>
                    </FormGroup>
                </Col>
                <Col className='me-2'>
                    <FormGroup>
                        <Input type='text' name='nombre' placeholder='Buscar por usuario'></Input>
                    </FormGroup>
                </Col>
                <Col className='me-2'>
                    <FormGroup>
                        <Input type='text' name='nombre' placeholder='Buscar por lote'></Input>
                    </FormGroup>
                </Col>
                <Col className='me-2'>
                    <FormGroup>
                        <Button type='submit' className='bg-verde-bosque w-100 border-0'>Filtrar</Button>
                    </FormGroup>
                </Col>
            </Row>
        </Form>
        <Table className='table-striped table-responsive'>
            <thead>
                <tr>
                    <th className='ps-4'>
                        ID
                    </th>
                    <th>
                        imagen
                    </th>
                    <th>
                        Nombre
                    </th>
                    <th>
                        Categoria
                    </th>
                    <th>
                        Cantidad
                    </th>
                    <th>
                        Lote
                    </th>
                    <th>
                        F. Registro
                    </th>
                    <th>
                        F. Expiración
                    </th>
                    <th>
                        Responsable
                    </th>
                    <th>
                        
                    </th>
                </tr>
            </thead>
            <tbody>
                {inventario.map((inventario) => 
                <tr>
                    <th scope="row" className='ps-4'>
                        {inventario.idInventario}
                    </th>
                    <td>
                        {inventario.imagen}
                    </td>
                    <td>
                        {inventario.nombreProducto}
                    </td>
                    <td>
                        {inventario.nombreCategoria}
                    </td>            
                    <td>
                        {inventario.cantidad}
                    </td>
                    <td>
                        {inventario.nombreLote}
                    </td>
                    <td>
                        {inventario.fecha_registro}
                    </td>
                    <td>
                        {inventario.fecha_expiracion}
                    </td>
                    <td>
                        {inventario.nombreUsuario}
                    </td>
                    <td>
                        <img src={editIcon} alt={inventario.idInventario} className='table-icon me-2 ms-1'/>
                        <img src={deleteIcon} alt={inventario.idInventario} className='table-icon me-2 ms-1'/>
                    </td>
                </tr>
                )}
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
            <label htmlFor="Producto">Producto:</label>
            <Input
              type="text"
              name="Producto"
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
            <label htmlFor="usuario">Usuario:</label>
            <Input
              type="text"
              name="usuario"
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
            <label htmlFor="FechaExpiracion">Fecha de expiracion:</label>
            <Input
              type="text"
              name="FechaExpiracion"
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

  )
}
