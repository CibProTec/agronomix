import React from 'react'
import InventoryJson from '../../services/FakeApi/fakeApiProductos.json'
import { Container, Table, Button, Form, FormGroup, Input, Row, Col } from 'reactstrap';
import deleteIcon from "../../assets/icons/delete-icon.png"
import editIcon from "../../assets/icons/edit-icon.png"

export const Inventory = () => {
    const Inventario = InventoryJson.Inventario;

  return (
    <Container>
        <h4 className='mt-3 ms-1'>Inventario</h4>
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
                {Inventario.map((producto) => 
                <tr>
                    <th scope="row" className='ps-4'>
                        {producto.id}
                    </th>
                    <td>
                        {producto.imagen}
                    </td>
                    <td>
                        {producto.nombre}

                    </td>
                    <td>
                        {producto.categoria}
                    </td>            
                    <td>
                        {producto.cantidad}
                    </td>
                    <td>
                        {producto.lote}
                    </td>
                    <td>
                        {producto.fReg}
                    </td>
                    <td>
                        {producto.fExp}
                    </td>
                    <td>
                        {producto.created}
                    </td>
                    <td>
                        <img src={editIcon} alt={producto.id} className='table-icon me-2 ms-1'/>
                        <img src={deleteIcon} alt={producto.id} className='table-icon me-2 ms-1'/>
                    </td>
                </tr>
                )}
        </tbody>
        </Table>
    </Container>

  )
}
