import React, { useEffect, useState } from 'react'
import { Container, Table, Button, Form, FormGroup, Input, Row, Col } from 'reactstrap';
import deleteIcon from "../../assets/icons/delete-icon.png"
import editIcon from "../../assets/icons/edit-icon.png"

import { obtenerUsuarios } from "../../apiService/apiService";

export const Users = () => {

    const [usuario, setUsuario] = useState([]);

    useEffect(() => {
      obtenerUsuarios()
          .then((response) => {
            setUsuario(response.data);
          })
          .catch((error) => {
            console.error("Error fetching categories:", error);
          });
      }, []);
    

  return (
    <Container>
        <h4 className='mt-3 ms-1'>Usuarios</h4>
        <div className='d-flex justify-content-end'>
            <Button className='bg-verde-bosque px-5 float-right me-2 mb-5'>Crear Producto</Button>
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
                        <Input type='text' name='nombre' placeholder='Buscar por email'></Input>
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
                        email
                    </th>
                    <th>
                        contraseña
                    </th>
                    
                    <th>
                        
                    </th>
                </tr>
            </thead>
            <tbody>
                {usuario.map((usuario) => 
                <tr>
                    <th scope="row" className='ps-4'>
                        {usuario.idUsuario}
                    </th>
                    <td>
                        {usuario.imagen}
                    </td>
                    <td>
                        {usuario.nombre}

                    </td>
                    <td>
                        {usuario.email}
                    </td>            
                    <td>
                        {usuario.contrasenia}
                    </td>
                    <td>
                        <img src={editIcon} alt={usuario.idUsuario} className='table-icon me-2 ms-1'/>
                        <img src={deleteIcon} alt={usuario.idUsuario} className='table-icon me-2 ms-1'/>
                    </td>
                </tr>
                )}
        </tbody>
        </Table>
    </Container>

  )
}
