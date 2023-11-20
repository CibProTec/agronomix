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
import { crearProductos, obtenerProductos } from "../../apiService/apiService";

export const Products = () => {
  const [producto, setProducto] = useState([]);
  const [imagen, setImagen] = useState(0);
  const [nombre, setNombre] = useState("");
  const [idProducto, setIdProducto] = useState(0);
  const [idLoteProducto, setIdLoteProducto] = useState(0);
  const [idCategoriaProducto, setIdCategoriaProducto] = useState(0);
  const [modal, setModal] = useState(false);

  // Filtros
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroLote, setFiltroLote] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");

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
    const proximoId =
      producto.length > 0 ? producto[producto.length - 1].idProducto + 1 : 1;
    setIdProducto(proximoId);
    setImagen("");
    setNombre("");
    setIdLoteProducto(0);
    setIdCategoriaProducto(0);
  };

  const handleCrearProducto = () => {
    const nuevoProducto = {
      idProducto: idProducto,
      imagen: imagen,
      nombre: nombre,
      idLoteProducto: idLoteProducto,
      idCategoriaProducto: idCategoriaProducto,
    };

    crearProductos(nuevoProducto)
      .then((response) => {
        console.log(response.data);
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

    toggleModal();
    // Restablecer filtros después de agregar un nuevo producto
    setFiltroNombre("");
    setFiltroLote("");
    setFiltroCategoria("");
  };

  return (
    <Container>
      <h4 className="mt-3 ms-1">Productos</h4>
      <div className="d-flex justify-content-end">
        <Button
          className="bg-verde-bosque px-5 float-right me-2 mb-5"
          onClick={toggleModal}
        >
          Crear Producto
        </Button>
      </div>
      <Form>
        <Row>
          <Col className="mx-2">
            <FormGroup>
              <Input
                type="text"
                name="filtroNombre"
                placeholder="Buscar por Nombre"
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col className="me-2">
            <FormGroup>
              <Input
                type="text"
                name="filtroLote"
                placeholder="Buscar por Lote"
                value={filtroLote}
                onChange={(e) => setFiltroLote(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col className="me-2">
            <FormGroup>
              <Input
                type="text"
                name="filtroCategoria"
                placeholder="Buscar por Categoria"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col className="me-2">
            <FormGroup>
              <Button
                type="button"
                className="bg-verde-bosque w-100 border-0"
                onClick={() => {
                  if (
                    filtroNombre.trim() === "" &&
                    filtroLote.trim() === "" &&
                    filtroCategoria.trim() === ""
                  ) {
                    // Si todos los campos de búsqueda están vacíos, cargar todos los productos
                    obtenerProductos()
                      .then((response) => {
                        setProducto(response.data);
                      })
                      .catch((error) => {
                        console.error("Error fetching products:", error);
                      });
                  } else {
                    // Filtrar solo si al menos uno de los campos de búsqueda no está vacío
                    const productosFiltrados = producto.filter(
                      (prod) =>
                        prod.nombre
                          .toLowerCase()
                          .includes(filtroNombre.toLowerCase()) &&
                        prod.nombreLote
                          .toLowerCase()
                          .includes(filtroLote.toLowerCase()) &&
                        prod.nombreCategoria
                          .toLowerCase()
                          .includes(filtroCategoria.toLowerCase())
                    );

                    setProducto(productosFiltrados);
                  }
                }}
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
            <th>imagen</th>
            <th>Nombre</th>
            <th>Lote</th>
            <th>Categoria</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {producto.map((Producto) => (
            <tr key={Producto.idProducto}>
              <th scope="row" className="ps-4">
                {Producto.idProducto}
              </th>
              <td>
                <img style={{ width: "40px", borderRadius: "50%" }} src={Producto.imagen} alt={Producto.imagen} />
              </td>
              <td>{Producto.nombre}</td>
              <td>{Producto.nombreLote}</td>
              <td>{Producto.nombreCategoria}</td>
              <td>
                <img
                  src={editIcon}
                  alt={Producto.idProducto}
                  className="table-icon me-2 ms-1"
                />
                <img
                  src={deleteIcon}
                  alt={Producto.idProducto}
                  className="table-icon me-2 ms-1"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para agregar Producto */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Agregar Producto</ModalHeader>
        <ModalBody>
          {/* Formulario para agregar Producto */}
          <FormGroup>
            <label htmlFor="idProducto">ID:</label>
            <Input type="text" name="idProducto" value={idProducto} readOnly />
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
            Agregar Producto
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};
