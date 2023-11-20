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

import { obtenerLotes, crearLotes } from "../../apiService/apiService";

export const Lotes = () => {

    const [lote, setLote] = useState([]);
    const [nombre, setNombre] = useState("");
    const [idLoteProducto, setIdLoteProducto] = useState(0);
    const [modal, setModal] = useState(false);
  
    useEffect(() => {
      obtenerLotes()
        .then((response) => {
          setLote(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }, []);
  
    const toggleModal = () => {
      // Calcular automáticamente el próximo ID solo si no hay lotes existentes
      const proximoId =
        lote.length > 0
          ? lote[lote.length - 1].idLoteProducto + 1
          : 1;
  
      setModal(!modal);
      setIdLoteProducto(proximoId);
      setNombre("");
    };
  
    const handleCrearLote = () => {
      const nuevoLote = {
        idLoteProducto: idLoteProducto,
        nombreLote: nombre,
      };
  
      // Lógica para agregar un nuevo lote
      crearLotes(nuevoLote)
        .then((response) => {
          console.log(response.data);
          // Actualizar la lista de lotes después de agregar uno nuevo
          obtenerLotes()
            .then((response) => {
              setLote(response.data);
            })
            .catch((error) => {
              console.error("Error fetching lots:", error);
            });
        })
        .catch((error) => {
          console.error("Error creating lot:", error);
        });
  
      // Cierra el modal después de agregar el lote
      toggleModal();
    };
  

  return (
    <Container>
        <h4 className='mt-3 ms-1'>lotes</h4>
        <div className='d-flex justify-content-end'>
            <Button className='bg-verde-bosque px-5 float-right me-2 mb-5' onClick={toggleModal}>Crear Lote</Button>
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
                {lote.map((lote) => 
                <tr>
                    <th scope="row" className='ps-4'>
                        {lote.idLoteProducto}
                    </th>
                    <td>
                        {lote.nombreLote}
                    </td>
                    <td>
                        <img src={editIcon} alt={lote.idLoteProducto} className='table-icon me-2 ms-1'/>
                        <img src={deleteIcon} alt={lote.idLoteProducto} className='table-icon me-2 ms-1'/>
                    </td>
                </tr>
                )}
        </tbody>
        </Table>

           {/* Modal para agregar Producto */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Agregar Lote</ModalHeader>
        <ModalBody>
          {/* Formulario para agregar Producto */}
          <FormGroup>
            <label htmlFor="idLote">ID:</label>
            <Input
              type="text"
              name="idLote"
              value={idLoteProducto}
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
          <Button color="primary" onClick={handleCrearLote}>
            Agregar Lote
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </Container>

  )
}
