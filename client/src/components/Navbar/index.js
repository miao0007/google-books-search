import React from "react";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

class Navbar extends React.Component {
    render() {
        return (

            <nav className="navbar fixed-top">
                <span className="brand">Google Books Search</span>
                <div className = "link-text">
                    <Link to="/"><span className="search">Search</span></Link>
                    <Link to="/saved"><span className="saved">Saved</span></Link>
                </div>
            </nav>

        )
    }
};
export default Navbar;