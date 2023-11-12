import React, { useState } from "react";

export const Header = () => {
    const [usuario, setUsuario] = useState("Usuario");

    return(
        <div id="Header" className="bg-verde-claro d-flex align-items-center">
            <div id="bars-container-header">
                <div className="bars-light-icon cursor-pointer"></div>
            </div>
            <div>
                <span id="user-welcome">Bienvenido {usuario}!</span>
            </div>
        </div>
    )
}

export default Header;