import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={{ padding: "10px", background: "#333", color: "#fff" }}>
            <h2>TechMantra</h2>
            <Link to="/" style={{ margin: "10px", color: "#fff" }}>Home</Link>
            <Link to="/admin" style={{ margin: "10px", color: "#fff" }}>Admin</Link>
        </nav>
    );
};

export default Navbar;
