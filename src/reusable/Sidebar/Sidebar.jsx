import {React, useState} from "react";
import { Accordion, AccordionHeader, AccordionItem, AccordionBody } from "reactstrap";
import  userDefault  from "../../assets/utils/user-defailt-img.png";
export const Sidebar = () => {

    const [open, setOpen] = useState('');
    const toggle = (id) => {
      if (open === id) {
        setOpen();
      } else {
        setOpen(id);
      }
    };

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
            <div className="sidebar-item">
                <div className="home-icon"></div>
                Inicio
            </div>
            <div className="sidebar-item">
                <div className="products-icon"></div>
                Productos
            </div>
            <div className="sidebar-item">
                <div className="lots-icon"></div>
                Lotes
            </div>
            <div className="sidebar-item">
                <div className="inventory-chart-icon"></div>
                Reporte de Inventario
            </div>
            <Accordion flush open={open} toggle={toggle}>
                <AccordionItem className="bg-verde-oscuro">
                <AccordionHeader targetId="1" id="accordion-sidebar">
                    <div className="config-icon"></div>
                    Configuración
                </AccordionHeader>
                <AccordionBody accordionId="1" id="accordion-body-sidebar" className="bg-gris">
                <div className="sidebar-item">
                    <div className="weight-icon"></div>
                    Unidad de medida
                </div>
                <div className="sidebar-item">
                    <div className="coins-icon"></div>
                    Monedas
                </div>
                </AccordionBody>
                </AccordionItem>
            </Accordion>
            <div className="sidebar-item">
                <div className="user-icon"></div>
                Usuarios
            </div>
        </div>
    )
}

export default Sidebar;