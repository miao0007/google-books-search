import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";

class HeaderSaved extends React.Component {
    render() {
        return (
            <div className="saved-header">
            <h1>Saved Books</h1>
            <h2>Scroll Down To View your Saved Books</h2>
        </div>
        )
    }
}

export default HeaderSaved;