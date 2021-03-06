import React from "react";
import HeaderSaved from "../components/HeaderSaved";
import Results from "../components/Results";
import API from "../utils/API";

class Saved extends React.Component {
    state = {
        saved: [],
        btnColor: {background: 'red'} 
    }
    componentDidMount() {
       this.getSaved()
    }
    getSaved = () => {
        API.getAllBooks()
           .then(res => {
               this.setState({saved: res.data})
           })
    }
    render() {
        return (
            <div>
                <HeaderSaved />
                <Results 
                    books = {this.state.saved}
                    status = "Saved Books:"
                    buttonText = "Delete"
                    buttonColor = {this.state.btnColor}
                    getSaved = {this.getSaved}
                />
            </div>
        )
    }
}

export default Saved