import {React, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionHeader, AccordionItem, AccordionBody } from "reactstrap";
import  userDefault  from "../../assets/utils/user-defailt-img.png";
export const Sidebar = () => {

    const navigate = useNavigate();

    const [open, setOpen] = useState('');
    const toggle = (id) => {
      if (open === id) {
        setOpen();
      } else {
        setOpen(id);
      }
    };

    const handleNavigate = (path) => {
        navigate('/'+path)
    }

    return(
        <div id="Sidebar" className="bg-verde-oscuro">
            <div id="logo-container" className="bg-verde-bosque">
                <div id="logo-sidebar"></div>
            </div>
            <div id="user-info-container">
                <img className="mx-3" src={userDefault} alt="" height="50px" width="50px"/>
                <span className="text-light">Pedro Jimenez</span>
            </div>
            <div className="bg-gris px-5 text-light mt-1 mb-3">Menu</div>
            <div className="sidebar-item cursor-pointer" onClick={() => {handleNavigate('')}}>
                <div className="home-icon"></div>
                Inicio
            </div>
            <div className="sidebar-item cursor-pointer" onClick={() => {handleNavigate('Productos')}}>
                <div className="products-icon"></div>
                Productos
            </div>
            <div className="sidebar-item cursor-pointer" onClick={() => {handleNavigate('Inventario')}}>
                <div className="inventory-chart-icon"></div>
                Reporte de Inventario
            </div>
            <div className="sidebar-item cursor-pointer" onClick={() => {handleNavigate('Usuarios')}}>
                <div className="user-icon"></div>
                Usuarios
            </div>
            <div className="sidebar-item cursor-pointer" onClick={() => {handleNavigate('Lotes')}}>
                <div className="lots-icon"></div>
                Lotes
            </div>
            <Accordion flush open={open} toggle={toggle}>
                <AccordionItem className="bg-verde-oscuro">
                <AccordionHeader targetId="1" id="accordion-sidebar">
                    <div className="config-icon"></div>
                    Configuración
                </AccordionHeader>
                <AccordionBody accordionId="1" id="accordion-body-sidebar" className="bg-gris">
                <div className="sidebar-item cursor-pointer" onClick={() => {handleNavigate('UnidadMedida')}}>
                    <div className="weight-icon"></div>
                    Unidad de medida
                </div>
                <div className="sidebar-item cursor-pointer">
                    <div className="coins-icon"></div>
                    Monedas
                </div>
                <div className="sidebar-item cursor-pointer" onClick={() => {handleNavigate('Categorias')}}>
                    <div className="categ-icon"></div>
                    Categorías
                </div>
                </AccordionBody>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Sidebar;