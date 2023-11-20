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

import { crearProductos, obtenerProductos } from "../../apiService/apiService";

export const Products = () => {

    const [producto, setProducto] = useState([]);
    const [imagen, setImagen] = useState(0);
    const [nombre, setNombre] = useState("");
    const [idProducto, setIdProducto] = useState(0);
    const [idLoteProducto, setIdLoteProducto] = useState(0);
    const [idCategoriaProducto, setIdCategoriaProducto] = useState(0);
    const [modal, setModal] = useState(false);

    useEffect(() => {
      obtenerProductos()
          .then((response) => {
            setProducto(response.data);
          })
          .catch((error) => {
            console.error("Error fetching products:", error);
          });
      }, []);
    
      const toggleModal = () => {
        setModal(!modal);
        // Calcular automáticamente el próximo ID cuando se abre el modal para agregar categoría
        const proximoId =
          producto.length > 0
            ? producto[producto.length - 1].idProducto + 1
            : 1;
        setIdProducto(proximoId);
        setImagen("");
        setNombre("");
        setIdLoteProducto(0);
        setIdCategoriaProducto(0);
      };

      const handleCrearProducto = () => {
        const nuevoInventario = {
          idProducto : idProducto,
          imagen: imagen,
          nombre: nombre,
          idLoteProducto: idLoteProducto,
          idCategoriaProducto: idCategoriaProducto,
        };
    
        // Lógica para agregar una nueva categoría
        crearProductos(nuevoInventario)
          .then((response) => {
            console.log(response.data);
            // Actualizar la lista de categorías después de agregar una nueva categoría
            obtenerProductos()
              .then((response) => {
                setProducto(response.data);
              })
              .catch((error) => {
                console.error("Error fetching products:", error);
              });
          })
          .catch((error) => {
            console.error("Error creating products:", error);
          });
    
        // Cierra el modal después de agregar la categoría
        toggleModal();
      };

  return (
    <Container>
        <h4 className='mt-3 ms-1'>Productos</h4>
        <div className='d-flex justify-content-end'>
            <Button className='bg-verde-bosque px-5 float-right me-2 mb-5' onClick={toggleModal}>Crear Producto</Button>
        </div>
        <Form>
            <Row>
                <Col className='mx-2'>
                    <FormGroup>
                        <Input type='text' name='nombre' placeholder='Buscar por Nombre'></Input>
                    </FormGroup>
                </Col>
                <Col className='me-2'>
                    <FormGroup>
                        <Input type='text' name='nombre' placeholder='Buscar por Lote'></Input>
                    </FormGroup>
                </Col>
                <Col className='me-2'>
                    <FormGroup>
                        <Input type='text' name='nombre' placeholder='Buscar por Categoria'></Input>
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
                        Lote
                    </th>
                    <th>
                        Categoria
                    </th>
                    
                    <th>
                        
                    </th>
                </tr>
            </thead>
            <tbody>
                {producto.map((Producto) => 
                <tr>
                    <th scope="row" className='ps-4'>
                        {Producto.idProducto}
                    </th>
                    <td>
                        {Producto.imagen}
                    </td>
                    <td>
                        {Producto.nombre}

                    </td>
                    <td>
                        {Producto.nombreLote}
                    </td>            
                    <td>
                        {Producto.nombreCategoria}
                    </td>
                    <td>
                        <img src={editIcon} alt={Producto.idProducto} className='table-icon me-2 ms-1'/>
                        <img src={deleteIcon} alt={Producto.idProducto} className='table-icon me-2 ms-1'/>
                    </td>
                </tr>
                )}
        </tbody>
        </Table>

         {/* Modal para agregar Producto */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Agregar Inventario</ModalHeader>
        <ModalBody>
          {/* Formulario para agregar Producto */}
          <FormGroup>
            <label htmlFor="idProducto">ID:</label>
            <Input
              type="text"
              name="idProducto"
              value={idProducto}
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="imagen">imagen de producto:</label>
            <Input
              type="text"
              name="imagen"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
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
          <FormGroup>
            <label htmlFor="loteProducto">Lote del producto:</label>
            <Input
              type="text"
              name="loteProducto"
              value={idLoteProducto}
              onChange={(e) => setIdLoteProducto(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="categoriaProducto">Categoria del producto:</label>
            <Input
              type="text"
              name="categoriaProducto"
              value={idCategoriaProducto}
              onChange={(e) => setIdCategoriaProducto(e.target.value)}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleCrearProducto}>
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
