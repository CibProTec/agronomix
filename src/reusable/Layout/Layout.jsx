import React from "react";
import { Col, Row } from "reactstrap";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/header";
import Footer from "../Footer/Footer";

export const Layout = ({children}) => {

    return(
        <Row>
            <Col xs={2}>
                <Sidebar/>
            </Col>            
            <Col xs={10} className="p-0">
                <Row>
                    <Col xs={12} className="p-0">
                        <Header/>
                    </Col>
                    <Col xs={12} className="p-0 bg-light-grey main-content">
                        <main className="main-content">{children}</main>
                    </Col>
                </Row>
            </Col>
            <Col xs={12}>
                <Footer/>
            </Col>    
        </Row>
    )
}

export default Layout;