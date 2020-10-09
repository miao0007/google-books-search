import React from "react";
import "./style.css";

class Header extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleSearch(this.props.search);
    }

    render() {
        <div className = "header">
            <h1>Google Books Search</h1>
            <h2>Create Your Own Reading List</h2>
            <form>
                <div className = "input-group">
                    <input className = "form-control" type = "text" placeholder="Search a Book" value = {this.props.search} onChange = {this.props.updateInput}></input>
                    <button className = "btn input-group-append" onClick = {this.handleSubmit}>Search</button>
                </div>
            </form>
        </div>
    }
}

export default Header;