import { useState } from "react";
import "./Header.css";

export function Header() {
    const [active, setActive] = useState("inicio");

    return (
        <header className="main-header">
            <div className="wrapper">
                <h1 className="main-logo">
                    <a href="/" title="Coach PYME">
                        <strong>Coach</strong>
                        PYME
                    </a>
                </h1>
                <nav className="main-nav">
                    <a
                        className={`main-nav__item ${
                            active === "inicio" ? "active" : ""
                        }`}
                        title="Inicio"
                        href="/inicio"
                        onClick={() => setActive("inicio")}
                    >
                        Inicio
                    </a>
                    <a
                        className={`main-nav__item ${
                            active === "nosotros" ? "active" : ""
                        }`}
                        href="/nosotros"
                        onClick={() => setActive("nosotros")}
                    >
                        Qué obtengo
                    </a>
                    <a
                        className={`btn ${
                            active === "nosotros" ? "active" : ""
                        }`}
                        href="/acceder"
                        onClick={() => setActive("acceder")}
                    >
                        Acceder
                    </a>
                </nav>
            </div>
        </header>
    );
}
