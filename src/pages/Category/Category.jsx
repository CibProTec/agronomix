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

import { obtenerCategorias, crearCategoria } from "../../apiService/apiService";

export const Category = () => {

    const [categoria, setCategoria] = useState([]);
    const [nombreCategoria, setNombreCategoria] = useState("");
    const [idCategoria, setIdCategoria] = useState("");
    const [modal, setModal] = useState(false);

    useEffect(() => {
        obtenerCategorias()
          .then((response) => {
            setCategoria(response.data);
          })
          .catch((error) => {
            console.error("Error fetching categories:", error);
          });
      }, []);

      const toggleModal = () => {
        setModal(!modal);
        // Calcular automáticamente el próximo ID cuando se abre el modal para agregar categoría
        const proximoId =
          categoria.length > 0
            ? categoria[categoria.length - 1].idCategoriaProducto + 1
            : 1;
        setIdCategoria(proximoId);
        setNombreCategoria("");
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
            obtenerCategorias()
              .then((response) => {
                setCategoria(response.data);
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
        <h4 className='mt-3 ms-1'>Categorias</h4>
        <div className='d-flex justify-content-end'>
            <Button className='bg-verde-bosque px-5 float-right me-2 mb-5' onClick={handleCrearCategoria}>Crear Categoria</Button>
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
                        Nombre
                    </th>
                    <th>
                        
                    </th>
                </tr>
            </thead>
            <tbody>
                {categoria.map((Categoria) => 
                <tr>
                    <th scope="row" className='ps-4'>
                        {Categoria.idCategoriaProducto}
                    </th>
                    <td>
                        {Categoria.nombre}

                    </td>
                    <td>
                        <img src={editIcon} alt={Categoria.idCategoriaProducto} className='table-icon me-2 ms-1'/>
                        <img src={deleteIcon} alt={Categoria.idCategoriaProducto} className='table-icon me-2 ms-1'/>
                    </td>
                </tr>
                )}
        </tbody>
        </Table>

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

    </Container>

  )
}
