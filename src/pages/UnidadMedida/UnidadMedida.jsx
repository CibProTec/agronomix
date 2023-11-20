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

import { obtenerUnidadMedida, crearUnidadMedida } from "../../apiService/apiService";

export const UnidadMedida = () => {

    const [unidadMedida, setUnidadMedida] = useState([]);
    const [nombre, setNombre] = useState("");
    const [idUnidadMedida, setIdUnidadMedida] = useState(0);
    const [modal, setModal] = useState(false);
  
    useEffect(() => {
      obtenerUnidadMedida()
        .then((response) => {
          setUnidadMedida(response.data);
        })
        .catch((error) => {
          console.error("Error fetching UnidadMedidas:", error);
        });
    }, []);
  
    const toggleModal = () => {
      // Calcular automáticamente el próximo ID solo si no hay lotes existentes
      const proximoId =
        unidadMedida.length > 0
          ? unidadMedida[unidadMedida.length - 1].idUnidadMedida + 1
          : 1;
  
      setModal(!modal);
      setIdUnidadMedida(proximoId);
      setNombre("");
    };
  
    const handleCrearUnidadMedida = () => {
      const nuevoLote = {
        idUnidadMedida: idUnidadMedida,
        nombre: nombre,
      };
  
      // Lógica para agregar un nuevo lote
      crearUnidadMedida(nuevoLote)
        .then((response) => {
          console.log(response.data);
          // Actualizar la lista de lotes después de agregar uno nuevo
          obtenerUnidadMedida()
            .then((response) => {
              setUnidadMedida(response.data);
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

    useEffect(() => {
        obtenerUnidadMedida()
          .then((response) => {
            setUnidadMedida(response.data);
          })
          .catch((error) => {
            console.error("Error fetching categories:", error);
          });
      }, []);
    

  return (
    <Container>
        <h4 className='mt-3 ms-1'>Unidades de medida</h4>
        <div className='d-flex justify-content-end'>
            <Button className='bg-verde-bosque px-5 float-right me-2 mb-5' onClick={toggleModal}>Crear Unidad de Medida</Button>
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
                {unidadMedida.map((UnidadMedida) => 
                <tr>
                    <th scope="row" className='ps-4'>
                        {UnidadMedida.idUnidadMedida}
                    </th>
                    <td>
                        {UnidadMedida.nombre}
                    </td>
                    <td>
                        <img src={editIcon} alt={UnidadMedida.idUnidadMedida} className='table-icon me-2 ms-1'/>
                        <img src={deleteIcon} alt={UnidadMedida.idUnidadMedida} className='table-icon me-2 ms-1'/>
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

  )
}
